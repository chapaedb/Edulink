import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { User } from '../../types';

export default function Profile() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user data
    setIsLoading(false);
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Profile Info */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Profile Information</h2>
                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    {isEditing ? (
                      <Input
                        value={user?.name || ''}
                        onChange={() => {}}
                        className="mt-1"
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{user?.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <p className="mt-1 text-gray-900">{user?.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Bio
                    </label>
                    {isEditing ? (
                      <textarea
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        rows={4}
                        value={user?.bio || ''}
                        onChange={() => {}}
                      />
                    ) : (
                      <p className="mt-1 text-gray-900">{user?.bio || 'No bio added yet.'}</p>
                    )}
                  </div>

                  {isEditing && (
                    <div className="flex justify-end">
                      <Button>Save Changes</Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {user?.role === 'tutor' && (
              <Card className="mt-8">
                <CardHeader>
                  <h2 className="text-2xl font-bold">Teaching Information</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium">Subjects</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {user.subjects?.map((subject) => (
                          <span
                            key={subject}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                          >
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium">Rating</h3>
                      <div className="mt-2 flex items-center">
                        <span className="text-2xl font-bold text-gray-900">
                          {user.rating?.toFixed(1)}
                        </span>
                        <span className="ml-2 text-gray-500">/ 5.0</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Stats/Quick Actions */}
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium">Quick Stats</h3>
                <dl className="mt-5 grid grid-cols-1 gap-5">
                  <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Sessions
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                      0
                    </dd>
                  </div>
                  <div className="px-4 py-5 bg-gray-50 shadow rounded-lg overflow-hidden sm:p-6">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Active Courses
                    </dt>
                    <dd className="mt-1 text-3xl font-semibold text-gray-900">
                      0
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}