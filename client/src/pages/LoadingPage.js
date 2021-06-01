import React from 'react';
import {BarLoader} from 'react-spinners';

function LoadingPage() {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 40
        }}>
           <BarLoader size={24} color='#CD2E71' loading/> 
        </div>
    )
}

export default LoadingPage
