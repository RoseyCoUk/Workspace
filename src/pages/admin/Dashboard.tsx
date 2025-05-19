import React, { useState } from 'react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { 
  Users, FolderKanban, CheckCircle, Calendar, PieChart, AlertTriangle,
  Plus, ChevronRight, Filter, Upload, CheckSquare, Clock, Edit, Eye, Download
} from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Good morning, {user?.name} <span>👋</span></h1>
        <p className="text-gray-500 mt-1">Here's what's happening today.</p>
      </div>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <MetricCard 
          title="Active Clients" 
          value="24" 
          change="+2 this week" 
          icon={<Users size={20} className="text-green-500" />} 
          changeType="positive" 
        />
        <MetricCard 
          title="Active Projects" 
          value="18" 
          change="-1 this week" 
          icon={<FolderKanban size={20} className="text-red-500" />} 
          changeType="negative" 
        />
        <MetricCard 
          title="Pending Tasks" 
          value="42" 
          change="+5 this week" 
          icon={<CheckCircle size={20} className="text-blue-500" />} 
          changeType="negative" 
        />
        <MetricCard 
          title="Upcoming Meetings" 
          value="7" 
          change="3 today" 
          icon={<Calendar size={20} className="text-purple-500" />} 
          changeType="neutral" 
        />
        <MetricCard 
          title="% Task Completion" 
          value="74%" 
          change="+3% this month" 
          icon={<PieChart size={20} className="text-green-500" />} 
          changeType="positive" 
        />
        <MetricCard 
          title="Overdue Tasks" 
          value="3" 
          change="Needs attention" 
          icon={<AlertTriangle size={20} className="text-yellow-500" />} 
          changeType="warning" 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Project Tracker */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader 
              title="Project Tracker" 
              action={
                <div className="flex items-center space-x-2">
                  <button 
                    className={`p-1 rounded ${view === 'kanban' ? 'bg-gray-100 text-gray-800' : 'text-gray-400'}`}
                    onClick={() => setView('kanban')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <line x1="3" y1="9" x2="21" y2="9"/>
                      <line x1="9" y1="21" x2="9" y2="9"/>
                    </svg>
                  </button>
                  <button 
                    className={`p-1 rounded ${view === 'list' ? 'bg-gray-100 text-gray-800' : 'text-gray-400'}`}
                    onClick={() => setView('list')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="8" y1="6" x2="21" y2="6"/>
                      <line x1="8" y1="12" x2="21" y2="12"/>
                      <line x1="8" y1="18" x2="21" y2="18"/>
                      <line x1="3" y1="6" x2="3.01" y2="6"/>
                      <line x1="3" y1="12" x2="3.01" y2="12"/>
                      <line x1="3" y1="18" x2="3.01" y2="18"/>
                    </svg>
                  </button>
                </div>
              } 
            />
            <CardContent className="p-4">
              <div className="flex flex-wrap gap-2 mb-4">
                <Button size="sm" variant="ghost">
                  All
                </Button>
                <Button size="sm" variant="ghost">
                  High
                </Button>
                <Button size="sm" variant="ghost">
                  Medium
                </Button>
                <Button size="sm" variant="ghost">
                  Low
                </Button>
                <div className="border-r border-gray-300 h-6 mx-1"></div>
                <Button size="sm" variant="ghost">
                  Type
                </Button>
                <Button size="sm" variant="ghost">
                  Internal
                </Button>
                <Button size="sm" variant="ghost">
                  Assignee
                </Button>
                <Button size="sm" variant="ghost">
                  Me
                </Button>
                <Button size="sm" variant="ghost">
                  Unassigned
                </Button>
              </div>
              
              <div className="mt-4">
                <div className="flex flex-wrap -mx-2">
                  <div className="flex-1 min-w-[300px] px-2 mb-4">
                    <div className="bg-gray-50 rounded-md overflow-hidden">
                      <div className="p-3 bg-white border-b border-gray-200 font-medium flex justify-between items-center">
                        <div className="flex items-center">
                          <span>TO DO</span>
                          <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">3</span>
                        </div>
                      </div>
                      <div className="p-2">
                        <div className="space-y-2">
                          <KanbanCard 
                            title="Website Redesign Kickoff Prep"
                            client="Acme Corp / Website Redesign"
                            tags={['Planning', '#Cool']}
                            priority="High"
                            dueDate="Apr 25 (Overdue!)"
                          />
                          <KanbanCard 
                            title="Content Strategy Outline"
                            client="Beta LLC / Content Strategy"
                            tags={[]}
                            priority="Medium"
                            dueDate=""
                          />
                        </div>
                        <button className="w-full mt-3 flex items-center justify-center p-2 border border-dashed border-gray-300 rounded-md text-gray-400 hover:text-gray-700 hover:border-gray-400">
                          <Plus size={18} />
                          <span className="ml-1 text-sm">Add Task</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-[300px] px-2 mb-4">
                    <div className="bg-gray-50 rounded-md overflow-hidden">
                      <div className="p-3 bg-white border-b border-gray-200 font-medium flex justify-between items-center">
                        <div className="flex items-center">
                          <span>IN PROGRESS</span>
                          <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">2</span>
                        </div>
                      </div>
                      <div className="p-2">
                        <div className="space-y-2">
                          <KanbanCard 
                            title="SEO Keyword Research"
                            client="Gamma Inc / SEO Audit"
                            tags={['SEO']}
                            priority="Medium"
                            dueDate="Apr 20 (Overdue!)"
                          />
                          <KanbanCard 
                            title="Social Media Ad Creatives"
                            client="Delta Co / Ad Campaign"
                            tags={[]}
                            priority="Low"
                            dueDate=""
                          />
                        </div>
                        <button className="w-full mt-3 flex items-center justify-center p-2 border border-dashed border-gray-300 rounded-md text-gray-400 hover:text-gray-700 hover:border-gray-400">
                          <Plus size={18} />
                          <span className="ml-1 text-sm">Add Task</span>
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-[300px] px-2 mb-4">
                    <div className="bg-gray-50 rounded-md overflow-hidden">
                      <div className="p-3 bg-white border-b border-gray-200 font-medium flex justify-between items-center">
                        <div className="flex items-center">
                          <span>DONE</span>
                          <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">2</span>
                        </div>
                      </div>
                      <div className="p-2">
                        <div className="space-y-2">
                          <KanbanCard 
                            title="Brand Identity Guidelines"
                            client="Epsilon Ltd / Branding"
                            tags={['Design', 'Brand']}
                            priority="High"
                            dueDate="No due date"
                          />
                          <KanbanCard 
                            title="Setup Email Marketing Flow"
                            client="Zeta Corp / Marketing Automation"
                            tags={[]}
                            priority="Medium"
                            dueDate=""
                          />
                        </div>
                        <button className="w-full mt-3 flex items-center justify-center p-2 border border-dashed border-gray-300 rounded-md text-gray-400 hover:text-gray-700 hover:border-gray-400">
                          <Plus size={18} />
                          <span className="ml-1 text-sm">Add Task</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          {/* This Week's Focus */}
          <Card>
            <CardHeader 
              title="This Week's Focus" 
              action={<button className="text-gray-400 hover:text-gray-600"><Edit size={16} /></button>} 
            />
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <input type="checkbox" className="h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500" checked />
                  </div>
                  <label className="ml-2 text-sm text-gray-700 line-through">
                    Finalize Acme Corp website mockups
                  </label>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <input type="checkbox" className="h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500" checked />
                  </div>
                  <label className="ml-2 text-sm text-gray-700 line-through">
                    Launch Beta LLC social media campaign
                  </label>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    <input type="checkbox" className="h-4 w-4 text-red-600 rounded border-gray-300 focus:ring-red-500" />
                  </div>
                  <label className="ml-2 text-sm text-gray-700">
                    Prepare Q3 strategy presentation
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Files */}
          <Card>
            <CardHeader 
              title="Recent Files" 
              action={
                <div className="flex items-center">
                  <Button size="sm" variant="ghost">All Files</Button>
                </div>
              } 
            />
            <CardContent>
              <div className="space-y-3">
                <div className="border-b border-gray-100 pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">Project_Brief_v2.pdf</p>
                      <p className="text-xs text-gray-500">15min • about 2 hours ago • 1.3 MB</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-b border-gray-100 pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                        <path d="M8 13h8" />
                        <path d="M8 17h8" />
                        <path d="M8 9h1" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">Content_Outline.docx</p>
                      <p className="text-xs text-gray-500">You • about 6 hours ago • 45 KB</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-b border-gray-100 pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">Logo_Final_RGB.png</p>
                      <p className="text-xs text-gray-500">Sarah • 1 day ago • 3.2 MB</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 text-gray-400">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                        <polyline points="14 2 14 8 20 8" />
                        <path d="M16 13H8" />
                        <path d="M16 17H8" />
                        <path d="M10 9H8" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">Client_Assets.zip</p>
                      <p className="text-xs text-gray-500">You • 3 days ago • 30.7 MB</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 border border-dashed border-gray-300 rounded-md p-6 text-center">
                <Upload size={24} className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-2 flex text-sm justify-center">
                  <p className="text-gray-500">Drop & drop files here or</p>
                  <button
                    type="button"
                    className="ml-1 text-red-600 hover:text-red-500 focus:outline-none focus:underline"
                  >
                    browse to upload
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Upcoming Meetings */}
          <Card>
            <CardHeader 
              title="Upcoming Meetings" 
              action={<Button size="sm" variant="ghost" icon={<ChevronRight size={16} />}>View all</Button>} 
            />
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-500">
                    <Calendar size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Website Kickoff</p>
                    <p className="text-xs text-gray-500">Tomorrow, 10:00 AM - 11:30 AM</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                    <Users size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">Team Standup</p>
                    <p className="text-xs text-gray-500">Today, 4:30 PM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Activity */}
          <Card>
            <CardHeader 
              title="Recent Activity" 
              action={<Button size="sm" variant="ghost" icon={<ChevronRight size={16} />}>View all</Button>} 
            />
            <CardContent>
              <div className="space-y-4">
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
                      <CheckSquare size={16} />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">Sarah J.</span>
                      <span className="text-gray-500"> completed task </span>
                      <span className="font-medium text-gray-900">Brand Guidelines</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      <Clock size={12} className="inline mr-1" />
                      15 minutes ago
                    </p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">
                      <Upload size={16} />
                    </div>
                  </div>
                  <div>
                    <p className="text-sm">
                      <span className="font-medium text-gray-900">Mike T.</span>
                      <span className="text-gray-500"> uploaded </span>
                      <span className="font-medium text-gray-900">3 new files</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      <Clock size={12} className="inline mr-1" />
                      2 hours ago
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  changeType: 'positive' | 'negative' | 'neutral' | 'warning';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  icon,
  changeType,
}) => {
  const changeColorClass = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-gray-500',
    warning: 'text-yellow-600',
  }[changeType];

  return (
    <Card className="h-full">
      <CardContent className="p-4">
        <div className="flex items-center mb-2">
          {icon}
          <span className="ml-auto text-xs text-gray-500">{title}</span>
        </div>
        <div className="mt-1">
          <div className="flex items-baseline">
            <span className="text-2xl font-semibold text-gray-900">{value}</span>
            <span className={`ml-2 text-xs ${changeColorClass}`}>
              {change}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface KanbanCardProps {
  title: string;
  client: string;
  tags: string[];
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
}

const KanbanCard: React.FC<KanbanCardProps> = ({
  title,
  client,
  tags,
  priority,
  dueDate,
}) => {
  const priorityColors = {
    High: 'bg-red-100 text-red-800',
    Medium: 'bg-yellow-100 text-yellow-800',
    Low: 'bg-blue-100 text-blue-800',
  };

  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 p-3">
      <div className="mb-2">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${priorityColors[priority]}`}>
          {priority}
        </span>
      </div>
      <h4 className="text-sm font-medium text-gray-900 mb-1">{title}</h4>
      <p className="text-xs text-gray-500 mb-2">{client}</p>
      
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {tags.map((tag, i) => (
            <span key={i} className="text-xs bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
      
      {dueDate && (
        <div className="mt-2 text-xs text-gray-500">
          <span>{dueDate}</span>
        </div>
      )}
      
      <div className="mt-2 flex justify-between items-center">
        <div className="flex -space-x-1">
          <div className="w-6 h-6 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
            AB
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;