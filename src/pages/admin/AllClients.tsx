import React, { useState } from 'react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Progress from '../../components/ui/Progress';
import { Search, Filter, BarChart, Users, Briefcase, TrendingUp, Clock, MoreVertical, User } from 'lucide-react';

interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  status: 'Active' | 'Inactive' | 'Pending';
  projects: {
    total: number;
    active: number;
    completed: number;
  };
  revenue: {
    current: number;
    previous: number;
    trend: number;
  };
  engagement: number;
  lastActivity: string;
  avatar?: string;
}

const AllClients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const clients: Client[] = [
    {
      id: '1',
      name: 'Sarah Johnson',
      company: 'Tech Innovations Inc',
      email: 'sarah.j@techinnovations.com',
      status: 'Active',
      projects: {
        total: 8,
        active: 3,
        completed: 5
      },
      revenue: {
        current: 75000,
        previous: 65000,
        trend: 15.4
      },
      engagement: 92,
      lastActivity: '2 hours ago'
    },
    {
      id: '2',
      name: 'Michael Chen',
      company: 'Global Solutions Ltd',
      email: 'm.chen@globalsolutions.com',
      status: 'Active',
      projects: {
        total: 5,
        active: 2,
        completed: 3
      },
      revenue: {
        current: 45000,
        previous: 40000,
        trend: 12.5
      },
      engagement: 88,
      lastActivity: '1 day ago'
    },
    {
      id: '3',
      name: 'Emily Davis',
      company: 'Creative Minds Agency',
      email: 'emily@creativeminds.com',
      status: 'Pending',
      projects: {
        total: 2,
        active: 1,
        completed: 1
      },
      revenue: {
        current: 15000,
        previous: 0,
        trend: 100
      },
      engagement: 75,
      lastActivity: '3 days ago'
    }
  ];

  const metrics = {
    totalClients: clients.length,
    activeClients: clients.filter(c => c.status === 'Active').length,
    totalRevenue: clients.reduce((sum, client) => sum + client.revenue.current, 0),
    averageEngagement: Math.round(
      clients.reduce((sum, client) => sum + client.engagement, 0) / clients.length
    )
  };

  const getStatusColor = (status: Client['status']) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'danger';
      case 'Pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !selectedStatus || client.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">All Clients</h1>
        <p className="text-gray-500 mt-1">Overview and analytics of all client relationships</p>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Clients</p>
                <h3 className="text-2xl font-semibold mt-1">{metrics.totalClients}</h3>
              </div>
              <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                <Users size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active Clients</p>
                <h3 className="text-2xl font-semibold mt-1">{metrics.activeClients}</h3>
              </div>
              <div className="p-3 bg-green-100 rounded-full text-green-600">
                <Briefcase size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-semibold mt-1">
                  ${metrics.totalRevenue.toLocaleString()}
                </h3>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full text-yellow-600">
                <TrendingUp size={20} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Engagement</p>
                <h3 className="text-2xl font-semibold mt-1">{metrics.averageEngagement}%</h3>
              </div>
              <div className="p-3 bg-purple-100 rounded-full text-purple-600">
                <BarChart size={20} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Client List */}
      <Card>
        <CardHeader 
          title="Client Analytics" 
          action={
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search clients..."
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
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projects
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Engagement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredClients.map(client => (
                  <tr key={client.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          {client.avatar ? (
                            <img
                              className="h-10 w-10 rounded-full"
                              src={client.avatar}
                              alt={client.name}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="h-5 w-5 text-gray-500" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{client.name}</div>
                          <div className="text-sm text-gray-500">{client.company}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {client.projects.active} Active
                      </div>
                      <div className="text-sm text-gray-500">
                        {client.projects.completed} Completed
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${client.revenue.current.toLocaleString()}
                      </div>
                      <div className="flex items-center text-sm">
                        <TrendingUp 
                          size={14} 
                          className={client.revenue.trend >= 0 ? 'text-green-500' : 'text-red-500'} 
                        />
                        <span className={`ml-1 ${client.revenue.trend >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                          {client.revenue.trend}%
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-32">
                        <Progress value={client.engagement} showLabel size="sm" />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusColor(client.status)}>
                        {client.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={14} className="mr-1" />
                        {client.lastActivity}
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

export default AllClients;