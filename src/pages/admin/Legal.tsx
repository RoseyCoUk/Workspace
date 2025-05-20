import React, { useState } from 'react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Search, Plus, Filter, Download, Share2, MoreVertical, FileText, Folder, Upload, X, Scale, Clock, User } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'contract' | 'agreement' | 'policy' | 'legal';
  category: string;
  status: 'Active' | 'Draft' | 'Expired' | 'Under Review';
  client?: string;
  expiryDate?: string;
  lastUpdated: string;
  updatedBy: string;
  size: string;
}

const Legal: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newDocument, setNewDocument] = useState({
    name: '',
    type: 'contract',
    category: 'Client Contracts',
    client: '',
    expiryDate: '',
  });

  const categories = [
    'All Documents',
    'Client Contracts',
    'Service Agreements',
    'NDAs',
    'Company Policies',
    'Terms & Conditions',
    'Legal Templates'
  ];

  const documents: Document[] = [
    {
      id: '1',
      name: 'Website Development Agreement',
      type: 'contract',
      category: 'Client Contracts',
      status: 'Active',
      client: 'Tech Innovations Inc',
      expiryDate: '2024-12-31',
      lastUpdated: '2024-03-15',
      updatedBy: 'Sarah Johnson',
      size: '245 KB'
    },
    {
      id: '2',
      name: 'Non-Disclosure Agreement',
      type: 'agreement',
      category: 'NDAs',
      status: 'Active',
      client: 'Global Solutions Ltd',
      expiryDate: '2024-06-30',
      lastUpdated: '2024-03-10',
      updatedBy: 'Mike Chen',
      size: '156 KB'
    },
    {
      id: '3',
      name: 'Employee Handbook',
      type: 'policy',
      category: 'Company Policies',
      status: 'Active',
      lastUpdated: '2024-03-01',
      updatedBy: 'Emily Davis',
      size: '1.2 MB'
    },
    {
      id: '4',
      name: 'Service Level Agreement Template',
      type: 'legal',
      category: 'Legal Templates',
      status: 'Draft',
      lastUpdated: '2024-03-05',
      updatedBy: 'Chris Wilson',
      size: '189 KB'
    }
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewDocument(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New document:', newDocument);
    setIsModalOpen(false);
    setNewDocument({
      name: '',
      type: 'contract',
      category: 'Client Contracts',
      client: '',
      expiryDate: '',
    });
  };

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Draft':
        return 'warning';
      case 'Expired':
        return 'danger';
      case 'Under Review':
        return 'primary';
      default:
        return 'default';
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.client && doc.client.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || selectedCategory === 'All Documents' || doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Legal & Contracts</h1>
          <p className="text-gray-500 mt-1">Manage legal documents, contracts, and agreements</p>
        </div>
        <Button variant="primary" icon={<Plus size={16} />} onClick={() => setIsModalOpen(true)}>
          New Document
        </Button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create New Document</h2>
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
                  Document Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newDocument.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Document Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={newDocument.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="contract">Contract</option>
                  <option value="agreement">Agreement</option>
                  <option value="policy">Policy</option>
                  <option value="legal">Legal Document</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={newDocument.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  {categories.filter(cat => cat !== 'All Documents').map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label htmlFor="client" className="block text-sm font-medium text-gray-700 mb-1">
                  Client (if applicable)
                </label>
                <input
                  type="text"
                  id="client"
                  name="client"
                  value={newDocument.client}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Expiry Date (if applicable)
                </label>
                <input
                  type="date"
                  id="expiryDate"
                  name="expiryDate"
                  value={newDocument.expiryDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mt-4">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">
                      Upload document file or
                      <button className="mx-1 text-red-600 hover:text-red-500 font-medium">
                        browse
                      </button>
                      to choose
                    </p>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">
                    PDF, DOCX, or DOC up to 10MB
                  </p>
                </div>
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
                  Create Document
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Categories Sidebar */}
        <div>
          <Card>
            <CardHeader title="Categories" />
            <CardContent>
              <div className="space-y-1">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category === 'All Documents' ? null : category)}
                    className={`w-full flex items-center justify-between p-2 rounded-md text-left ${
                      selectedCategory === category ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Folder size={18} />
                      <span>{category}</span>
                    </span>
                    <span className="text-sm text-gray-500">
                      {documents.filter(d => category === 'All Documents' || d.category === category).length}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Quick Stats</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Active Contracts</span>
                        <span className="font-medium">
                          {documents.filter(d => d.status === 'Active').length}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Expiring Soon</span>
                        <span className="font-medium text-yellow-600">2</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Recently Updated</span>
                        <span className="font-medium">5</span>
                      </div>
                    </div>
                  </div>
                </div>
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
                <div className="flex items-center gap-3">
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
                  <Button variant="outline" size="sm" icon={<Filter size={16} />}>
                    Filter
                  </Button>
                </div>
              }
            />
            <CardContent>
              <div className="space-y-4">
                {filteredDocuments.map(doc => (
                  <div
                    key={doc.id}
                    className="flex items-start justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-gray-100 rounded-md text-gray-600">
                        <Scale size={20} />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{doc.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={getStatusColor(doc.status)}>
                            {doc.status}
                          </Badge>
                          <span className="text-sm text-gray-500">{doc.category}</span>
                        </div>
                        {doc.client && (
                          <p className="text-sm text-gray-500 mt-1">
                            Client: {doc.client}
                          </p>
                        )}
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <Clock size={14} />
                            <span>Updated {doc.lastUpdated}</span>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-gray-500">
                            <User size={14} />
                            <span>{doc.updatedBy}</span>
                          </div>
                          {doc.expiryDate && (
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Scale size={14} />
                              <span>Expires {doc.expiryDate}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" icon={<Download size={16} />}>
                        Download
                      </Button>
                      <Button variant="ghost" size="sm" icon={<Share2 size={16} />} />
                      <Button variant="ghost" size="sm" icon={<MoreVertical size={16} />} />
                    </div>
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

export default Legal;