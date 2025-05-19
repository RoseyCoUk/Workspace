import React from 'react';
import Button from '../../components/ui/Button';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Progress from '../../components/ui/Progress';
import Badge from '../../components/ui/Badge';
import { useAuth } from '../../context/AuthContext';
import { MessageSquare, Edit, Filter, Eye, Download, Upload } from 'lucide-react';

const ClientDashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your projects</p>
      </div>

      {/* Current Project Status */}
      <Card>
        <CardHeader title="Current Project Status" action={<Button size="sm">Active</Button>} />
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-medium">Website Redesign</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Start Date: April 15, 2023</span>
                  <span className="text-sm text-gray-500">Due Date: June 30, 2023</span>
                </div>
              </div>
              <Progress value={75} showLabel />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Manager:</span>
                <span className="text-sm font-medium">Admin User</span>
              </div>
              <Button size="sm" variant="outline" icon={<MessageSquare size={16} />}>
                Message
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Your Tasks */}
      <Card>
        <CardHeader 
          title="Your Tasks" 
          action={
            <div className="flex items-center gap-2">
              <Button size="sm" variant="ghost" icon={<Filter size={16} />}>
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
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Task
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-2">
                        <Badge variant="danger">High</Badge>
                      </div>
                      <div className="text-sm font-medium text-gray-900">Provide logo files</div>
                    </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <Badge variant="warning">Pending</Badge>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    May 12, 2023
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Approve wireframes</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <Badge variant="success">Complete</Badge>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    May 15, 2023
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">Provide homepage copy</div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <Badge variant="primary">In Review</Badge>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                    May 18, 2023
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit size={16} />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Eye size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Project Documents & Meeting Scheduler */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Project Documents */}
        <Card>
          <CardHeader 
            title="Project Documents" 
            action={<Button size="sm" variant="primary" icon={<Upload size={16} />}>Upload</Button>} 
          />
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-md">
                <div className="flex items-center justify-center h-16 mb-2 text-red-500">
                  <FileIcon type="pdf" />
                </div>
                <p className="text-center text-sm font-medium mb-1">Project Brief.pdf</p>
                <p className="text-center text-xs text-gray-500">3 weeks ago</p>
                <div className="flex items-center justify-center mt-2 gap-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Eye size={16} />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Download size={16} />
                  </button>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-md">
                <div className="flex items-center justify-center h-16 mb-2 text-blue-500">
                  <FileIcon type="docx" />
                </div>
                <p className="text-center text-sm font-medium mb-1">Content Outline.docx</p>
                <p className="text-center text-xs text-gray-500">1 week ago</p>
                <div className="flex items-center justify-center mt-2 gap-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Eye size={16} />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Download size={16} />
                  </button>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-md">
                <div className="flex items-center justify-center h-16 mb-2 text-green-500">
                  <FileIcon type="image" />
                </div>
                <p className="text-center text-sm font-medium mb-1">Wireframes.png</p>
                <p className="text-center text-xs text-gray-500">1 week ago</p>
                <div className="flex items-center justify-center mt-2 gap-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Eye size={16} />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Download size={16} />
                  </button>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-md">
                <div className="flex items-center justify-center h-16 mb-2 text-yellow-500">
                  <FileIcon type="xlsx" />
                </div>
                <p className="text-center text-sm font-medium mb-1">Budget.xlsx</p>
                <p className="text-center text-xs text-gray-500">2 weeks ago</p>
                <div className="flex items-center justify-center mt-2 gap-2">
                  <button className="text-gray-400 hover:text-gray-600">
                    <Eye size={16} />
                  </button>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Download size={16} />
                  </button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Meeting Scheduler */}
        <Card>
          <CardHeader title="Schedule a Meeting" />
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Available Time Slots</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                    <div>
                      <p className="text-sm font-medium">May 19, 2023</p>
                      <p className="text-xs text-gray-500">10:00 AM - 11:00 AM</p>
                    </div>
                    <Button size="sm">Book</Button>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Your Scheduled Meetings</h4>
                <div className="space-y-2">
                  <div className="p-3 border border-gray-200 rounded-md">
                    <p className="text-sm font-medium">Website Review</p>
                    <p className="text-xs text-gray-500">May 15, 2023 | 2:00 PM - 2:30 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Helper component for file icons
const FileIcon: React.FC<{ type: 'pdf' | 'docx' | 'xlsx' | 'image' }> = ({ type }) => {
  switch (type) {
    case 'pdf':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M9 15v-6" />
          <path d="M9 12h3" />
          <path d="M15 15v-6" />
          <path d="M12 15v-6" />
        </svg>
      );
    case 'docx':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M8 13h8" />
          <path d="M8 17h8" />
          <path d="M8 9h1" />
        </svg>
      );
    case 'xlsx':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M8 13h8" />
          <path d="M16 17H8" />
          <path d="M10 9h4" />
        </svg>
      );
    case 'image':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      );
    default:
      return null;
  }
};

export default ClientDashboard;