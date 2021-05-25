import React from 'react';
import { useHistory } from "react-router-dom";

function Card({film}) {
    const {id, image_url} = film;

    const router = useHistory();

    const goToPage = () => {
        router.push(`/film/${id}`);
    };

    return (
        <div>
           <div className='cards mb-5'>
                <div className='card-image-container' onClick={goToPage}>
                    <img src={image_url} className='img-dono'></img>
                </div>
                
        </div> 
        </div>
    )
}

export default Card
