import React, { useState } from 'react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Progress from '../../components/ui/Progress';
import { Search, Filter, MoreVertical, Calendar, Clock, Users, MessageSquare, X } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  status: 'Active' | 'On Hold' | 'Completed' | 'Cancelled';
  priority: 'High' | 'Medium' | 'Low';
  progress: number;
  startDate: string;
  endDate: string;
  team: string[];
  tasks: {
    total: number;
    completed: number;
  };
  description: string;
}

const MyProjects: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: '1',
      name: 'Website Redesign',
      status: 'Active',
      priority: 'High',
      progress: 75,
      startDate: '2024-02-15',
      endDate: '2024-04-30',
      team: ['Sarah J.', 'Mike T.', 'Emily D.'],
      tasks: {
        total: 24,
        completed: 18
      },
      description: 'Complete website redesign and development project'
    },
    {
      id: '2',
      name: 'Marketing Campaign',
      status: 'Active',
      priority: 'Medium',
      progress: 45,
      startDate: '2024-03-01',
      endDate: '2024-05-15',
      team: ['Chris W.', 'Anna P.'],
      tasks: {
        total: 18,
        completed: 8
      },
      description: 'Q2 digital marketing campaign'
    },
    {
      id: '3',
      name: 'Brand Identity',
      status: 'On Hold',
      priority: 'Low',
      progress: 30,
      startDate: '2024-02-01',
      endDate: '2024-04-15',
      team: ['David L.', 'Sophie R.'],
      tasks: {
        total: 15,
        completed: 4
      },
      description: 'Brand identity refresh and guidelines'
    }
  ];

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'On Hold':
        return 'warning';
      case 'Completed':
        return 'primary';
      case 'Cancelled':
        return 'danger';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority: Project['priority']) => {
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

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || project.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
        <p className="text-gray-500 mt-1">View and manage your active projects</p>
      </div>

      {/* Project Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">My Projects</p>
                <h3 className="text-2xl font-semibold mt-1">{projects.length}</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                <Calendar size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Projects</p>
                <h3 className="text-2xl font-semibold mt-1">
                  {projects.filter(p => p.status === 'Active').length}
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
                <p className="text-sm text-gray-500">Team Members</p>
                <h3 className="text-2xl font-semibold mt-1">8</h3>
              </div>
              <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                <Users size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Messages</p>
                <h3 className="text-2xl font-semibold mt-1">12</h3>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full text-yellow-600">
                <MessageSquare size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects List */}
      <Card>
        <CardHeader 
          title="My Projects" 
          action={
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search projects..."
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
                    Project
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Team
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
                {filteredProjects.map(project => (
                  <tr key={project.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{project.name}</div>
                        <div className="flex items-center mt-1">
                          <Badge variant={getPriorityColor(project.priority)}>
                            {project.priority}
                          </Badge>
                          <span className="ml-2 text-sm text-gray-500">
                            {project.tasks.completed}/{project.tasks.total} tasks
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusColor(project.status)}>
                        {project.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-32">
                        <Progress value={project.progress} showLabel size="sm" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2">
                        {project.team.slice(0, 3).map((member, index) => (
                          <div
                            key={index}
                            className="h-8 w-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center"
                          >
                            <span className="text-xs font-medium text-gray-600">
                              {member.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        ))}
                        {project.team.length > 3 && (
                          <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center">
                            <span className="text-xs font-medium text-gray-600">
                              +{project.team.length - 3}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(project.endDate).toLocaleDateString()}
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

export default MyProjects;