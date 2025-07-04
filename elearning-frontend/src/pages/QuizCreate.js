import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuizCreate = () => {
  const user = JSON.parse(localStorage.getItem("user")); 
  const [quizTitle, setQuizTitle] = useState('');
  const [courseId, setCourseId] = useState('');
  const [questions, setQuestions] = useState([
    { text: '', options: ['', '', '', ''], correctAnswerIndex: 0 }
  ]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    
    axios.get('http://localhost:8080/api/courses')
      .then(res => {
        const instructorCourses = res.data.filter(course =>
          course.instructor?.id === user?.id
        );
        setCourses(instructorCourses);
      })
      .catch(err => console.error('Failed to load courses', err));
  }, [user]);

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([...questions, { text: '', options: ['', '', '', ''], correctAnswerIndex: 0 }]);
  };

  const removeQuestion = (index) => {
    const updated = [...questions];
    updated.splice(index, 1);
    setQuestions(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const quiz = {
      title: quizTitle,
      questions: questions
    };

    axios.post(`http://localhost:8080/api/quizzes/create?courseId=${courseId}`, quiz)
      .then(() => {
        alert('Quiz created successfully!');
        setQuizTitle('');
        setCourseId('');
        setQuestions([{ text: '', options: ['', '', '', ''], correctAnswerIndex: 0 }]);
      })
      .catch(err => {
        console.error('Quiz creation failed', err);
        alert('Error creating quiz');
      });
  };

  return (
    <div className="container mt-4">
      <h3>Create Quiz</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Quiz Title</label>
          <input
            type="text"
            className="form-control"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Select Course</label>
          <select
            className="form-control"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            required
          >
            <option value="">-- Select Course --</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>

        <hr />
        <h5>Questions</h5>

        {questions.map((q, index) => (
          <div key={index} className="mb-4 border p-3 rounded">
            <div className="form-group">
              <label>Question {index + 1}</label>
              <input
                type="text"
                className="form-control"
                value={q.text}
                onChange={(e) => handleQuestionChange(index, 'text', e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Options</label>
              {q.options.map((opt, oIndex) => (
                <input
                  key={oIndex}
                  type="text"
                  className="form-control mb-2"
                  value={opt}
                  placeholder={`Option ${oIndex + 1}`}
                  onChange={(e) => handleOptionChange(index, oIndex, e.target.value)}
                  required
                />
              ))}
            </div>

            <div className="form-group">
              <label>Correct Answer Index (0-3)</label>
              <input
                type="number"
                className="form-control"
                value={q.correctAnswerIndex}
                onChange={(e) => handleQuestionChange(index, 'correctAnswerIndex', parseInt(e.target.value))}
                min="0"
                max="3"
                required
              />
            </div>

            <button type="button" className="btn btn-danger mt-2" onClick={() => removeQuestion(index)}>
              Remove Question
            </button>
          </div>
        ))}

        <button type="button" className="btn btn-secondary" onClick={addQuestion}>
          Add Another Question
        </button>

        <br /><br />
        <button type="submit" className="btn btn-primary">Create Quiz</button>
      </form>
    </div>
  );
};

export default QuizCreate;
