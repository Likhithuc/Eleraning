import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import CoursesPage from './pages/CoursesPage';
import UsersPage from './pages/UsersPage';
import HomePage from './pages/HomePage';
import CourseDetail from './pages/CourseDetail';
import LoginPage from './pages/LoginFrom';
import RegistrationForm from './pages/RegistrationForm';
import AddCoursePage from './pages/AddCoursePage'; 
import PrivateRoute from './components/PrivateRoute'; 
import UpdateCourse from './pages/UpdateCourse';
import QuizCreate  from './pages/QuizCreate';
import AnswerQuiz from './pages/AnswerQuiz';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/modules/course/:courseId" element={<CourseDetail />} />
          <Route path="/courses/:id" element={<UpdateCourse/>}/>
          <Route path="/answer-quiz/:courseId" element={<AnswerQuiz />} />
  
          

         
          <Route
            path="/users"
            element={<PrivateRoute element={UsersPage} allowedRoles={['INSTRUCTOR']} />}
          />
          <Route
            path="/courses/add"
            element={<PrivateRoute element={AddCoursePage} allowedRoles={['INSTRUCTOR']} />}
          />
          <Route
            path="/create-quiz/:courseId"
            element={<PrivateRoute element={QuizCreate} allowedRoles={['INSTRUCTOR']} />}/>

        </Routes>
      </div>
    
    </Router>
  );
}

export default App;
