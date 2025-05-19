import React, { useState } from 'react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { Search, Plus, Send, Smile, Paperclip, Hash, Users, Settings, MessageSquare, User, Phone, Video, Star, Pin } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: {
    name: string;
    avatar?: string;
    online: boolean;
  };
  timestamp: string;
  reactions?: {
    emoji: string;
    count: number;
  }[];
  replies?: number;
  attachments?: {
    name: string;
    type: string;
    size: string;
  }[];
}

interface Channel {
  id: string;
  name: string;
  unread: number;
  type: 'public' | 'private';
  description?: string;
}

const TeamChat: React.FC = () => {
  const [message, setMessage] = useState('');
  const [selectedChannel, setSelectedChannel] = useState<string>('general');
  const [searchTerm, setSearchTerm] = useState('');

  const channels: Channel[] = [
    { id: 'general', name: 'General', unread: 0, type: 'public', description: 'Company-wide announcements and work-based matters' },
    { id: 'projects', name: 'Projects', unread: 3, type: 'public', description: 'Project discussions and updates' },
    { id: 'random', name: 'Random', unread: 0, type: 'public', description: 'Non-work banter and water cooler conversation' },
    { id: 'design', name: 'Design Team', unread: 2, type: 'private', description: 'Design team collaboration' },
    { id: 'marketing', name: 'Marketing', unread: 0, type: 'private', description: 'Marketing team discussions' }
  ];

  const messages: Message[] = [
    {
      id: '1',
      content: 'Hey team! Just finished the client presentation mockups. Would love your feedback!',
      sender: {
        name: 'Sarah Johnson',
        online: true
      },
      timestamp: '10:30 AM',
      reactions: [
        { emoji: '👍', count: 3 },
        { emoji: '🎉', count: 2 }
      ],
      attachments: [
        { name: 'presentation-draft.pdf', type: 'pdf', size: '2.4 MB' }
      ]
    },
    {
      id: '2',
      content: 'These look great! Really love the color scheme you chose.',
      sender: {
        name: 'Mike Chen',
        online: true
      },
      timestamp: '10:32 AM',
      reactions: [
        { emoji: '❤️', count: 1 }
      ]
    },
    {
      id: '3',
      content: 'Could we schedule a quick call to discuss some minor tweaks?',
      sender: {
        name: 'Emily Davis',
        online: false
      },
      timestamp: '10:45 AM',
      replies: 2
    }
  ];

  const onlineUsers = [
    { id: '1', name: 'Sarah Johnson', status: 'online', avatar: undefined },
    { id: '2', name: 'Mike Chen', status: 'online', avatar: undefined },
    { id: '3', name: 'Emily Davis', status: 'offline', avatar: undefined },
    { id: '4', name: 'Chris Wilson', status: 'away', avatar: undefined }
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Here you would typically send the message to your backend
    console.log('Sending message:', message);
    setMessage('');
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex">
      {/* Channels Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3">
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-2">
                <span>CHANNELS</span>
                <Button variant="ghost" size="sm" className="hover:bg-gray-100">
                  <Plus size={14} />
                </Button>
              </div>
              <div className="space-y-1">
                {channels.map(channel => (
                  <button
                    key={channel.id}
                    onClick={() => setSelectedChannel(channel.id)}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-md text-left ${
                      selectedChannel === channel.id ? 'bg-red-50 text-red-600' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center">
                      <Hash size={16} className="mr-2" />
                      <span>{channel.name}</span>
                    </div>
                    {channel.unread > 0 && (
                      <Badge variant="danger">{channel.unread}</Badge>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-2">
                <span>ONLINE — {onlineUsers.filter(u => u.status === 'online').length}</span>
              </div>
              <div className="space-y-1">
                {onlineUsers.map(user => (
                  <div
                    key={user.id}
                    className="flex items-center px-2 py-1.5 rounded-md hover:bg-gray-50"
                  >
                    <div className="relative flex-shrink-0">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-6 h-6 rounded-full"
                        />
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center">
                          <User size={14} className="text-gray-500" />
                        </div>
                      )}
                      <span
                        className={`absolute bottom-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white ${
                          user.status === 'online' ? 'bg-green-400' :
                          user.status === 'away' ? 'bg-yellow-400' : 'bg-gray-400'
                        }`}
                      />
                    </div>
                    <span className="ml-2 text-sm text-gray-700">{user.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Channel Header */}
        <div className="h-16 border-b border-gray-200 px-6 flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="text-lg font-semibold text-gray-900">
              # {channels.find(c => c.id === selectedChannel)?.name}
            </h2>
            <div className="h-6 w-px bg-gray-200 mx-4" />
            <p className="text-sm text-gray-500">
              {channels.find(c => c.id === selectedChannel)?.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" icon={<Users size={16} />}>
              {onlineUsers.length}
            </Button>
            <Button variant="ghost" size="sm" icon={<Pin size={16} />} />
            <Button variant="ghost" size="sm" icon={<Star size={16} />} />
            <Button variant="ghost" size="sm" icon={<Settings size={16} />} />
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {messages.map(msg => (
              <div key={msg.id} className="flex items-start group">
                <div className="flex-shrink-0">
                  {msg.sender.avatar ? (
                    <img
                      src={msg.sender.avatar}
                      alt={msg.sender.name}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="h-5 w-5 text-gray-500" />
                    </div>
                  )}
                </div>
                <div className="ml-3 flex-1">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-900">{msg.sender.name}</span>
                    <span className="ml-2 text-xs text-gray-500">{msg.timestamp}</span>
                  </div>
                  <p className="text-gray-800 mt-1">{msg.content}</p>
                  
                  {msg.attachments && msg.attachments.length > 0 && (
                    <div className="mt-2">
                      {msg.attachments.map((file, index) => (
                        <div
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-md bg-gray-100 text-sm text-gray-700"
                        >
                          <Paperclip size={14} className="mr-2" />
                          <span>{file.name}</span>
                          <span className="ml-2 text-gray-500">{file.size}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {(msg.reactions || msg.replies) && (
                    <div className="flex items-center gap-3 mt-2">
                      {msg.reactions && (
                        <div className="flex items-center gap-1">
                          {msg.reactions.map((reaction, index) => (
                            <button
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full bg-gray-100 hover:bg-gray-200 text-sm"
                            >
                              <span>{reaction.emoji}</span>
                              <span className="ml-1 text-gray-600">{reaction.count}</span>
                            </button>
                          ))}
                        </div>
                      )}
                      {msg.replies && (
                        <button className="text-sm text-gray-500 hover:text-gray-700">
                          {msg.replies} replies
                        </button>
                      )}
                    </div>
                  )}
                </div>
                <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="sm" className="p-1">
                      <Smile size={16} className="text-gray-400" />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-1">
                      <MessageSquare size={16} className="text-gray-400" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="sm">
              <Plus size={20} />
            </Button>
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
                <button type="button" className="p-1 hover:bg-gray-100 rounded">
                  <Paperclip size={16} className="text-gray-400" />
                </button>
                <button type="button" className="p-1 hover:bg-gray-100 rounded">
                  <Smile size={16} className="text-gray-400" />
                </button>
              </div>
            </div>
            <Button type="submit" variant="primary" disabled={!message.trim()}>
              <Send size={16} />
            </Button>
          </form>
        </div>
      </div>

      {/* Thread Panel (can be toggled) */}
      <div className="w-80 border-l border-gray-200 bg-white hidden lg:block">
        <div className="h-16 border-b border-gray-200 px-4 flex items-center justify-between">
          <h3 className="font-medium">Thread</h3>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" icon={<Phone size={16} />} />
            <Button variant="ghost" size="sm" icon={<Video size={16} />} />
            <Button variant="ghost" size="sm" icon={<Settings size={16} />} />
          </div>
        </div>
        <div className="p-4">
          <p className="text-sm text-gray-500 text-center">No thread selected</p>
        </div>
      </div>
    </div>
  );
};

export default TeamChat;