export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'tutor';
  bio?: string;
  subjects?: string[];
  rating?: number;
}

export interface Course {
  _id: string;
  tutorId: User;
  title: string;
  description: string;
  subject: string;
  price: number;
  reviews: Review[];
  studentsEnrolled: User[];
}

export interface Session {
  _id: string;
  courseId: Course;
  tutorId: User;
  studentId: User;
  startTime: Date;
  endTime: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  meetingLink?: string;
}

export interface Review {
  _id: string;
  courseId: string;
  studentId: User;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Message {
  _id: string;
  sessionId: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: Date;
}