import React, { useState } from 'react';
import Card, { CardContent, CardHeader } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import { 
  ChevronLeft, ChevronRight, Plus, Filter, Search, Clock, 
  Users, MapPin, Video, Calendar as CalendarIcon, X
} from 'lucide-react';

interface Event {
  id: string;
  title: string;
  type: 'meeting' | 'deadline' | 'task' | 'reminder';
  date: string;
  time?: string;
  duration?: string;
  attendees?: string[];
  location?: string;
  description?: string;
}

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    type: 'meeting',
    date: '',
    time: '',
    duration: '30',
    location: '',
    description: '',
  });

  const events: Event[] = [
    {
      id: '1',
      title: 'Team Weekly Sync',
      type: 'meeting',
      date: '2024-03-20',
      time: '10:00 AM',
      duration: '1 hour',
      attendees: ['Sarah J.', 'Mike T.', 'Emily D.'],
      location: 'Conference Room A',
      description: 'Weekly team sync to discuss project progress and blockers'
    },
    {
      id: '2',
      title: 'Project Deadline: Website Launch',
      type: 'deadline',
      date: '2024-03-22',
      description: 'Launch of the redesigned company website'
    },
    {
      id: '3',
      title: 'Client Presentation',
      type: 'meeting',
      date: '2024-03-21',
      time: '2:00 PM',
      duration: '1.5 hours',
      attendees: ['Client Team', 'Project Team'],
      location: 'Virtual',
      description: 'Present the final design concepts to the client'
    }
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('New event:', newEvent);
    setIsModalOpen(false);
    setNewEvent({
      title: '',
      type: 'meeting',
      date: '',
      time: '',
      duration: '30',
      location: '',
      description: '',
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    
    const days = [];
    const firstDayOfWeek = firstDay.getDay();
    
    // Add days from previous month
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        isCurrentMonth: false
      });
    }
    
    // Add days of current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push({
        date: new Date(year, month, i),
        isCurrentMonth: true
      });
    }
    
    // Add days from next month
    const remainingDays = 42 - days.length; // 6 rows × 7 days
    for (let i = 1; i <= remainingDays; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({
        date: nextDate,
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  const getEventsByDate = (date: Date) => {
    return events.filter(event => event.date === date.toISOString().split('T')[0]);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long'
    }).format(date);
  };

  const getEventTypeColor = (type: Event['type']) => {
    switch (type) {
      case 'meeting':
        return 'bg-blue-100 text-blue-800';
      case 'deadline':
        return 'bg-red-100 text-red-800';
      case 'task':
        return 'bg-green-100 text-green-800';
      case 'reminder':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Calendar</h1>
          <p className="text-gray-500 mt-1">Manage your schedule and events</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white rounded-md border border-gray-200">
            <button
              className={`px-3 py-1.5 text-sm font-medium ${
                view === 'month' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setView('month')}
            >
              Month
            </button>
            <button
              className={`px-3 py-1.5 text-sm font-medium ${
                view === 'week' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setView('week')}
            >
              Week
            </button>
            <button
              className={`px-3 py-1.5 text-sm font-medium ${
                view === 'day' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setView('day')}
            >
              Day
            </button>
          </div>
          <Button variant="primary" icon={<Plus size={16} />} onClick={() => setIsModalOpen(true)}>
            New Event
          </Button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create New Event</h2>
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
                  Event Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Event Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={newEvent.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="meeting">Meeting</option>
                  <option value="deadline">Deadline</option>
                  <option value="task">Task</option>
                  <option value="reminder">Reminder</option>
                </select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={newEvent.date}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={newEvent.time}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={newEvent.duration}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={newEvent.location}
                  onChange={handleInputChange}
                  placeholder="Room name or virtual link"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newEvent.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                  Create Event
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Mini Calendar */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <ChevronLeft size={20} />
                </button>
                <span className="font-medium">{formatDate(currentDate)}</span>
                <button className="p-1 hover:bg-gray-100 rounded-full">
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                  <div key={day} className="font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1 text-center">
                {getDaysInMonth(currentDate).map((day, index) => (
                  <button
                    key={index}
                    className={`p-1 rounded-full text-sm ${
                      day.isCurrentMonth
                        ? 'text-gray-900 hover:bg-gray-100'
                        : 'text-gray-400'
                    } ${
                      selectedDate?.toDateString() === day.date.toDateString()
                        ? 'bg-red-100 text-red-600'
                        : ''
                    }`}
                    onClick={() => setSelectedDate(day.date)}
                  >
                    {day.date.getDate()}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card>
            <CardHeader title="Upcoming Events" />
            <CardContent>
              <div className="space-y-3">
                {events.map(event => (
                  <div
                    key={event.id}
                    className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <div className={`p-2 rounded-md ${getEventTypeColor(event.type)}`}>
                      <CalendarIcon size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                      <div className="mt-1 space-y-1">
                        {event.time && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Clock size={12} className="mr-1" />
                            {event.time}
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center text-xs text-gray-500">
                            {event.location.toLowerCase().includes('virtual') ? (
                              <Video size={12} className="mr-1" />
                            ) : (
                              <MapPin size={12} className="mr-1" />
                            )}
                            {event.location}
                          </div>
                        )}
                        {event.attendees && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Users size={12} className="mr-1" />
                            {event.attendees.length} attendees
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Calendar */}
        <Card className="lg:col-span-3">
          <CardHeader 
            title={formatDate(currentDate)}
            action={
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" icon={<Filter size={16} />}>
                  Filter
                </Button>
                <div className="flex items-center gap-2">
                  <button className="p-1 hover:bg-gray-100 rounded-full">
                    <ChevronLeft size={20} />
                  </button>
                  <button className="p-1 hover:bg-gray-100 rounded-full">
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            }
          />
          <CardContent>
            <div className="grid grid-cols-7 gap-px bg-gray-200">
              {/* Calendar Header */}
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                <div key={day} className="bg-gray-50 px-2 py-3">
                  <span className="text-sm font-medium text-gray-900">{day}</span>
                </div>
              ))}
              
              {/* Calendar Days */}
              {getDaysInMonth(currentDate).map((day, index) => (
                <div
                  key={index}
                  className={`min-h-[120px] bg-white p-2 ${
                    day.isCurrentMonth ? '' : 'bg-gray-50'
                  }`}
                >
                  <span className={`text-sm ${
                    day.isCurrentMonth ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {day.date.getDate()}
                  </span>
                  
                  <div className="mt-2 space-y-1">
                    {getEventsByDate(day.date).map(event => (
                      <div
                        key={event.id}
                        className={`px-2 py-1 rounded text-xs truncate cursor-pointer ${
                          getEventTypeColor(event.type)
                        }`}
                      >
                        {event.time && <span className="mr-1">{event.time}</span>}
                        {event.title}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;