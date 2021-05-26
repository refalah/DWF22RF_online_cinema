import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import { API } from '../../config/api';
import Card from '../../components/Card/Card';

function MyFilms() {

    const router = useHistory();
    const [films, setFilms] = useState([]);

    const loadPurchases = async () => {
        try {
            const response = await API.get(`/my-films`);
            setFilms(response.data.data.purchases);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadPurchases();
    }, []);

    return (
        <div>
           <div className="container mt-5">
                <div className="film-header">
                    <h3>My Films</h3>
                </div>
                <div className='card '>
                <div className='card-body card-fund'>
                    <div className='row'>
                        {films&&films.map((film, index) => (
                            <div className='col' key={film.id + index}>
                                <Card approve = { film } />
                            </div>
                        ))}
                        
                    </div>
                </div>
                </div>
            </div> 
        </div>
    )
}

export default MyFilms
