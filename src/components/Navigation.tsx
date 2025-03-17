import React from 'react';
import { useStore } from '../store';
import { 
  LayoutGrid, 
  FolderKanban, 
  Users, 
  Settings, 
  HelpCircle,
  Bell,
  LogOut,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Badge } from '@progress/kendo-react-indicators';
import { Popup } from '@progress/kendo-react-popup';

export const Navigation: React.FC = () => {
  const { 
    projects, 
    tasks,
    setSelectedProject, 
    selectedProject, 
    notifications, 
    markNotificationAsRead,
    setSelectedTaskId 
  } = useStore();
  const [activeSection, setActiveSection] = React.useState('dashboard');
  const [isRecentProjectsOpen, setIsRecentProjectsOpen] = React.useState(true);
  const [isMainMenuOpen, setIsMainMenuOpen] = React.useState(false);
  const [showNotifications, setShowNotifications] = React.useState(false);
  const notificationRef = React.useRef(null);

  const menuItems = [
    { id: 'dashboard', text: 'Dashboard', icon: <LayoutGrid className="w-5 h-5" /> },
    { id: 'projects', text: 'Projects', icon: <FolderKanban className="w-5 h-5" /> },
    { id: 'team', text: 'Team', icon: <Users className="w-5 h-5" /> },
    { id: 'settings', text: 'Settings', icon: <Settings className="w-5 h-5" /> },
    { id: 'help', text: 'Help', icon: <HelpCircle className="w-5 h-5" /> },
  ];

  const handleMenuClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setSelectedProject(sectionId);
  };

  const handleTitleClick = () => {
    setActiveSection('dashboard');
    setSelectedProject('dashboard');
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  const toggleRecentProjects = () => {
    setIsRecentProjectsOpen(!isRecentProjectsOpen);
  };

  const toggleMainMenu = () => {
    setIsMainMenuOpen(!isMainMenuOpen);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
    }
  };

  const handleTaskClick = (taskId: string) => {
    setSelectedTaskId(taskId);
    setSelectedProject('dashboard');
    setActiveSection('dashboard');
  };

  return (
    <div className="h-screen bg-white border-r flex flex-col">
      {/* Header Section */}
      <div 
        className="p-6 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={handleTitleClick}
      >
        <h1 className="text-2xl font-bold text-gray-800">TaskMaster AI</h1>
        <p className="text-sm text-gray-500">Intelligent Project Management</p>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-200"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">Project Manager</p>
            </div>
          </div>
          <div ref={notificationRef}>
            <button
              onClick={handleNotificationClick}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Bell className="w-5 h-5 text-gray-500" />
              {notifications.length > 0 && (
                <Badge
                  themeColor="error"
                  size="small"
                  className="absolute -top-1 -right-1"
                >
                  {notifications.length}
                </Badge>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Notifications Popup */}
      <Popup
        anchor={notificationRef.current}
        show={showNotifications}
        popupClass="bg-white rounded-lg shadow-lg border border-gray-200 w-80"
        animate={false}
        onClose={() => setShowNotifications(false)}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Notifications</h3>
            <button
              onClick={() => setShowNotifications(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg ${
                  notification.read ? 'bg-gray-50' : 'bg-blue-50'
                }`}
                onClick={() => markNotificationAsRead(notification.id)}
              >
                <div className="flex items-start">
                  <div className={`w-2 h-2 mt-2 rounded-full ${
                    notification.type === 'success' ? 'bg-green-400' :
                    notification.type === 'warning' ? 'bg-yellow-400' :
                    notification.type === 'error' ? 'bg-red-400' :
                    'bg-blue-400'
                  }`} />
                  <div className="ml-3">
                    <p className="text-sm text-gray-900">{notification.message}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(notification.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Popup>

      {/* Main Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {/* Main Menu Toggle */}
        <button
          onClick={toggleMainMenu}
          className="w-full flex items-center justify-between px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <div className="flex items-center">
            <Menu className="w-5 h-5 mr-2" />
            <span>Main Menu</span>
          </div>
          {isMainMenuOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        {/* Main Menu Items */}
        <div className={`space-y-1 overflow-hidden transition-all duration-200 ${
          isMainMenuOpen ? 'max-h-[500px] mt-2' : 'max-h-0'
        }`}>
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors
                ${activeSection === item.id
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
              onClick={() => handleMenuClick(item.id)}
            >
              {item.icon}
              <span className="ml-3">{item.text}</span>
            </button>
          ))}
        </div>

        {/* Recent Projects Section */}
        <button
          onClick={toggleRecentProjects}
          className="w-full flex items-center justify-between px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors mt-2"
        >
          <span>Recent Projects</span>
          {isRecentProjectsOpen ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronRight className="w-4 h-4" />
          )}
        </button>

        <div className={`overflow-hidden transition-all duration-200 ${
          isRecentProjectsOpen ? 'max-h-[500px] mt-2' : 'max-h-0'
        }`}>
          {projects.map((project) => (
            <div key={project.id} className="mb-4">
              <button
                className={`w-full flex items-center px-4 py-2 text-sm rounded-lg transition-colors
                  ${selectedProject === project.id
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-50'
                  }`}
                onClick={() => setSelectedProject(project.id)}
              >
                <span className={`w-2 h-2 rounded-full mr-3 ${
                  project.status === 'active' ? 'bg-green-400' : 
                  project.status === 'completed' ? 'bg-blue-400' : 'bg-yellow-400'
                }`}></span>
                <span className="truncate">{project.name}</span>
              </button>
              
              {/* Project Tasks */}
              <div className="ml-6 mt-2 space-y-1">
                {project.tasks.map((taskId) => {
                  const task = tasks.find(t => t.id === taskId);
                  if (!task) return null;
                  
                  return (
                    <button
                      key={task.id}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      onClick={() => handleTaskClick(task.id)}
                    >
                      {getStatusIcon(task.status)}
                      <span className="ml-2 truncate">{task.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5 mr-3" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};