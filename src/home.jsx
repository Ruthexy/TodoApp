import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="text-center p-8">
      <h1 className="text-4xl font-bold mb-4">Welcome to your todo app</h1>
      <p className="text-lg text-gray-600 mb-6">
        Productivity starts here — prioritise, plan, and accomplish
      </p>
      <Link
        to="/todos"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Click here to get started
      </Link>
    </div>
  );
}

export default Home;
