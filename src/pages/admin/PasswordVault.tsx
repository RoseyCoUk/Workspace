import React, { useState } from 'react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Eye, EyeOff, Plus, Search, Copy, Key, Globe, Lock, Trash2 } from 'lucide-react';

interface PasswordEntry {
  id: string;
  name: string;
  username: string;
  password: string;
  url?: string;
  category: string;
  lastUpdated: string;
}

const PasswordVault: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});
  
  // Mock data - in production this would come from a secure backend
  const passwords: PasswordEntry[] = [
    {
      id: '1',
      name: 'Client Portal Staging',
      username: 'admin@radiance.com',
      password: 'securepass123',
      url: 'https://staging.clientportal.com',
      category: 'Development',
      lastUpdated: '2024-03-15'
    },
    {
      id: '2',
      name: 'Social Media Management',
      username: 'social.media@radiance.com',
      password: 'mediapass456',
      url: 'https://buffer.com',
      category: 'Marketing',
      lastUpdated: '2024-03-10'
    },
    {
      id: '3',
      name: 'Design Assets Storage',
      username: 'design@radiance.com',
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
        <Button variant="primary" icon={<Plus size={16} />}>
          Add New Credential
        </Button>
      </div>

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