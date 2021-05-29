import React, {useState, useContext} from 'react'
import { useHistory } from 'react-router-dom';
import { Context } from '../../context/context';
import ModalLogin from '../Modal/ModalLogin';

function Card({film, approve}) {
    //const {id, image_url} = film;
    const [ state, ] = useContext(Context)
    const [isOpen, setIsOpen] = useState(false)
    
    const router = useHistory();
    //console.log(approve.Film)

    const goToPage = (id) => {
        router.push(`/film/${id}`);
    };

    return (
        <div>
            {film&&film ? (
                <div className='cards mb-5'>
                {!state.isLogin ? (
                    <div className='card-image-container'>
                        <img src={film&&film.image_url} className='img-dono'  onClick={() => {setIsOpen(true)}}></img>
                        <ModalLogin open={isOpen} onClose={() => setIsOpen(false)}></ModalLogin>
                    </div>
                ) : (
                    <div className='card-image-container' onClick={() => goToPage(film.id)}>
                        <img src={film&&film.image_url} className='img-dono'></img>
                    </div>
                )}              
                
            </div> 
            ) : (
                
                <div className='cards mb-5'>
                    <div className='card-image-container' onClick={() => goToPage(approve.Film.id)}>
                        <img src={approve.image_film} className='img-dono'></img>
                    </div>               
                </div> 
            )}
            
        </div>
    )
}

export default Card
