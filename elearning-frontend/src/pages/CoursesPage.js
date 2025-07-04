import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../service/api";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [userCounts, setUserCounts] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    
    api
      .get("/courses")
      .then((res) => {
        setCourses(res.data);

        
        res.data.forEach((course) => {
          api
            .get(`/enrollments/count/course/${course.id}`)
            .then((response) => {
              setUserCounts((prev) => ({
                ...prev,
                [course.id]: response.data,
              }));
            })
            .catch((err) => console.error(`Error fetching count for course ${course.id}:`, err));
        });
      })
      .catch((err) => console.error("Error fetching courses:", err));

    
    api
      .get(`/enrollments/user/${user.id}`)
      .then((res) => setEnrollments(res.data))
      .catch((err) => console.error("Error fetching enrollments:", err));
  }, [user.id]);

  const handleDelete = (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      api
        .delete(`/courses/${courseId}`)
        .then(() => {
          setCourses((prev) => prev.filter((c) => c.id !== courseId));
          alert("Course deleted successfully!");
        })
        .catch((err) => {
          console.error("Error deleting course:", err);
          alert("Failed to delete course.");
        });
    }
  };

  const handleEnroll = (courseId) => {
    api
      .post(`/enrollments/enrolls?userId=${user.id}&courseId=${courseId}`)
      .then((response) => {
        setEnrollments((prev) => [...prev, response.data]);
        alert("Course Enrolled Successfully");

        
        api
          .get(`/enrollments/count/course/${courseId}`)
          .then((res) =>
            setUserCounts((prev) => ({
              ...prev,
              [courseId]: res.data,
            }))
          );
      })
      .catch((err) => {
        console.error("Error in enrolling the course:", err);
        alert("Failed to enroll in the course.");
      });
  };

  const isEnrolled = (courseId) =>
    enrollments.some(
      (enroll) =>
        enroll.course?.id === courseId && enroll.user?.id === user.id
    );

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Available Courses</h2>
      <div className="row">
        {courses.map((course) => (
          <div className="col-md-4 mb-3" key={course.id}>
            <div className="card h-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <p>
                  Enrolled Students:{" "}
                  {userCounts[course.id] !== undefined
                    ? userCounts[course.id]
                    : "Loading..."}
                </p>

                {/* View Modules */}
                {isEnrolled(course.id) ||String(course.instructor?.id) === String(user.id) ? (
                  <Link
                    to={`/modules/course/${course.id}`}
                    className="btn btn-primary mb-2"
                  >
                    View Modules
                  </Link>
                ) : (
                  <button className="btn btn-primary mb-2" disabled>
                    View Modules
                  </button>
                )}

                {/* Update Course */}
                {String(course.instructor?.id) === String(user.id) ? (
                  <Link
                    to={`/courses/${course.id}`}
                    className="btn btn-secondary mb-2"
                  >
                    Update Course
                  </Link>
                ) : (
                  <button className="btn btn-secondary mb-2" disabled>
                    Update Course
                  </button>
                )}

                {/* Delete Course */}
                <button
                  className="btn btn-danger mb-2"
                  disabled={String(course.instructor?.id) !== String(user.id)}
                  onClick={() => handleDelete(course.id)}
                >
                  Delete Course
                </button>

                {/* Enroll Button */}
                <button
                  className="btn btn-success"
                  disabled={isEnrolled(course.id)}
                  onClick={() => handleEnroll(course.id)}
                >
                  {isEnrolled(course.id)
                    ? "Already Enrolled"
                    : "Enroll Course"}
                </button>
              </div>
            </div>
          </div>
        ))}

        {courses.length === 0 && <p>No courses available</p>}
      </div>
    </div>
  );
};

export default CoursesPage;
