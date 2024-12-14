import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Courses = () => {
  const [coursesData, setCoursesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/courses'); // Your backend API endpoint
        console.log('Fetched Courses:', response.data); // Log the response to inspect its structure
        
        if (Array.isArray(response.data.courses)) {
          setCoursesData(response.data.courses);  // Set the courses array into state
        } else {
          setError("Courses not found.");
        }
      } catch (error) {
        setError("Error fetching courses");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div>
          {coursesData.map(course => (
            <div key={course._id}>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              {/* Render other course details here */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
