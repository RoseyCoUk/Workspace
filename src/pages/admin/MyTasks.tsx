import React, { useState } from 'react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Progress from '../../components/ui/Progress';
import { Search, Plus, Filter, MoreVertical, Clock, Calendar, CheckCircle, X } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  project: {
    name: string;
    client: string;
  };
  status: 'Pending' | 'In Progress' | 'In Review' | 'Completed';
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
  description: string;
  progress: number;
}

const MyTasks: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    project: '',
    priority: 'Medium',
    dueDate: '',
    description: '',
  });

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Design Homepage Mockup',
      project: {
        name: 'Website Redesign',
        client: 'Tech Innovations Inc'
      },
      status: 'In Progress',
      priority: 'High',
      dueDate: '2024-03-25',
      description: 'Create high-fidelity mockup for the new homepage design',
      progress: 60
    },
    {
      id: '2',
      title: 'Content Strategy Document',
      project: {
        name: 'Marketing Campaign',
        client: 'Global Solutions Ltd'
      },
      status: 'Pending',
      priority: 'Medium',
      dueDate: '2024-03-28',
      description: 'Develop content strategy document for Q2 campaign',
      progress: 0
    },
    {
      id: '3',
      title: 'Brand Guidelines Review',
      project: {
        name: 'Brand Identity',
        client: 'Creative Minds Agency'
      },
      status: 'In Review',
      priority: 'Low',
      dueDate: '2024-03-22',
      description: 'Review and provide feedback on brand guidelines draft',
      progress: 90
    }
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New task:', newTask);
    setIsModalOpen(false);
    setNewTask({
      title: '',
      project: '',
      priority: 'Medium',
      dueDate: '',
      description: '',
    });
  };

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'Completed':
        return 'success';
      case 'In Progress':
        return 'primary';
      case 'In Review':
        return 'warning';
      case 'Pending':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'High':
        return 'danger';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'info';
      default:
        return 'default';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.project.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || task.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-gray-500 mt-1">Track and manage your assigned tasks</p>
        </div>
        <Button variant="primary" icon={<Plus size={16} />} onClick={() => setIsModalOpen(true)}>
          New Task
        </Button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create New Task</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newTask.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
                  Project
                </label>
                <select
                  id="project"
                  name="project"
                  value={newTask.project}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                >
                  <option value="">Select a project</option>
                  <option value="1">Website Redesign</option>
                  <option value="2">Marketing Campaign</option>
                  <option value="3">Brand Identity</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={newTask.priority}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Due Date
                  </label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={newTask.dueDate}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newTask.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Create Task
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Task Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Tasks</p>
                <h3 className="text-2xl font-semibold mt-1">{tasks.length}</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                <CheckCircle size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">In Progress</p>
                <h3 className="text-2xl font-semibold mt-1">
                  {tasks.filter(t => t.status === 'In Progress').length}
                </h3>
              </div>
              <div className="p-3 bg-green-100 rounded-full text-green-600">
                <Clock size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Due This Week</p>
                <h3 className="text-2xl font-semibold mt-1">4</h3>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full text-yellow-600">
                <Calendar size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <h3 className="text-2xl font-semibold mt-1">
                  {tasks.filter(t => t.status === 'Completed').length}
                </h3>
              </div>
              <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                <CheckCircle size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tasks List */}
      <Card>
        <CardHeader 
          title="My Tasks" 
          action={
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              <Button variant="outline" size="sm" icon={<Filter size={16} />}>
                Filter
              </Button>
            </div>
          }
        />
        <CardContent>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTasks.map(task => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{task.title}</div>
                        <div className="flex items-center mt-1">
                          <Badge variant={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm text-gray-900">{task.project.name}</div>
                        <div className="text-sm text-gray-500">{task.project.client}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-32">
                        <Progress value={task.progress} showLabel size="sm" />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="ghost" size="sm" icon={<MoreVertical size={16} />} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MyTasks;