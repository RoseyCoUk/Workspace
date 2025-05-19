import React, { useState } from 'react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Progress from '../../components/ui/Progress';
import { 
  Download, Filter, Calendar, TrendingUp, Users, DollarSign, 
  BarChart2, PieChart, ArrowUp, ArrowDown, ChevronDown
} from 'lucide-react';

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState('This Month');
  const [selectedReport, setSelectedReport] = useState('all');

  const metrics = {
    revenue: {
      current: 125000,
      previous: 98000,
      trend: 27.55
    },
    clients: {
      current: 45,
      previous: 38,
      trend: 18.42
    },
    projects: {
      current: 28,
      previous: 24,
      trend: 16.67
    },
    satisfaction: {
      current: 94,
      previous: 89,
      trend: 5.62
    }
  };

  const projectMetrics = [
    { name: 'Website Development', value: 35 },
    { name: 'Digital Marketing', value: 25 },
    { name: 'Branding', value: 20 },
    { name: 'Social Media', value: 15 },
    { name: 'Other Services', value: 5 }
  ];

  const revenueData = [
    { month: 'Jan', value: 65000 },
    { month: 'Feb', value: 72000 },
    { month: 'Mar', value: 85000 },
    { month: 'Apr', value: 95000 },
    { month: 'May', value: 115000 },
    { month: 'Jun', value: 125000 }
  ];

  const topClients = [
    {
      name: 'Tech Innovations Inc',
      revenue: 45000,
      projects: 3,
      satisfaction: 98
    },
    {
      name: 'Global Solutions Ltd',
      revenue: 38000,
      projects: 2,
      satisfaction: 95
    },
    {
      name: 'Creative Minds Agency',
      revenue: 32000,
      projects: 2,
      satisfaction: 92
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-500 mt-1">Track performance metrics and business insights</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            icon={<Calendar size={16} />}
            onClick={() => {}}
          >
            {dateRange}
            <ChevronDown size={16} className="ml-2" />
          </Button>
          <Button 
            variant="outline"
            icon={<Download size={16} />}
          >
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign size={20} className="text-green-600" />
              </div>
              <Badge 
                variant={metrics.revenue.trend >= 0 ? 'success' : 'danger'}
                className="flex items-center"
              >
                {metrics.revenue.trend >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                {Math.abs(metrics.revenue.trend)}%
              </Badge>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">
              ${metrics.revenue.current.toLocaleString()}
            </h3>
            <p className="text-sm text-gray-500 mt-1">Total Revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Users size={20} className="text-blue-600" />
              </div>
              <Badge 
                variant={metrics.clients.trend >= 0 ? 'success' : 'danger'}
                className="flex items-center"
              >
                {metrics.clients.trend >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                {Math.abs(metrics.clients.trend)}%
              </Badge>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">
              {metrics.clients.current}
            </h3>
            <p className="text-sm text-gray-500 mt-1">Active Clients</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <BarChart2 size={20} className="text-purple-600" />
              </div>
              <Badge 
                variant={metrics.projects.trend >= 0 ? 'success' : 'danger'}
                className="flex items-center"
              >
                {metrics.projects.trend >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                {Math.abs(metrics.projects.trend)}%
              </Badge>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">
              {metrics.projects.current}
            </h3>
            <p className="text-sm text-gray-500 mt-1">Active Projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <PieChart size={20} className="text-yellow-600" />
              </div>
              <Badge 
                variant={metrics.satisfaction.trend >= 0 ? 'success' : 'danger'}
                className="flex items-center"
              >
                {metrics.satisfaction.trend >= 0 ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                {Math.abs(metrics.satisfaction.trend)}%
              </Badge>
            </div>
            <h3 className="text-2xl font-semibold text-gray-900">
              {metrics.satisfaction.current}%
            </h3>
            <p className="text-sm text-gray-500 mt-1">Client Satisfaction</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card>
          <CardHeader 
            title="Revenue Trend" 
            action={
              <Button variant="ghost" size="sm" icon={<Filter size={16} />}>
                Filter
              </Button>
            }
          />
          <CardContent>
            <div className="h-64 flex items-end justify-between">
              {revenueData.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-12 bg-red-100 rounded-t-md hover:bg-red-200 transition-colors cursor-pointer"
                    style={{ height: `${(item.value / 125000) * 200}px` }}
                  >
                    <div 
                      className="w-full bg-red-500 rounded-t-md transition-all"
                      style={{ height: '3px' }}
                    />
                  </div>
                  <div className="mt-2 text-sm text-gray-600">{item.month}</div>
                  <div className="text-xs text-gray-500">${(item.value / 1000).toFixed(0)}k</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Project Distribution */}
        <Card>
          <CardHeader 
            title="Project Distribution" 
            action={
              <div className="flex items-center gap-2">
                <Badge variant="success">On Track</Badge>
                <Badge variant="warning">At Risk</Badge>
                <Badge variant="danger">Delayed</Badge>
              </div>
            }
          />
          <CardContent>
            <div className="space-y-4">
              {projectMetrics.map((project, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">
                      {project.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      {project.value}%
                    </span>
                  </div>
                  <Progress value={project.value} size="md" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Clients */}
      <Card>
        <CardHeader 
          title="Top Performing Clients" 
          action={
            <Button variant="ghost" size="sm" icon={<TrendingUp size={16} />}>
              View All
            </Button>
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
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Projects
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Satisfaction
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {topClients.map((client, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {client.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${client.revenue.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {client.projects} active
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-32">
                        <Progress value={client.satisfaction} size="sm" />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="success">Active</Badge>
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

export default Reports;