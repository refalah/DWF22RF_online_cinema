import React from 'react';
import { Link, useHistory } from 'react-router-dom';

function NotFound() {

    const router = useHistory();
    const backToHome = () => {
        router.push("/");
    }
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <p className='not-found'>404 : <br/> Page Not Found <br/> </p>
            <button className='btn-film under' onClick={backToHome}>Back to Home </button>
            <img src='/Whiteboard.svg' style={{width: '42%', opacity: 0.3}}/>
        </div>
    )
}

export default NotFound
