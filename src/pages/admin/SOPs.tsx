import React, { useState } from 'react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Search, Plus, FileText, BookOpen, Play, Clock, Users, CheckCircle, X } from 'lucide-react';

interface SOP {
  id: string;
  title: string;
  category: string;
  description: string;
  lastUpdated: string;
  status: 'Draft' | 'Published' | 'Under Review';
  assignedTo: string[];
  completionRate: number;
}

const SOPs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSOP, setNewSOP] = useState({
    title: '',
    category: 'Process',
    description: '',
    assignedTo: [],
  });

  const categories = [
    'All',
    'Process',
    'Client Onboarding',
    'Project Management',
    'Quality Assurance',
    'Team Training',
    'Security'
  ];

  const sops: SOP[] = [
    {
      id: '1',
      title: 'New Client Onboarding Process',
      category: 'Client Onboarding',
      description: 'Step-by-step guide for onboarding new clients, including documentation requirements and communication templates.',
      lastUpdated: '2024-03-15',
      status: 'Published',
      assignedTo: ['Account Managers', 'Project Managers'],
      completionRate: 85
    },
    {
      id: '2',
      title: 'Project Kickoff Guidelines',
      category: 'Project Management',
      description: 'Standard procedures for initiating new projects, including checklist and meeting agenda templates.',
      lastUpdated: '2024-03-10',
      status: 'Published',
      assignedTo: ['Project Managers'],
      completionRate: 92
    },
    {
      id: '3',
      title: 'Quality Assurance Checklist',
      category: 'Quality Assurance',
      description: 'Comprehensive QA process for deliverables review and approval.',
      lastUpdated: '2024-03-08',
      status: 'Under Review',
      assignedTo: ['QA Team', 'Developers'],
      completionRate: 78
    },
    {
      id: '4',
      title: 'Security Protocol Training',
      category: 'Security',
      description: 'Essential security practices and protocols for all team members.',
      lastUpdated: '2024-03-05',
      status: 'Published',
      assignedTo: ['All Team Members'],
      completionRate: 95
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewSOP(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New SOP:', newSOP);
    setIsModalOpen(false);
    setNewSOP({
      title: '',
      category: 'Process',
      description: '',
      assignedTo: [],
    });
  };

  const filteredSOPs = sops.filter(sop => {
    const matchesSearch = sop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sop.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || sop.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusColor = (status: SOP['status']) => {
    switch (status) {
      case 'Published':
        return 'success';
      case 'Draft':
        return 'warning';
      case 'Under Review':
        return 'primary';
      default:
        return 'default';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SOPs & Training</h1>
          <p className="text-gray-500 mt-1">Manage and organize standard operating procedures and training materials</p>
        </div>
        <Button variant="primary" icon={<Plus size={16} />} onClick={() => setIsModalOpen(true)}>
          Create New SOP
        </Button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create New SOP</h2>
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
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newSOP.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={newSOP.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {categories.filter(cat => cat !== 'All').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newSOP.description}
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
                  Create SOP
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Card>
        <CardHeader 
          title="SOPs Library" 
          action={
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search SOPs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          }
        />
        <CardContent>
          <div className="mb-6 border-b border-gray-200">
            <div className="flex flex-wrap gap-2 pb-4">
              {categories.map(category => (
                <Button
                  key={category}
                  size="sm"
                  variant={selectedCategory === category ? 'primary' : 'ghost'}
                  onClick={() => setSelectedCategory(category === 'All' ? null : category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredSOPs.map(sop => (
              <div
                key={sop.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-gray-100 rounded-md text-gray-600">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{sop.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={getStatusColor(sop.status)}>
                          {sop.status}
                        </Badge>
                        <span className="text-sm text-gray-500">{sop.category}</span>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">{sop.description}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Clock size={14} />
                          <span>Updated {sop.lastUpdated}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <Users size={14} />
                          <span>{sop.assignedTo.join(', ')}</span>
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <CheckCircle size={14} />
                          <span>{sop.completionRate}% Completion</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" icon={<Play size={16} />}>
                    Start Training
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SOPs;