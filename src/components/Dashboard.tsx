import React, { useEffect, useRef } from 'react';
import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartTitle,
  ChartLegend,
} from '@progress/kendo-react-charts';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Input, TextArea } from '@progress/kendo-react-inputs';
import { DatePicker } from '@progress/kendo-react-dateinputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Notification, NotificationGroup } from '@progress/kendo-react-notification';
import { ProgressBar } from '@progress/kendo-react-progressbars';
import { useStore } from '../store';
import { Brain, Calendar, CheckCircle, Clock, Target, Trash2, Filter } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const [showDialog, setShowDialog] = React.useState(false);
  const [notification, setNotification] = React.useState('');
  const [filters, setFilters] = React.useState({
    status: 'all',
    priority: 'all',
    assignee: 'all'
  });
  const gridRef = useRef<any>(null);
  
  const { 
    tasks, 
    addTask, 
    deleteTask, 
    selectedTaskId, 
    setSelectedTaskId,
    projects 
  } = useStore();

  const statusOptions = ['todo', 'in-progress', 'completed'];
  const priorityOptions = ['low', 'medium', 'high'];

  useEffect(() => {
    if (selectedTaskId && gridRef.current) {
      const rowIndex = tasks.findIndex(task => task.id === selectedTaskId);
      if (rowIndex !== -1) {
        const row = gridRef.current.element.querySelector(`[data-grid-row-index="${rowIndex}"]`);
        if (row) {
          row.scrollIntoView({ behavior: 'smooth', block: 'center' });
          row.classList.add('highlight-row');
          setTimeout(() => {
            row.classList.remove('highlight-row');
            setSelectedTaskId(null);
          }, 1000);
        }
      }
    }
  }, [selectedTaskId]);

  const handleSubmit = (data: any) => {
    const formattedData = {
      ...data,
      dueDate: data.dueDate instanceof Date ? data.dueDate : new Date(data.dueDate),
      id: Math.random().toString(),
      aiSuggestions: ['Consider breaking this task into smaller subtasks'],
      tags: data.tags ? data.tags.split(',').map((tag: string) => tag.trim()) : [],
    };

    addTask(formattedData);
    setShowDialog(false);
    setNotification('Task added successfully!');
    setTimeout(() => setNotification(''), 3000);
  };

  const handleDeleteTask = (taskId: string) => {
    deleteTask(taskId);
    setNotification('Task deleted successfully!');
    setTimeout(() => setNotification(''), 3000);
  };

  const getTaskStats = () => {
    const total = tasks.length || 1;
    return {
      todo: (tasks.filter(t => t.status === 'todo').length / total) * 100,
      inProgress: (tasks.filter(t => t.status === 'in-progress').length / total) * 100,
      completed: (tasks.filter(t => t.status === 'completed').length / total) * 100,
    };
  };

  const stats = getTaskStats();

  const dateValidator = (value: any) => {
    if (!value) {
      return "Due date is required";
    }
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      return "Please enter a valid date";
    }
    if (date < new Date()) {
      return "Due date cannot be in the past";
    }
    return "";
  };

  const filteredTasks = tasks.filter(task => {
    return (
      (filters.status === 'all' || task.status === filters.status) &&
      (filters.priority === 'all' || task.priority === filters.priority) &&
      (filters.assignee === 'all' || task.assignee === filters.assignee)
    );
  });

  const uniqueAssignees = Array.from(new Set(tasks.map(task => task.assignee)));

  return (
    <div className="space-y-6">
      <section aria-label="Project Overview" className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-gray-800">Project Overview</h2>
        <Button
          themeColor="primary"
          onClick={() => setShowDialog(true)}
          icon="plus"
          className="hover:bg-blue-600"
          aria-label="Add New Task"
        >
          Add Task
        </Button>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <section aria-label="Task Progress" className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <Target className="w-6 h-6 text-blue-500 mr-2" aria-hidden="true" />
            <h3 className="text-lg font-semibold">Task Progress</h3>
          </div>
          <Chart style={{ height: 200 }}>
            <ChartTitle text="Task Distribution" />
            <ChartLegend position="bottom" />
            <ChartSeries>
              <ChartSeriesItem
                type="donut"
                data={[
                  { category: 'Todo', value: stats.todo, color: '#ff6b6b' },
                  { category: 'In Progress', value: stats.inProgress, color: '#4dabf7' },
                  { category: 'Completed', value: stats.completed, color: '#51cf66' },
                ]}
                field="value"
                categoryField="category"
              />
            </ChartSeries>
          </Chart>
        </section>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <Brain className="w-6 h-6 text-purple-500 mr-2" />
            <h3 className="text-lg font-semibold">AI Insights</h3>
          </div>
          <div className="space-y-4">
            {tasks.slice(0, 3).map(task => (
              <div key={task.id} className="p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-700">{task.aiSuggestions?.[0]}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 text-green-500 mr-2" />
            <h3 className="text-lg font-semibold">Progress Overview</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Todo</span>
                <span className="text-sm text-gray-500">{Math.round(stats.todo)}%</span>
              </div>
              <ProgressBar value={stats.todo} />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">In Progress</span>
                <span className="text-sm text-gray-500">{Math.round(stats.inProgress)}%</span>
              </div>
              <ProgressBar value={stats.inProgress} />
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Completed</span>
                <span className="text-sm text-gray-500">{Math.round(stats.completed)}%</span>
              </div>
              <ProgressBar value={stats.completed} />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <Grid
          data={filteredTasks}
          style={{ height: '400px' }}
          scrollable="scrollable"
          ref={gridRef}
        >
          <GridToolbar>
            <div className="flex items-center gap-4 p-2 overflow-x-auto">
              <span className="font-medium flex items-center">
                <Filter className="w-4 h-4 mr-1" /> Filters:
              </span>
              
              <DropDownList
                data={['all', ...statusOptions]}
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.value })}
                className="w-32"
              />
              
              <DropDownList
                data={['all', ...priorityOptions]}
                value={filters.priority}
                onChange={(e) => setFilters({ ...filters, priority: e.value })}
                className="w-32"
              />
              
              <DropDownList
                data={['all', ...uniqueAssignees]}
                value={filters.assignee}
                onChange={(e) => setFilters({ ...filters, assignee: e.value })}
                className="w-40"
              />
              
              <Button
                look="outline"
                onClick={() => setFilters({ status: 'all', priority: 'all', assignee: 'all' })}
              >
                Clear Filters
              </Button>
            </div>
          </GridToolbar>
          <GridColumn field="title" title="Title" width="200px" />
          <GridColumn field="status" title="Status" width="130px"
            cell={(props) => (
              <td>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  props.dataItem.status === 'completed' ? 'bg-green-100 text-green-800' :
                  props.dataItem.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {props.dataItem.status}
                </span>
              </td>
            )}
          />
          <GridColumn field="priority" title="Priority" width="120px" />
          <GridColumn field="dueDate" title="Due Date" width="150px"
            cell={(props) => (
              <td>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                  {new Date(props.dataItem.dueDate).toLocaleDateString()}
                </div>
              </td>
            )}
          />
          <GridColumn field="assignee" title="Assignee" width="150px" />
          <GridColumn field="tags" title="Tags" width="200px"
            cell={(props) => (
              <td>
                <div className="flex gap-1 flex-wrap">
                  {props.dataItem.tags?.map((tag: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
            )}
          />
          <GridColumn width="100px"
            cell={(props) => (
              <td>
                <Button
                  look="outline"
                  icon={<Trash2 className="w-4 h-4" />}
                  onClick={() => handleDeleteTask(props.dataItem.id)}
                  className="text-red-600 hover:bg-red-50"
                >
                  Delete
                </Button>
              </td>
            )}
          />
        </Grid>
      </div>

      {showDialog && (
        <Dialog title="Add New Task" onClose={() => setShowDialog(false)}>
          <Form
            onSubmit={handleSubmit}
            render={(formRenderProps) => (
              <FormElement>
                <div className="space-y-4 p-4">
                  <Field
                    name="title"
                    component={Input}
                    label="Title"
                    required
                  />
                  <Field
                    name="description"
                    component={TextArea}
                    label="Description"
                  />
                  <Field
                    name="status"
                    component={DropDownList}
                    label="Status"
                    data={statusOptions}
                    required
                  />
                  <Field
                    name="priority"
                    component={DropDownList}
                    label="Priority"
                    data={priorityOptions}
                    required
                  />
                  <Field
                    name="dueDate"
                    component={DatePicker}
                    label="Due Date"
                    required
                    validator={dateValidator}
                    min={new Date()}
                  />
                  <Field
                    name="assignee"
                    component={Input}
                    label="Assignee"
                  />
                  <Field
                    name="tags"
                    component={Input}
                    label="Tags (comma-separated)"
                  />
                </div>
                <DialogActionsBar>
                  <Button onClick={() => setShowDialog(false)}>Cancel</Button>
                  <Button
                    themeColor="primary"
                    type="submit"
                    disabled={!formRenderProps.allowSubmit}
                  >
                    Add Task
                  </Button>
                </DialogActionsBar>
              </FormElement>
            )}
          />
        </Dialog>
      )}

      <NotificationGroup>
        {notification && (
          <Notification
            type={{ style: 'success', icon: true }}
            closable={true}
            onClose={() => setNotification('')}
          >
            <span>{notification}</span>
          </Notification>
        )}
      </NotificationGroup>
    </div>
  );
};