import { useState, useEffect } from 'react';
import { Calendar, BookOpen, MessageSquare } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Session, Course } from '../../types';
import { sessions, courses } from '../../lib/api';

export default function Dashboard() {
  const [userSessions, setUserSessions] = useState<Session[]>([]);
  const [userCourses, setUserCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [sessionsData, coursesData] = await Promise.all([
          sessions.list(),
          courses.list(),
        ]);
        setUserSessions(sessionsData.sessions);
        setUserCourses(coursesData.courses);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Upcoming Sessions */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Calendar className="h-6 w-6 text-indigo-600" />
                <h2 className="text-xl font-semibold">Upcoming Sessions</h2>
              </div>
            </CardHeader>
            <CardContent>
              {userSessions.length > 0 ? (
                <ul className="space-y-4">
                  {userSessions.map((session) => (
                    <li key={session._id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{session.courseId.title}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(session.startTime).toLocaleDateString()}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        Join
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No upcoming sessions</p>
              )}
            </CardContent>
          </Card>

          {/* Active Courses */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-indigo-600" />
                <h2 className="text-xl font-semibold">Active Courses</h2>
              </div>
            </CardHeader>
            <CardContent>
              {userCourses.length > 0 ? (
                <ul className="space-y-4">
                  {userCourses.map((course) => (
                    <li key={course._id} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{course.title}</p>
                        <p className="text-sm text-gray-500">{course.subject}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No active courses</p>
              )}
            </CardContent>
          </Card>

          {/* Recent Messages */}
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-6 w-6 text-indigo-600" />
                <h2 className="text-xl font-semibold">Recent Messages</h2>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">No recent messages</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}