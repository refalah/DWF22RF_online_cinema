import React, {useContext, useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
import Hero from '../../components/Hero/Hero';
import Card from '../../components/Card/Card';
import HomeTransaction from '../HomeTransaction/HomeTransaction';
import {API} from '../../config/api';

function Home() {

    const router = useHistory();

    const [ films, setFilms ]= useState([]);

    const loadFilms = async () => {
        try {
            const response = await API.get("/films");
            setFilms(response.data.data.films);
        } catch (error) {
            console.log(error);
        }
    }

    const [user, setUser] = useState([]);

    const loadUser = async () => {
        try {
            const response = await API.get(`/profile`);
            setUser(response.data.data.users);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadUser();
        loadFilms();
        
    }, []);

    return (
        <>
            {user&&user.id === 1 ? (
                <div>
                    <HomeTransaction />
                </div>
            ) : (
                <div className="container mt-5">
                    <Hero />
                    <div className='card '>
                    <div className='card-body card-fund'>
                        <div className='row'>
                            {films&&films.map((film, index) => (
                                <div className='col' key={film.id + index}>
                                    <Card film = { film } />
                                </div>
                            ))}

                        </div>
                    </div>
                    </div>
                </div>   
            )}
            
        </>
    )
}

export default Home
