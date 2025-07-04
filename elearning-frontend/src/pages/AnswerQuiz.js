import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AnswerQuiz = () => {
    const { courseId } = useParams(); 
    const user = JSON.parse(localStorage.getItem("user"));
    const [quiz, setQuiz] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [score, setScore] = useState(null);

   useEffect(() => {
  axios.get(`http://localhost:8080/api/quizzes/course/${courseId}`)
    .then(res => {
      const quizData = Array.isArray(res.data) ? res.data[0] : res.data;
      setQuiz(quizData);
      if (quizData && Array.isArray(quizData.questions)) {
        setAnswers(new Array(quizData.questions.length).fill(null));
      }
    })
    .catch(err => console.error("Failed to load quiz", err));
}, [courseId]);



    const handleOptionChange = (questionIndex, optionIndex) => {
        const updatedAnswers = [...answers];
        updatedAnswers[questionIndex] = optionIndex;
        setAnswers(updatedAnswers);
    };

    const handleSubmit = () => {
        axios.post(`http://localhost:8080/api/quizzes/submit?quizId=${quiz.id}&userId=${user.id}`, answers)
            .then(res => {
                setScore(res.data); // backend returns an int score
            })
            .catch(err => {
                console.error("Quiz submission failed", err);
                alert("Error submitting quiz.");
            });
    };

   
 if (!quiz || !Array.isArray(quiz.questions)) {
  return <div className="container mt-4">No Quiz Available Regarding To This Course</div>;
}

return (
  <div className="container mt-4">
    <h3>{quiz.title}</h3>
    {quiz.questions.map((q, qIdx) => (
      <div key={qIdx} className="mb-3 border p-3 rounded">
        <h5>{q.text}</h5>
        {Array.isArray(q.options) && q.options.map((opt, optIdx) => (
          <div key={optIdx} className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name={`question-${qIdx}`}
              checked={answers[qIdx] === optIdx}
              onChange={() => handleOptionChange(qIdx, optIdx)}
            />
            <label className="form-check-label">{opt}</label>
          </div>
        ))}
      </div>
    ))}

    <button onClick={handleSubmit} className="btn btn-success">Submit Quiz</button>

    {score !== null && (
      <div className="alert alert-info mt-3">
        You scored: <strong>{score}</strong>
      </div>
    )}
  </div>
);

}
export default AnswerQuiz;