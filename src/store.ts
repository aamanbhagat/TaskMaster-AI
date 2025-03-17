import { create } from 'zustand';
import { Task, Project, User, Notification } from './types';

// Initial data
const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Design System Implementation',
    description: 'Create a comprehensive design system including color palette, typography, and component library',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date('2024-04-15'),
    assignee: 'Leslie Alexander',
    tags: ['design', 'ui/ux', 'foundation'],
    aiSuggestions: ['Consider using Figma for better collaboration', 'Document component usage guidelines'],
    progress: 45,
  },
  {
    id: '2',
    title: 'User Authentication Flow',
    description: 'Implement secure user authentication with email verification and password reset',
    status: 'todo',
    priority: 'high',
    dueDate: new Date('2024-04-20'),
    assignee: 'Dries Vincent',
    tags: ['security', 'backend', 'user-management'],
    aiSuggestions: ['Add two-factor authentication option', 'Implement rate limiting for security'],
    progress: 0,
  },
  {
    id: '3',
    title: 'API Documentation',
    description: 'Create comprehensive API documentation with examples and usage guidelines',
    status: 'completed',
    priority: 'medium',
    dueDate: new Date('2024-04-10'),
    assignee: 'Michael Foster',
    tags: ['documentation', 'api', 'developer-experience'],
    aiSuggestions: ['Add interactive API examples', 'Include error handling documentation'],
    progress: 100,
  },
  {
    id: '4',
    title: 'Performance Optimization',
    description: 'Optimize application performance including load times and resource usage',
    status: 'in-progress',
    priority: 'medium',
    dueDate: new Date('2024-04-25'),
    assignee: 'Leslie Alexander',
    tags: ['performance', 'optimization', 'technical'],
    aiSuggestions: ['Implement lazy loading for images', 'Add caching strategy'],
    progress: 30,
  },
  {
    id: '5',
    title: 'Mobile Responsive Design',
    description: 'Ensure all pages are fully responsive and optimized for mobile devices',
    status: 'todo',
    priority: 'high',
    dueDate: new Date('2024-04-30'),
    assignee: 'Michael Foster',
    tags: ['mobile', 'responsive', 'ui/ux'],
    aiSuggestions: ['Test on various device sizes', 'Implement touch-friendly interactions'],
    progress: 0,
  }
];

const initialProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Modernize the company website',
    tasks: ['1', '3', '4'],
    progress: 65,
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-04-15'),
    team: ['1', '2', '3'],
    status: 'active',
    priority: 'high',
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Create a new mobile app',
    tasks: ['2', '5'],
    progress: 30,
    startDate: new Date('2024-03-15'),
    endDate: new Date('2024-05-30'),
    team: ['2', '4', '5'],
    status: 'active',
    priority: 'medium',
  },
];

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'info',
    message: 'Welcome to TaskMaster AI! Explore our powerful project management features.',
    createdAt: new Date(),
    read: false,
  },
  {
    id: '2',
    type: 'success',
    message: 'New AI-powered task suggestions are now available!',
    createdAt: new Date(),
    read: false,
  },
  {
    id: '3',
    type: 'warning',
    message: 'Project "Website Redesign" deadline is approaching in 5 days.',
    createdAt: new Date(),
    read: false,
  }
];

// Load data from localStorage or use initial data
const loadFromStorage = <T>(key: string, initial: T): T => {
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return initial;
    
    const parsed = JSON.parse(stored, (key, value) => {
      // Convert date strings back to Date objects
      if (key === 'dueDate' || key === 'startDate' || key === 'endDate' || key === 'createdAt') {
        return new Date(value);
      }
      return value;
    });
    
    return parsed;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return initial;
  }
};

// Save data to localStorage
const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

interface Store {
  tasks: Task[];
  projects: Project[];
  users: User[];
  notifications: Notification[];
  selectedProject: string | null;
  selectedTaskId: string | null;
  setSelectedProject: (id: string | null) => void;
  setSelectedTaskId: (id: string | null) => void;
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  addNotification: (notification: Notification) => void;
  markNotificationAsRead: (id: string) => void;
  clearNotifications: () => void;
}

export const useStore = create<Store>((set) => ({
  tasks: loadFromStorage('tasks', initialTasks),
  projects: loadFromStorage('projects', initialProjects),
  users: [],
  notifications: loadFromStorage('notifications', initialNotifications),
  selectedProject: null,
  selectedTaskId: null,
  
  setSelectedProject: (id) => set({ selectedProject: id }),
  setSelectedTaskId: (id) => set({ selectedTaskId: id }),
  
  addTask: (task) => set((state) => {
    const newTasks = [...state.tasks, task];
    saveToStorage('tasks', newTasks);
    return { tasks: newTasks };
  }),
  
  updateTask: (task) => set((state) => {
    const newTasks = state.tasks.map((t) => (t.id === task.id ? task : t));
    saveToStorage('tasks', newTasks);
    return { tasks: newTasks };
  }),
  
  deleteTask: (id) => set((state) => {
    const newTasks = state.tasks.filter((t) => t.id !== id);
    const newProjects = state.projects.map(project => ({
      ...project,
      tasks: project.tasks.filter(taskId => taskId !== id)
    }));
    
    saveToStorage('tasks', newTasks);
    saveToStorage('projects', newProjects);
    
    return {
      tasks: newTasks,
      projects: newProjects
    };
  }),
  
  addProject: (project) => set((state) => {
    const newProjects = [...state.projects, project];
    saveToStorage('projects', newProjects);
    return { projects: newProjects };
  }),
  
  updateProject: (project) => set((state) => {
    const newProjects = state.projects.map((p) => (p.id === project.id ? project : p));
    saveToStorage('projects', newProjects);
    return { projects: newProjects };
  }),
  
  deleteProject: (id) => set((state) => {
    const newProjects = state.projects.filter((p) => p.id !== id);
    saveToStorage('projects', newProjects);
    return { projects: newProjects };
  }),
  
  addNotification: (notification) => set((state) => {
    const newNotifications = [notification, ...state.notifications];
    saveToStorage('notifications', newNotifications);
    return { notifications: newNotifications };
  }),
  
  markNotificationAsRead: (id) => set((state) => {
    const newNotifications = state.notifications.map((n) =>
      n.id === id ? { ...n, read: true } : n
    );
    saveToStorage('notifications', newNotifications);
    return { notifications: newNotifications };
  }),
  
  clearNotifications: () => set(() => {
    saveToStorage('notifications', []);
    return { notifications: [] };
  }),
}));