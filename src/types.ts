export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: Date;
  assignee: string;
  tags: string[];
  aiSuggestions?: string[];
  progress?: number;
  attachments?: string[];
  comments?: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tasks: Task[];
  progress: number;
  startDate: Date;
  endDate: Date;
  team: string[];
  status: 'active' | 'completed' | 'on-hold';
  priority: 'low' | 'medium' | 'high';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar: string;
  teams: string[];
  tasks: string[];
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'error' | 'success';
  message: string;
  createdAt: Date;
  read: boolean;
}