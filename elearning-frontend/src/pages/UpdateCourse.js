import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateCourse = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  

  const [course, setCourse] = useState({
    title: "",
    description: "",
    instructor: { id: "" },
    courseModuleList: []
  });

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/courses/${id}`)
      .then((res) => {
        setCourse({
          title: res.data.title,
          description: res.data.description,
          instructor: { id: res.data.instructor.id },
          courseModuleList: res.data.courseModuleList || []
        });
      })
      .catch((err) => console.error("Error fetching course:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prev) => ({ ...prev, [name]: value }));
  };

  const handleInstructorChange = (e) => {
    setCourse((prev) => ({
      ...prev,
      instructor: { id: parseInt(e.target.value) }
    }));
  };

  const handleModuleChange = (index, field, value) => {
    const updatedModules = [...course.courseModuleList];
    updatedModules[index][field] = value;
    setCourse((prev) => ({ ...prev, courseModuleList: updatedModules }));
  };

  const handleVideoChange = (modIdx, vidIdx, value) => {
    const updatedModules = [...course.courseModuleList];
    updatedModules[modIdx].video[vidIdx].url = value;
    setCourse((prev) => ({ ...prev, courseModuleList: updatedModules }));
  };

  const addModule = () => {
    setCourse((prev) => ({
      ...prev,
      courseModuleList: [...prev.courseModuleList, { title: "", video: [{ url: "" }] }]
    }));
  };

  const addVideoField = (modIdx) => {
    const updatedModules = [...course.courseModuleList];
    updatedModules[modIdx].video.push({ url: "" });
    setCourse((prev) => ({ ...prev, courseModuleList: updatedModules }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/courses/${id}`, course, {
        headers: { "Content-Type": "application/json" }
      });
      alert("Course updated successfully!");
      navigate("/courses");
    } catch (error) {
      console.error("Update error:", error);
      alert("Failed to update course.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Update Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Course Title</label>
          <input
            type="text"
            name="title"
            value={course.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            className="form-control"
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label>Instructor ID</label>
          <input
            type="number"
            value={course.instructor.id}
            onChange={handleInstructorChange}
            className="form-control"
            required
          />
        </div>

        <h4>Modules</h4>
        {course.courseModuleList.map((mod, modIndex) => (
          <div key={modIndex} className="border p-3 mb-4 rounded">
            <div className="mb-2">
              <label>Module Title</label>
              <input
                type="text"
                value={mod.title}
                onChange={(e) =>
                  handleModuleChange(modIndex, "title", e.target.value)
                }
                className="form-control"
                required
              />
            </div>

            <label>Videos</label>
            {mod.video.map((v, vidIdx) => (
              <input
                key={vidIdx}
                type="text"
                value={v.url}
                onChange={(e) =>
                  handleVideoChange(modIndex, vidIdx, e.target.value)
                }
                placeholder="Video URL"
                className="form-control mb-2"
                required
              />
            ))}

            <button
              type="button"
              className="btn btn-sm btn-secondary"
              onClick={() => addVideoField(modIndex)}
            >
              + Add Video
            </button>
          </div>
        ))}

        <button
          type="button"
          className="btn btn-info btn-sm mb-3"
          onClick={addModule}
        >
          + Add Module
        </button>

        <button type="submit" className="btn btn-primary">
          Update Course
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
