'use client';

import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const pages: number[] = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex flex-wrap justify-center items-center gap-2 mt-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded-lg transition ${currentPage === 1
          ? 'text-gray-400 border-gray-200 cursor-not-allowed'
          : 'text-blue-600 hover:bg-blue-50 border-gray-300'
          }`}
      >
        Prev
      </button>

      {pages.map((num) => (
        <button
          key={num}
          onClick={() => onPageChange(num)}
          className={`px-3 py-1 border rounded-lg transition ${num === currentPage
            ? 'bg-blue-500 text-white border-blue-500'
            : 'bg-white text-gray-800 border-gray-300 hover:bg-blue-50'
            }`}
        >
          {num}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 border rounded-lg transition ${currentPage === totalPages
          ? 'text-gray-400 border-gray-200 cursor-not-allowed'
          : 'text-blue-600 hover:bg-blue-50 border-gray-300'
          }`}
      >
        Next
      </button>
    </nav>
  );
};

export default Pagination;
