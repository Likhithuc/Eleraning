import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const navigate=useNavigate();
  const [course, setCourse] = useState({
    title: "",
    description: "",
    instructorId: "",
    modules: [
      {
        title: "",
        videos: [""]
      }
    ]
  });

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const handleModuleChange = (index, field, value) => {
    const newModules = [...course.modules];
    newModules[index][field] = value;
    setCourse({ ...course, modules: newModules });
  };

  const handleVideoChange = (modIdx, vidIdx, value) => {
    const newModules = [...course.modules];
    newModules[modIdx].videos[vidIdx] = value;
    setCourse({ ...course, modules: newModules });
  };

  const addModule = () => {
    setCourse({
      ...course,
      modules: [...course.modules, { title: "", videos: [""] }]
    });
  };

  const addVideoField = (moduleIndex) => {
    const updatedModules = [...course.modules];
    updatedModules[moduleIndex].videos.push("");
    setCourse({ ...course, modules: updatedModules });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: course.title,
      description: course.description,
      instructor: {
        id: parseInt(course.instructorId)
      },
      courseModuleList: course.modules.map((mod) => ({
        title: mod.title,
        video: mod.videos.map((url) => ({ url }))
      }))
    };

    try {
      const response = await axios.post("http://localhost:8080/api/courses", payload, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      alert("Course created successfully!");
      console.log(response.data);
      navigate('/courses')
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding course.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Course Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={course.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Description</label>
          <textarea
            className="form-control"
            name="description"
            value={course.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label>Instructor ID</label>
          <input
            type="number"
            className="form-control"
            name="instructorId"
            value={course.instructorId}
            onChange={handleChange}
            required
          />
        </div>

        <h4>Modules</h4>
        {course.modules.map((mod, modIndex) => (
          <div key={modIndex} className="mb-4 border p-3 rounded">
            <div className="mb-2">
              <label>Module Title</label>
              <input
                type="text"
                value={mod.title}
                onChange={(e) => handleModuleChange(modIndex, "title", e.target.value)}
                className="form-control"
                required
              />
            </div>

            <label>Videos</label>
            {mod.videos.map((videoUrl, vidIndex) => (
              <input
                key={vidIndex}
                type="text"
                value={videoUrl}
                onChange={(e) => handleVideoChange(modIndex, vidIndex, e.target.value)}
                placeholder="Video URL"
                className="form-control mb-2"
                required
              />
            ))}
            <button
              type="button"
              className="btn btn-sm btn-secondary mb-2"
              onClick={() => addVideoField(modIndex)}
            >
              + Add Video
            </button>
          </div>
        ))}

        <button type="button" className="btn btn-sm btn-info mb-3" onClick={addModule}>
          + Add Module
        </button>
        

        <button type="submit" className="btn btn-primary">Submit Course</button>
      </form>
    </div>
  );
};

export default AddCourse;
