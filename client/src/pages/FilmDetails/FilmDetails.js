import React, {useState, useContext, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import { API } from '../../config/api';


function FilmDetails() {

    const params = useParams();
    const {id} = params;
    const router = useHistory();

    const [film, setFilm] = useState([]);
    const loadFilm = async () => {
        try {
            const response = await API.get(`/film/${id}`);
            setFilm(response.data.data.film);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadFilm();
    }, []);

    const image_url = `http://localhost:5000/uploads/${film.thumbnail}`

    return (
        <div>
           <img src={image_url} className='card-fund'></img>            
            <div className='detail-container'>
                <h1>{film.title}</h1>                
                <p className="donate-info">{film.description}</p>
            </div> 
        </div>
    )
}

export default FilmDetails
