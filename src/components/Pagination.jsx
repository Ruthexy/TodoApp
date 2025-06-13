 import React from 'react';

const Pagination = ({ currentPage, onPageChange }) => {
  const totalPages = 20; // 200 todos / 10 per page
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex flex-wrap gap-2 mt-4">
      {pages.map(num => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1 border rounded ${
            num === currentPage ? 'bg-blue-500 text-white' : 'bg-white text-black'
          }`}
        >
          {num}
        </button>
      ))}
    </nav>
  );
};

export default Pagination;
