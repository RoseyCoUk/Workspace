export type UserRole = 'admin' | 'client';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Project {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  status: 'Active' | 'Completed' | 'On Hold';
  startDate: string;
  endDate: string;
  progress: number;
  managerId: string;
  managerName: string;
}

export interface Task {
  id: string;
  title: string;
  status: 'Pending' | 'In Review' | 'Complete';
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  projectId: string;
  projectName?: string;
  assigneeId?: string;
  assigneeName?: string;
  tags?: string[];
}

export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'xlsx' | 'png' | 'jpg';
  uploadDate: string;
  size: string;
  projectId: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  attendees: string[];
}

export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

export interface Metrics {
  activeClients: number;
  activeProjects: number;
  pendingTasks: number;
  upcomingMeetings: number;
  taskCompletion: number;
  overdueTasks: number;
}

export interface KanbanColumn {
  id: 'todo' | 'inProgress' | 'done';
  title: string;
  count: number;
  tasks: Task[];
}