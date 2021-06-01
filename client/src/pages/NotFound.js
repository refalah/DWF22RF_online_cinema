import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
    return (
        <div>
            <h2 style={{textAlign:"center"}}>
              <Link to="/">Go to Home </Link>
            </h2> 
        </div>
    )
}

export default NotFound
