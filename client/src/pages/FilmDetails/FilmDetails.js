import React, {useState, useContext, useEffect} from 'react';
import {useParams, useHistory, Redirect, Link} from 'react-router-dom';
import { API } from '../../config/api';
import ModalBuy from '../../components/Modal/ModalBuy';
import { Player } from 'video-react';
import ReactPlayer from 'react-player';
import {} from '../../../node_modules/video-react/dist/video-react.css'
import {convertToRupiah} from '../../utils/index';
import {Context} from '../../context/context';
import LoadingPage from '../LoadingPage';
import PopUp from '../../components/Modal/PopUp';

function FilmDetails() {

    const params = useParams();
    const {id} = params;

    const [ state, ] = useContext(Context)
    const [ , dispatch] = useContext(Context);

    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const router = useHistory();
    const [popOpen, setPopOpen] = useState(false);

    const [film, setFilm] = useState([]);
    const [purchase, setPurchase] = useState([]);
    const [wish, setWish] = useState([]);

    const handleOpenBuy = () => {
        dispatch({
            type: "OPENBUY"
        })
    }

    const handleCloseBuy = () => {
        dispatch({
            type: "CLOSEBUY"
        })
    }

    const handleClosePopUp = () => {
        dispatch({
            type: "CLOSEPOPUP"
        })
    }

    const loadFilm = async () => {
        try {
            const response = await API.get(`/film/${id}`);
            setFilm(response.data.data.film);
        } catch (error) {
            console.log(error);
            <Redirect to="*"/>
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

    const loadWishes = async () => {
        try {
            const response = await API.get(`/get-wishes/${id}`);
            setWish(response.data.data.wishes);
        } catch (error) {
            console.log(error);
        }
    }

    const addWish = async () => {
        try {
            await API.post(`/add-wishlist/${id}`);
            loadWishes();
        } catch (error) {
            console.log(error)
        }
    }

    const toggleWish = async (id) => {
        try {
            await API.delete(`/toggle-wishlist/${id}`);
            loadWishes();
        } catch (error) {
            console.log(error)
        }
    }

    const loading = () => {
        //setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000)
    }

    useEffect(() => {
        loadFilm();
        loadPurchases();
        loadWishes();
        setIsLoading(false);
    }, []);

    if (film == null) {
        return <Redirect to="/404"/>
    }
   
    
    const image_url = `http://localhost:5000/uploads/${film.thumbnail}`
   
    return (
        <div>
            <div className='container'>
                <div className='film-container'>
                    <div className='poster-container'>
                        <img src={image_url} className='film-image' style={{flex: 1}}></img>
                        {!wish ? (
                            <button className='btn-pink' onClick={() => addWish()}>Add to Wishlist</button>
                        ) : (
                            <button className='btn-pink' onClick={() => toggleWish(wish.id)}>Remove from Wishlist</button>
                        )}
                    </div>
                               
                    <div className='detail-container' style={{flex: 5}}>
                        <div className='top-details'>
                            <h1>{film&&film.title}</h1>
                            {purchase ? (
                                <div></div>
                            ) : (
                                <div>
                                    <button onClick={() => {handleOpenBuy()}}>Buy Now</button>
                                    <ModalBuy open={state.isBuy} onClose={handleCloseBuy} loadFilm={film}></ModalBuy>
                                    <PopUp open={state.isPopUp} onPopClose={handleClosePopUp}></PopUp>
                                </div>
                            )}  
                            
                        </div>
                        {purchase ? (
                            <ReactPlayer style={{marginTop: 20}} controls='true' url={film&&film.movie} width={'100%'} height={360} onReady={loading}/>
                        ) : 
                        <ReactPlayer style={{marginTop: 20}} controls='true' url={film&&film.link} width={'100%'} height={360} onReady={loading}/>
                        }
                        <p className='category'>{film&&film.category}</p>
                        {purchase ? (<div/>) : 
                            <p className='price'>{film&&film.price&&convertToRupiah(film.price)}</p>
                        }
                        <p className="description">{film&&film.description}</p>                        
                    </div> 
                </div>                
            </div>
        </div>
    )
}

export default FilmDetails
