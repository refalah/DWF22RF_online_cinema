import React, {useState, useContext, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import { API } from '../../config/api';
import ModalBuy from '../../components/Modal/ModalBuy';

function FilmDetails() {

    const params = useParams();
    const {id} = params;

    const [show, setShow] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
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
            <div className='container'>
                <div className='film-container'>
                    <img src={image_url} className='film-image'></img>            
                    <div className='detail-container'>
                        <h1>{film.title}</h1>                
                        <p className="donate-info">{film.description}</p>
                        <button onClick={() => {setIsOpen(true)}}>Buy Now</button>
                        <ModalBuy open={isOpen} onClose={() => setIsOpen(false)}></ModalBuy>
                    </div> 
                </div>
                
            </div>
        </div>
    )
}

export default FilmDetails
