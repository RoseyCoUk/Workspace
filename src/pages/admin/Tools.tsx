import React, { useState } from 'react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Search, Plus, ExternalLink, Star, Bookmark, Edit, Trash2, X } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  url: string;
  description: string;
  category: string;
  favorite: boolean;
}

const Tools: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTool, setNewTool] = useState({
    name: '',
    url: '',
    description: '',
    category: 'Design',
  });

  const categories = [
    'All Tools',
    'Design',
    'Development',
    'Marketing',
    'Analytics',
    'Productivity',
    'Communication'
  ];

  const tools: Tool[] = [
    {
      id: '1',
      name: 'Figma',
      url: 'https://figma.com',
      description: 'Collaborative interface design tool',
      category: 'Design',
      favorite: true
    },
    {
      id: '2',
      name: 'GitHub',
      url: 'https://github.com',
      description: 'Code hosting platform',
      category: 'Development',
      favorite: true
    },
    {
      id: '3',
      name: 'Google Analytics',
      url: 'https://analytics.google.com',
      description: 'Web analytics service',
      category: 'Analytics',
      favorite: false
    },
    {
      id: '4',
      name: 'Slack',
      url: 'https://slack.com',
      description: 'Business communication platform',
      category: 'Communication',
      favorite: true
    },
    {
      id: '5',
      name: 'Mailchimp',
      url: 'https://mailchimp.com',
      description: 'Email marketing platform',
      category: 'Marketing',
      favorite: false
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewTool(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('New tool:', newTool);
    setIsModalOpen(false);
    setNewTool({
      name: '',
      url: '',
      description: '',
      category: 'Design'
    });
  };

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All Tools' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Tools & Links</h1>
          <p className="text-gray-500 mt-1">Quick access to all your important tools and resources</p>
        </div>
        <Button variant="primary" icon={<Plus size={16} />} onClick={() => setIsModalOpen(true)}>
          Add New Tool
        </Button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Tool</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Tool Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newTool.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                  URL
                </label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={newTool.url}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newTool.description}
                  onChange={handleInputChange}
                  rows={3}
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
                  value={newTool.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="Design">Design</option>
                  <option value="Development">Development</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Analytics">Analytics</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Communication">Communication</option>
                </select>
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
                  Add Tool
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Card>
        <CardHeader 
          title="Tools Library" 
          action={
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search tools..."
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
                  onClick={() => setSelectedCategory(category === 'All Tools' ? null : category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map(tool => (
              <div
                key={tool.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{tool.name}</h3>
                    <Badge variant="primary" className="mt-1">{tool.category}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className={`text-gray-400 hover:text-yellow-500 ${tool.favorite ? 'text-yellow-500' : ''}`}>
                      <Star size={16} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Bookmark size={16} />
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-500 mb-4">{tool.description}</p>
                
                <div className="flex items-center justify-between">
                  <a
                    href={tool.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1"
                  >
                    Visit Tool
                    <ExternalLink size={14} />
                  </a>
                  
                  <div className="flex items-center gap-2">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit size={16} />
                    </button>
                    <button className="text-gray-400 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Tools;