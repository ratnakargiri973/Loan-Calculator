import React from 'react';
import { useNavigate } from 'react-router-dom';

function Error() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-2xl font-semibold mb-4  dark:text-white">
        Something went wrong in the application.
      </h1>
      <button
        onClick={() => navigate('/')}
        className="px-5 py-2 border border-cyan-500 hover:bg-cyan-100 font-bold text-blue-400 rounded transition"
      >
        Go Home
      </button>
    </div>
  );
}

export default Error;
