import { Calendar, Clock, MapPin, Users, Plus } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Search } from 'lucide-react'

const meetings = [
  { id: 1, title: 'Monthly General Meeting', date: '2024-03-20', time: '3:00 PM', location: 'Main Hall', attendees: 45, type: 'General' },
  { id: 2, title: 'Board Meeting', date: '2024-03-22', time: '2:00 PM', location: 'Board Room', attendees: 12, type: 'Board' },
  { id: 3, title: 'Finance Committee', date: '2024-03-25', time: '10:00 AM', location: 'Meeting Room A', attendees: 8, type: 'Committee' },
  { id: 4, title: 'Annual General Meeting', date: '2024-04-15', time: '9:00 AM', location: 'Conference Center', attendees: 120, type: 'Annual' }
]

export default function MeetingsPage() {
  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Meetings</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Schedule and manage cooperative meetings</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Schedule Meeting
          </Button>
        </div>

        {/* Search */}
        <div className="mb-8">
          <Input
            placeholder="Search meetings..."
            icon={<Search className="w-5 h-5" />}
          />
        </div>

        {/* Meetings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {meetings.map((meeting) => (
            <Card key={meeting.id} className="hover:shadow-lg transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{meeting.title}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-medium mt-2 inline-block ${
                    meeting.type === 'General' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' :
                    meeting.type === 'Board' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' :
                    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {meeting.type}
                  </span>
                </div>
                <Button variant="outline" size="sm">View</Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">{meeting.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">{meeting.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">{meeting.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 dark:text-gray-400">{meeting.attendees} attendees</span>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <Button size="sm" className="flex-1">Join Meeting</Button>
                <Button variant="outline" size="sm">Details</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}