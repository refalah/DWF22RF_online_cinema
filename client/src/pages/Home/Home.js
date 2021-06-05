import React, {useContext, useEffect, useState} from 'react'
import { useHistory, Redirect } from "react-router-dom";
import Hero from '../../components/Hero/Hero';
import Card from '../../components/Card/Card';
import HomeTransaction from '../HomeTransaction/HomeTransaction';
import {API} from '../../config/api';
import LoadingPage from '../LoadingPage';
import { Context } from '../../context/context';

function Home() {

    const router = useHistory();
    const [state] = useContext(Context);

    const [ films, setFilms ]= useState([]);
    const [isLoading, setIsLoading] = useState(false);


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
        setIsLoading(true);
        try {
            const response = await API.get(`/profile`);
            setUser(response.data.data.users);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadFilms();
        // setIsLoading(true);
        // setTimeout(() => {
        //     setIsLoading(false);
        // }, 1000)
    }, []);

    useEffect(() => {
        if (state.user?.id === 1) {
          router.push("/home-transaction");
        }
      }, [state.user]);

    return (
        <>
        
            {/* {isLoading ? <LoadingPage /> : 
            <div> */}
                {/* {user&&user.id === 1 ? (
                    <Redirect to="/home-transaction"/>
                ) : ( */}
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
                {/* )} */}
            {/* </div>
            } */}
        </>
    )
}

export default Home
