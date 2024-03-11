import React from 'react';
import {useNavigate } from 'react-router-dom';
function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Error 404: Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8">Sorry, the page you are looking for does not exist.</p>
      <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md" onClick={()=>{navigate("/")}}>
        Go Back Home
      </button>
    </div>
  );
}

export default NotFound;
