import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Clock, Calendar } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Course } from '../../types';
import { courses } from '../../lib/api';

export default function CourseDetails() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      try {
        const response = await courses.get(id);
        setCourse(response);
      } catch (error) {
        console.error('Error fetching course:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900">Course not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="px-4 sm:px-0">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Course Info */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
            <p className="mt-2 text-lg text-gray-500">{course.subject}</p>
            
            <div className="mt-6">
              <h2 className="text-xl font-semibold">About this course</h2>
              <p className="mt-4 text-gray-700">{course.description}</p>
            </div>

            {/* Reviews */}
            <div className="mt-8">
              <h2 className="text-xl font-semibold">Student Reviews</h2>
              {course.reviews.length > 0 ? (
                <div className="mt-4 space-y-4">
                  {course.reviews.map((review) => (
                    <Card key={review._id}>
                      <CardContent className="p-4">
                        <div className="flex items-center">
                          <div className="flex items-center">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                            ))}
                          </div>
                          <span className="ml-2 text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="mt-2 text-gray-700">{review.comment}</p>
                        <div className="mt-2 text-sm text-gray-500">
                          - {review.studentId.name}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-gray-500">No reviews yet</p>
              )}
            </div>
          </div>

          {/* Booking Card */}
          <div>
            <Card className="sticky top-6">
              <CardHeader>
                <h3 className="text-2xl font-bold">${course.price}/hr</h3>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700">
                    <Clock className="h-5 w-5 mr-2" />
                    <span>60 minute sessions</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>Flexible scheduling</span>
                  </div>
                  <Button className="w-full">Book a Session</Button>
                  <Button variant="outline" className="w-full">
                    Message Tutor
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}