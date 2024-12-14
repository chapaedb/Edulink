import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">Edulink</span>
            </Link>
            <p className="text-gray-500">
              Connecting students with expert tutors for personalized learning experiences.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              For Students
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/courses" className="text-base text-gray-500 hover:text-gray-900">
                  Find a Tutor
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-base text-gray-500 hover:text-gray-900">
                  How it Works
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              For Tutors
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/become-tutor" className="text-base text-gray-500 hover:text-gray-900">
                  Become a Tutor
                </Link>
              </li>
              <li>
                <Link to="/tutor-resources" className="text-base text-gray-500 hover:text-gray-900">
                  Resources
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
              Support
            </h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/help" className="text-base text-gray-500 hover:text-gray-900">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-base text-gray-500 hover:text-gray-900">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-base text-gray-400 text-center">
            © {new Date().getFullYear()} Edulink. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}