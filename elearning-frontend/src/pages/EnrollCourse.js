import React, { useState } from 'react';
import axios from 'axios';

const EnrollCourse = () => {
  const [userId, setUserId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [message, setMessage] = useState('');
const user = JSON.parse(localStorage.getItem("user"));
  const handleEnroll = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8080/api/enrollments/enrolls/${courseId}?userId=${user.id}`
      );
      setMessage('Enrolled successfully!');
      console.log(response.data);
    } catch (error) {
      setMessage('Error enrolling in course');
      console.error(error);
    }
  };

  return (
    <div className="container mt-4">
      <h3>Enroll in a Course</h3>
      <form onSubmit={handleEnroll}>
        <div className="mb-3">
          <label>User ID</label>
          <input
            type="number"
            className="form-control"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Course ID</label>
          <input
            type="number"
            className="form-control"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Enroll</button>
      </form>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default EnrollCourse;
