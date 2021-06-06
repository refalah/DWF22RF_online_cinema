import React from 'react';
import {convertToRupiah} from '../../utils/index';

function CardWishlist({wishlist}) {
    return (
        <div>
            <div className='wishlist'>
                <div className='wishlist-content'>                    
                    <div className='wishlist-details'>
                        <p>{wishlist.Film.title}</p>
                        <p>{wishlist.Film&&convertToRupiah(wishlist.Film.price)}</p>
                    </div>
                    <img src={wishlist.image_url}></img>
                </div>
            </div>            
        </div>
    )
}

export default CardWishlist
