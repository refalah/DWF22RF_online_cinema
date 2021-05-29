import React, {useState, useContext, useEffect} from 'react';
import {useParams, useHistory} from 'react-router-dom';
import { API } from '../../config/api';
import ModalBuy from '../../components/Modal/ModalBuy';
import { Player } from 'video-react';
import ReactPlayer from 'react-player';
import {} from '../../../node_modules/video-react/dist/video-react.css'
import {convertToRupiah} from '../../utils/index';

function FilmDetails() {

    const params = useParams();
    const {id} = params;

    const [show, setShow] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const router = useHistory();

    const [film, setFilm] = useState([]);
    const [purchase, setPurchase] = useState([]);

    const loadFilm = async () => {
        try {
            const response = await API.get(`/film/${id}`);
            setFilm(response.data.data.film);
        } catch (error) {
            console.log(error);
        }
    }

    const loadPurchases = async () => {
        try {
            const response = await API.get(`/my-films/${id}`);
            setPurchase(response.data.data.purchases);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadFilm();
        loadPurchases();
    }, []);

    const image_url = `http://localhost:5000/uploads/${film.thumbnail}`
    const vid = film.link;
    console.log(vid)

    return (
        <div>
            <div className='container'>
                <div className='film-container'>
                    <img src={image_url} className='film-image' style={{flex: 1}}></img>            
                    <div className='detail-container' style={{flex: 5}}>
                        <div className='top-details'>
                            <h1>{film.title}</h1>
                            {purchase ? (
                                <div></div>
                            ) : (
                                <div>
                                    <button onClick={() => {setIsOpen(true)}}>Buy Now</button>
                                    <ModalBuy open={isOpen} onClose={() => setIsOpen(false)} loadFilm={film}></ModalBuy>
                                </div>
                            )}  
                            
                        </div>
                        <ReactPlayer style={{marginTop: 20}} controls='true' url={film.link} width={'100%'} height={360}/>
                        <p className='category'>{film.category}</p>
                        <p className='price'>{film.price&&convertToRupiah(film.price)}</p>
                        <p className="description">{film.description}</p>                        
                    </div> 
                </div>                
            </div>
        </div>
    )
}

export default FilmDetails
