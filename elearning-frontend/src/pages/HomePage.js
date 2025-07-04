import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center text-white bg-animated"
      style={{
        height: '100vh',
        width: '100%',
        overflow: 'hidden',
        margin: 0,        
        padding: 0 
      }}
    >
      <h1 className="display-3 fw-bold bg-dark bg-opacity-50 p-3 rounded">
        Welcome to E-Learning
      </h1>

     
      <style>
        {`
          .bg-animated {
            background-image: url('https://images.unsplash.com/photo-1690079374922-7f50d5c1a102?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
            background-size: 110%;
            background-position: center;
            background-repeat: no-repeat;
            animation: zoomPan 20s infinite alternate ease-in-out;
          }

          @keyframes zoomPan {
            0% {
              background-size: 110%;
              background-position: center;
            }
            100% {
              background-size: 120%;
              background-position: top;
            }
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;
