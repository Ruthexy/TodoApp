 import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NotFound.css'; // Make sure the CSS file is imported

const NotFound = () => (
  <div className="notfound-container">
    <h1 className="notfound-title">404 - Page Not Found</h1>
    <p className="notfound-message">The page you're looking for doesn't exist.</p>
    <Link to="/" className="notfound-link">
      Go back home
    </Link>
  </div>
);

export default NotFound;
