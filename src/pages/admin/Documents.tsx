import React, { useState } from 'react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Search, Plus, Filter, Download, Share2, MoreVertical, Folder, FileText, Image, File, Upload, X, User } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'image' | 'other';
  size: string;
  uploadedBy: {
    name: string;
    avatar?: string;
  };
  uploadedAt: string;
  folder: string;
  shared: boolean;
}

const Documents: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const folders = [
    { id: 'client-files', name: 'Client Files', count: 45 },
    { id: 'project-docs', name: 'Project Documents', count: 32 },
    { id: 'templates', name: 'Templates', count: 15 },
    { id: 'contracts', name: 'Contracts', count: 8 },
    { id: 'marketing', name: 'Marketing Assets', count: 24 },
    { id: 'brand', name: 'Brand Assets', count: 18 }
  ];

  const documents: Document[] = [
    {
      id: '1',
      name: 'Project Proposal Template.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadedBy: {
        name: 'Sarah Johnson'
      },
      uploadedAt: '2024-03-15',
      folder: 'templates',
      shared: true
    },
    {
      id: '2',
      name: 'Brand Guidelines 2024.pdf',
      type: 'pdf',
      size: '8.7 MB',
      uploadedBy: {
        name: 'Mike Chen'
      },
      uploadedAt: '2024-03-14',
      folder: 'brand',
      shared: true
    },
    {
      id: '3',
      name: 'Client Contract Template.doc',
      type: 'doc',
      size: '245 KB',
      uploadedBy: {
        name: 'Emily Davis'
      },
      uploadedAt: '2024-03-13',
      folder: 'contracts',
      shared: false
    },
    {
      id: '4',
      name: 'Marketing Campaign Assets.zip',
      type: 'other',
      size: '156 MB',
      uploadedBy: {
        name: 'Chris Wilson'
      },
      uploadedAt: '2024-03-12',
      folder: 'marketing',
      shared: true
    },
    {
      id: '5',
      name: 'Website Mockups.png',
      type: 'image',
      size: '4.2 MB',
      uploadedBy: {
        name: 'Sarah Johnson'
      },
      uploadedAt: '2024-03-11',
      folder: 'project-docs',
      shared: true
    }
  ];

  const getFileIcon = (type: Document['type']) => {
    switch (type) {
      case 'pdf':
        return <FileText className="text-red-500" />;
      case 'doc':
        return <FileText className="text-blue-500" />;
      case 'image':
        return <Image className="text-green-500" />;
      default:
        return <File className="text-gray-500" />;
    }
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFolder = !selectedFolder || doc.folder === selectedFolder;
    return matchesSearch && matchesFolder;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-500 mt-1">Manage and organize your files and documents</p>
        </div>
        <Button variant="primary" icon={<Plus size={16} />} onClick={() => setIsModalOpen(true)}>
          Upload Files
        </Button>
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upload Files</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Drag and drop your files here, or
                    <button className="mx-1 text-red-600 hover:text-red-500 font-medium">
                      browse
                    </button>
                    to choose files
                  </p>
                </div>
                <p className="mt-2 text-xs text-gray-500">
                  Maximum file size: 100MB
                </p>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Folder
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {folders.map(folder => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
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
              <Button type="button" variant="primary">
                Upload Files
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Folders Sidebar */}
        <div>
          <Card>
            <CardHeader title="Folders" />
            <CardContent>
              <div className="space-y-1">
                <button
                  onClick={() => setSelectedFolder(null)}
                  className={`w-full flex items-center justify-between p-2 rounded-md text-left ${
                    !selectedFolder ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center">
                    <Folder size={18} className="mr-2" />
                    <span>All Files</span>
                  </div>
                  <span className="text-sm text-gray-500">{documents.length}</span>
                </button>
                
                {folders.map(folder => (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-md text-left ${
                      selectedFolder === folder.id ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <Folder size={18} className="mr-2" />
                      <span>{folder.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{folder.count}</span>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Storage Used</span>
                      <span className="font-medium">64%</span>
                    </div>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: '64%' }} />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      3.2 GB of 5 GB used
                    </p>
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
              title="Files" 
              action={
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder="Search files..."
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
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Uploaded By
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Modified
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredDocuments.map(doc => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center">
                              {getFileIcon(doc.type)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                              <div className="text-sm text-gray-500">
                                {folders.find(f => f.id === doc.folder)?.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {doc.size}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              {doc.uploadedBy.avatar ? (
                                <img
                                  className="h-8 w-8 rounded-full"
                                  src={doc.uploadedBy.avatar}
                                  alt={doc.uploadedBy.name}
                                />
                              ) : (
                                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                  <User className="h-4 w-4 text-gray-500" />
                                </div>
                              )}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm text-gray-900">{doc.uploadedBy.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(doc.uploadedAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <Button variant="ghost" size="sm" icon={<Download size={16} />} />
                            <Button variant="ghost" size="sm" icon={<Share2 size={16} />} />
                            <Button variant="ghost" size="sm" icon={<MoreVertical size={16} />} />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Documents;