import React, {useState, useEffect} from 'react';
import CardWishlist from '../../components/Card/CardWishlist';
import { API } from '../../config/api';
import {useParams} from 'react-router-dom';

function Wishlist() {
    const {id} = useParams();
    const [wish, setWish] = useState([]);

    const loadWishes = async () => {
        try {
            const response = await API.get(`/my-wishlist/${id}`);
            setWish(response.data.data.wishes)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadWishes();
    },[])
    return (
        <div>
            <div className='container'>
                <h1>Wishlist</h1>
                {wish&&wish.map(w => (
                    <CardWishlist wishlist = {w}></CardWishlist>
                ))}
                
            </div>
        </div>
    )
}

export default Wishlist
