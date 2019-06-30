import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoud.css';

const NotFoud = () => {

    return (
        <div className = "NotFound" >
            <h1 className="NotFound-title">Oops! Page not found </h1>
            < Link to="/" className="NotFound-link">Go to Home Page</Link>
        </div>
    );
}

export default NotFoud;