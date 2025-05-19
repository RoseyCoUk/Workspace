import React, { useState } from 'react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Search, Plus, Filter, Star, MessageSquare, ThumbsUp, User, Tags, Clock, MoreVertical, X } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar?: string;
  };
  category: string;
  tags: string[];
  createdAt: string;
  likes: number;
  comments: number;
  starred: boolean;
}

const SharedNotes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    category: 'Ideas',
    tags: '',
  });

  const categories = [
    'All',
    'Ideas',
    'Project Notes',
    'Meeting Notes',
    'Research',
    'Brainstorming',
    'Resources'
  ];

  const notes: Note[] = [
    {
      id: '1',
      title: 'Client Onboarding Process Improvements',
      content: 'Here are some ideas to streamline our client onboarding process and make it more efficient...',
      author: {
        name: 'Sarah Johnson'
      },
      category: 'Ideas',
      tags: ['Process', 'Client Relations', 'Efficiency'],
      createdAt: '2024-03-15',
      likes: 12,
      comments: 5,
      starred: true
    },
    {
      id: '2',
      title: 'Marketing Strategy 2024',
      content: 'Key points from our marketing strategy brainstorming session...',
      author: {
        name: 'Mike Chen'
      },
      category: 'Meeting Notes',
      tags: ['Marketing', 'Strategy', 'Planning'],
      createdAt: '2024-03-14',
      likes: 8,
      comments: 3,
      starred: false
    },
    {
      id: '3',
      title: 'New Project Management Tool Research',
      content: 'Comparison of different project management tools we could potentially use...',
      author: {
        name: 'Emily Davis'
      },
      category: 'Research',
      tags: ['Tools', 'Project Management', 'Research'],
      createdAt: '2024-03-13',
      likes: 15,
      comments: 7,
      starred: true
    }
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewNote(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New note:', newNote);
    setIsModalOpen(false);
    setNewNote({
      title: '',
      content: '',
      category: 'Ideas',
      tags: '',
    });
  };

  const filteredNotes = notes.filter(note => {
    const matchesSearch = 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || selectedCategory === 'All' || note.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Shared Notes & Ideas</h1>
          <p className="text-gray-500 mt-1">Collaborate and share knowledge with your team</p>
        </div>
        <Button variant="primary" icon={<Plus size={16} />} onClick={() => setIsModalOpen(true)}>
          New Note
        </Button>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create New Note</h2>
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
                  value={newNote.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Content
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={newNote.content}
                  onChange={handleInputChange}
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={newNote.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    {categories.filter(cat => cat !== 'All').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    id="tags"
                    name="tags"
                    value={newNote.tags}
                    onChange={handleInputChange}
                    placeholder="e.g., marketing, strategy, ideas"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
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
                  Create Note
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Card>
        <CardHeader 
          title="Notes Library" 
          action={
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search notes..."
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
            {filteredNotes.map(note => (
              <div
                key={note.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-medium text-gray-900">{note.title}</h3>
                      {note.starred && (
                        <Star size={16} className="text-yellow-500 fill-current" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="primary">{note.category}</Badge>
                      {note.tags.map((tag, index) => (
                        <Badge key={index} variant="default">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-gray-600 mt-3 line-clamp-2">{note.content}</p>
                  </div>
                  <Button variant="ghost" size="sm" icon={<MoreVertical size={16} />} />
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                        <User size={14} className="text-gray-500" />
                      </div>
                      <span className="text-sm text-gray-600">{note.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <Clock size={14} />
                      <span>{note.createdAt}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                      <ThumbsUp size={14} />
                      <span className="text-sm">{note.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700">
                      <MessageSquare size={14} />
                      <span className="text-sm">{note.comments}</span>
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

export default SharedNotes;