import React, {useState, useContext} from 'react'
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../../context/context';
import ModalLogin from '../Modal/ModalLogin';

function Hero() {

    const [ state, ] = useContext(Context)
    const [isOpen, setIsOpen] = useState(false)
    const router = useHistory();

    return (
        <div>
           <div className='hero-container'>
                <div className='hero'>
                    <div className='hero-content'>
                        <h3>Deadpool</h3>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                        {!state.isLogin ? (
                            <>
                                <div className='hero-link' onClick={() => {setIsOpen(true)}}>Buy Now</div>
                                <ModalLogin open={isOpen} onClose={() => setIsOpen(false)}></ModalLogin>
                            </>
                        ) : (
                            <div className='hero-link' onClick={() => router.push(`/film/:id`)}>Buy Now</div>
                        )}
                        
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Hero
