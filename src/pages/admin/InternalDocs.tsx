import React, { useState } from 'react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Search, FolderOpen, File, ChevronRight, Plus, Clock, Users, BookOpen } from 'lucide-react';

interface Document {
  id: string;
  title: string;
  category: string;
  lastUpdated: string;
  updatedBy: string;
  status: 'Draft' | 'Published' | 'Archived';
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
}

const InternalDocs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories: Category[] = [
    { id: '1', name: 'Company Policies', icon: <BookOpen size={20} />, count: 12 },
    { id: '2', name: 'Process Guidelines', icon: <FolderOpen size={20} />, count: 8 },
    { id: '3', name: 'Templates', icon: <File size={20} />, count: 15 },
    { id: '4', name: 'Team Resources', icon: <Users size={20} />, count: 6 },
  ];

  const documents: Document[] = [
    {
      id: '1',
      title: 'Employee Onboarding Guide',
      category: 'Company Policies',
      lastUpdated: '2024-03-15',
      updatedBy: 'Sarah Johnson',
      status: 'Published'
    },
    {
      id: '2',
      title: 'Project Management Framework',
      category: 'Process Guidelines',
      lastUpdated: '2024-03-10',
      updatedBy: 'Mike Thompson',
      status: 'Published'
    },
    {
      id: '3',
      title: 'Brand Style Guide 2024',
      category: 'Templates',
      lastUpdated: '2024-03-08',
      updatedBy: 'Emily Davis',
      status: 'Draft'
    },
    {
      id: '4',
      title: 'Client Communication Templates',
      category: 'Templates',
      lastUpdated: '2024-03-05',
      updatedBy: 'Chris Wilson',
      status: 'Published'
    },
    {
      id: '5',
      title: 'Remote Work Policy',
      category: 'Company Policies',
      lastUpdated: '2024-03-01',
      updatedBy: 'Sarah Johnson',
      status: 'Published'
    }
  ];

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Internal Documents</h1>
          <p className="text-gray-500 mt-1">Manage and organize company documentation</p>
        </div>
        <Button variant="primary" icon={<Plus size={16} />}>
          New Document
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader title="Categories" />
            <CardContent>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full flex items-center justify-between p-2 rounded-md text-left ${
                    !selectedCategory ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <BookOpen size={20} />
                    <span>All Documents</span>
                  </span>
                  <span className="text-sm text-gray-500">{documents.length}</span>
                </button>
                
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`w-full flex items-center justify-between p-2 rounded-md text-left ${
                      selectedCategory === category.name ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {category.icon}
                      <span>{category.name}</span>
                    </span>
                    <span className="text-sm text-gray-500">{category.count}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents List */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader 
              title="Documents" 
              action={
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              }
            />
            <CardContent>
              <div className="space-y-4">
                {filteredDocuments.map(doc => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-gray-100 rounded-md text-gray-600">
                        <File size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{doc.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={doc.status === 'Published' ? 'success' : 'warning'}>
                            {doc.status}
                          </Badge>
                          <span className="text-sm text-gray-500">{doc.category}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                          <Clock size={14} />
                          <span>Updated {doc.lastUpdated} by {doc.updatedBy}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" icon={<ChevronRight size={16} />}>
                      View
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InternalDocs;