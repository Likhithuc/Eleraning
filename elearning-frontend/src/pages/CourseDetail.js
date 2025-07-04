import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../service/api";

const CourseDetail = () => {
  const { courseId } = useParams();
  const [courses, setCourses] = useState(null);
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = api.get(`/courses/${courseId}`);
    const fetchModules = api.get(`/modules/course/${courseId}`);

    Promise.all([fetchCourse, fetchModules])
      .then(([courseRes, courseMod]) => {
        setCourses(courseRes.data);
        setModules(courseMod.data);
      })
      .catch((err) => console.log("Error fetching course or module", err))
      .finally(() => setLoading(false));
  }, [courseId]);

  if (loading) return <div className="container mt-4">Loading....</div>;
  if (!courses) return <div className="container mt-4">Course not found</div>;

  return (
    <div className="container mt-4">
      <Link to="/courses" className="btn btn-secondary mb-3">
        ← Back to Courses
      </Link>

      <h2 className="bg-primary-subtle text-primary-emphasis p-2">
        {courses.title || "Untitled Course"}
      </h2>
      <p className="bg-secondary text-white p-2">
        {courses.description || "Description not Available"}
      </p>

      {courses.instructor && (
        <div className="mb-3">
          <strong>Instructor:</strong> {courses.instructor.name}
          <br />
          <strong>Email:</strong> {courses.instructor.email}
        </div>
      )}

      <h4>Modules</h4>
      {Array.isArray(modules) && modules.length > 0 ? (
        modules.map((mod) => (
          <div key={mod.id} className="mb-4">
            <h5>{mod.title || "Untitled Module"}</h5>
            {Array.isArray(mod.video) && mod.video.length > 0 ? (
              <div className="row">
                {mod.video.map((video) => (
                  <div className="col-md-6 mb-3" key={video.id}>
                    <div className="card">
                      <div className="card-body">
                        <div className="ratio ratio-16x9">
                          <video controls width="100%">
                            <source src={video.url} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No video in this module</p>
            )}
          </div>
        ))
      ) : (
        <p>No Modules found for this course</p>
      )}

      {/* Answer Quiz Button */}
      {courseId && (
        <Link
          to={`/answer-quiz/${courseId}`}
          className="btn btn-success mt-3"
        >
          Answer Quiz
        </Link>
      )}
    </div>
  );
};

export default CourseDetail;
