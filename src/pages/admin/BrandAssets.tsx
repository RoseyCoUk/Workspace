import React, { useState } from 'react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Search, Plus, Filter, Download, Share2, MoreVertical, Image, FileText, Folder, Upload, X } from 'lucide-react';

interface Asset {
  id: string;
  name: string;
  type: 'logo' | 'icon' | 'image' | 'document' | 'font';
  category: string;
  format: string;
  size: string;
  uploadedBy: string;
  uploadedAt: string;
  url: string;
  thumbnail?: string;
}

const BrandAssets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = [
    'All Assets',
    'Logos',
    'Icons',
    'Images',
    'Documents',
    'Fonts',
    'Templates'
  ];

  const assets: Asset[] = [
    {
      id: '1',
      name: 'Logo Primary',
      type: 'logo',
      category: 'Logos',
      format: 'SVG',
      size: '24 KB',
      uploadedBy: 'Sarah Johnson',
      uploadedAt: '2024-03-15',
      url: 'https://example.com/logo.svg',
      thumbnail: 'https://via.placeholder.com/150'
    },
    {
      id: '2',
      name: 'Brand Guidelines',
      type: 'document',
      category: 'Documents',
      format: 'PDF',
      size: '2.4 MB',
      uploadedBy: 'Mike Chen',
      uploadedAt: '2024-03-14',
      url: 'https://example.com/guidelines.pdf'
    },
    {
      id: '3',
      name: 'Social Media Icons',
      type: 'icon',
      category: 'Icons',
      format: 'PNG',
      size: '156 KB',
      uploadedBy: 'Emily Davis',
      uploadedAt: '2024-03-13',
      url: 'https://example.com/icons.zip',
      thumbnail: 'https://via.placeholder.com/150'
    },
    {
      id: '4',
      name: 'Company Font',
      type: 'font',
      category: 'Fonts',
      format: 'OTF',
      size: '245 KB',
      uploadedBy: 'Chris Wilson',
      uploadedAt: '2024-03-12',
      url: 'https://example.com/font.otf'
    }
  ];

  const getAssetIcon = (type: Asset['type']) => {
    switch (type) {
      case 'logo':
      case 'image':
        return <Image className="text-blue-500" />;
      case 'document':
        return <FileText className="text-red-500" />;
      case 'icon':
        return <Image className="text-green-500" />;
      case 'font':
        return <FileText className="text-purple-500" />;
      default:
        return <FileText className="text-gray-500" />;
    }
  };

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = 
      asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      asset.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'All Assets' || asset.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Brand Assets</h1>
          <p className="text-gray-500 mt-1">Manage and organize brand assets and resources</p>
        </div>
        <Button variant="primary" icon={<Plus size={16} />} onClick={() => setIsModalOpen(true)}>
          Upload Asset
        </Button>
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Upload Asset</h2>
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
                  Maximum file size: 50MB
                </p>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Asset Category
              </label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              >
                {categories.filter(cat => cat !== 'All Assets').map(category => (
                  <option key={category} value={category}>
                    {category}
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
                Upload
              </Button>
            </div>
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
                    onClick={() => setSelectedCategory(category === 'All Assets' ? null : category)}
                    className={`w-full flex items-center justify-between p-2 rounded-md text-left ${
                      selectedCategory === category ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Folder size={18} />
                      <span>{category}</span>
                    </span>
                    <span className="text-sm text-gray-500">
                      {assets.filter(a => category === 'All Assets' || a.category === category).length}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Storage Used</span>
                      <span className="font-medium">45%</span>
                    </div>
                    <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: '45%' }} />
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      2.25 GB of 5 GB used
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assets Grid */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader 
              title="Assets Library" 
              action={
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="text"
                      placeholder="Search assets..."
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAssets.map(asset => (
                  <div
                    key={asset.id}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-colors"
                  >
                    {asset.thumbnail ? (
                      <div className="aspect-video bg-gray-100 flex items-center justify-center">
                        <img
                          src={asset.thumbnail}
                          alt={asset.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video bg-gray-100 flex items-center justify-center">
                        {getAssetIcon(asset.type)}
                      </div>
                    )}
                    
                    <div className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-gray-900">{asset.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="primary">{asset.format}</Badge>
                            <span className="text-sm text-gray-500">{asset.size}</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" icon={<MoreVertical size={16} />} />
                      </div>
                      
                      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                        <span>Uploaded {new Date(asset.uploadedAt).toLocaleDateString()}</span>
                      </div>
                      
                      <div className="mt-4 flex items-center gap-2">
                        <Button variant="outline" size="sm" icon={<Download size={16} />}>
                          Download
                        </Button>
                        <Button variant="ghost" size="sm" icon={<Share2 size={16} />} />
                      </div>
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

export default BrandAssets;