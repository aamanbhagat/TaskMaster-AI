import React from 'react';
import { useStore } from '../store';
import { Plus, Filter, MoreVertical, Calendar, Users } from 'lucide-react';
import { Button } from '@progress/kendo-react-buttons';
import { format } from 'date-fns';
import { AnimatedCard } from './common/AnimatedCard';
import { ResponsiveGrid } from './common/ResponsiveGrid';
import { SearchInput } from './common/SearchInput';

export const Projects: React.FC = () => {
  const { projects, addProject } = useStore();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterPriority, setFilterPriority] = React.useState('all');
  const [filterStatus, setFilterStatus] = React.useState('all');

  const handleCreateProject = () => {
    const newProject = {
      id: Math.random().toString(),
      name: 'New Project',
      description: 'Project description',
      tasks: [],
      progress: 0,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      team: [],
      status: 'active' as const,
      priority: 'medium' as const,
    };
    addProject(newProject);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || project.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || project.status === filterStatus;
    return matchesSearch && matchesPriority && matchesStatus;
  });

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage and track all your projects</p>
        </div>
        <Button
          themeColor="primary"
          onClick={handleCreateProject}
          icon={<Plus className="w-4 h-4" />}
        >
          New Project
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <SearchInput
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Search projects..."
          className="flex-1"
        />
        <div className="flex gap-2">
          <select
            className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="all">All Priorities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select
            className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
        </div>
      </div>

      <ResponsiveGrid cols={{ sm: 1, md: 2, lg: 3 }}>
        {filteredProjects.map((project, index) => (
          <AnimatedCard key={project.id} delay={index * 0.1}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{project.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{project.description}</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4 flex-grow">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Progress</span>
                    <span className="font-medium text-gray-900 dark:text-white">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary-600 dark:bg-primary-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex justify-between text-sm">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1 text-gray-400" />
                    <span className="text-gray-500 dark:text-gray-400">
                      {format(new Date(project.startDate), 'MMM d')}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 dark:text-gray-400">
                      {format(new Date(project.endDate), 'MMM d')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-2 text-gray-400" />
                    <div className="flex -space-x-2">
                      {[...Array(3)].map((_, i) => (
                        <img
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800"
                          src={`https://images.unsplash.com/photo-${1500000000000 + i}?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`}
                          alt={`Team member ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
                    project.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                  }`}>
                    {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          </AnimatedCard>
        ))}
      </ResponsiveGrid>
    </div>
  );
};