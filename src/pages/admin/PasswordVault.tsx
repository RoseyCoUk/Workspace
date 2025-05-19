import React, { useState } from 'react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Eye, EyeOff, Plus, Search, Copy, Key, Globe, Lock, Trash2, X } from 'lucide-react';

interface PasswordEntry {
  id: string;
  name: string;
  username: string;
  password: string;
  url?: string;
  category: string;
  lastUpdated: string;
}

interface NewCredential {
  name: string;
  username: string;
  password: string;
  url: string;
  category: string;
}

const PasswordVault: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCredential, setNewCredential] = useState<NewCredential>({
    name: '',
    username: '',
    password: '',
    url: '',
    category: 'Development'
  });

  const passwords: PasswordEntry[] = [
    {
      id: '1',
      name: 'Client Portal Staging',
      username: 'admin@roseyco.com',
      password: 'securepass123',
      url: 'https://staging.clientportal.com',
      category: 'Development',
      lastUpdated: '2024-03-15'
    },
    {
      id: '2',
      name: 'Social Media Management',
      username: 'social.media@roseyco.com',
      password: 'mediapass456',
      url: 'https://buffer.com',
      category: 'Marketing',
      lastUpdated: '2024-03-10'
    },
    {
      id: '3',
      name: 'Design Assets Storage',
      username: 'design@roseyco.com',
      password: 'designpass789',
      url: 'https://drive.google.com',
      category: 'Design',
      lastUpdated: '2024-03-05'
    }
  ];

  const togglePasswordVisibility = (id: string) => {
    setShowPassword(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewCredential(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('New credential:', newCredential);
    setIsModalOpen(false);
    setNewCredential({
      name: '',
      username: '',
      password: '',
      url: '',
      category: 'Development'
    });
  };

  const filteredPasswords = passwords.filter(entry =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Password Vault</h1>
          <p className="text-gray-500 mt-1">Securely store and manage team credentials</p>
        </div>
        <Button variant="primary" icon={<Plus size={16} />} onClick={() => setIsModalOpen(true)}>
          Add New Credential
        </Button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Add New Credential</h2>
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
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newCredential.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={newCredential.username}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={newCredential.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
                  URL (optional)
                </label>
                <input
                  type="url"
                  id="url"
                  name="url"
                  value={newCredential.url}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={newCredential.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="Development">Development</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Design">Design</option>
                  <option value="Sales">Sales</option>
                  <option value="Other">Other</option>
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
                  Save Credential
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Card>
        <CardHeader 
          title="Stored Credentials" 
          action={
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search credentials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
          }
        />
        <CardContent>
          <div className="space-y-4">
            {filteredPasswords.map(entry => (
              <div key={entry.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-gray-100 rounded-md text-gray-600">
                      {entry.url ? <Globe size={20} /> : <Key size={20} />}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{entry.name}</h3>
                      <p className="text-sm text-gray-500">{entry.username}</p>
                      {entry.url && (
                        <a 
                          href={entry.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          {entry.url}
                        </a>
                      )}
                    </div>
                  </div>
                  <Badge variant="primary">{entry.category}</Badge>
                </div>
                
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="relative flex items-center">
                      <input
                        type={showPassword[entry.id] ? 'text' : 'password'}
                        value={entry.password}
                        readOnly
                        className="pr-24 pl-3 py-1.5 border border-gray-300 rounded-md bg-gray-50 text-sm"
                      />
                      <div className="absolute right-2 flex items-center space-x-1">
                        <button
                          onClick={() => togglePasswordVisibility(entry.id)}
                          className="p-1 hover:text-gray-700 text-gray-500"
                        >
                          {showPassword[entry.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                        <button
                          onClick={() => copyToClipboard(entry.password)}
                          className="p-1 hover:text-gray-700 text-gray-500"
                        >
                          <Copy size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>Updated {entry.lastUpdated}</span>
                    <button className="p-1 hover:text-red-600 transition-colors">
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

export default PasswordVault;