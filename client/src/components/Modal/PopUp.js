import React, {useContext, useState} from 'react';
import ReactDom from 'react-dom';
import { Context } from '../../context/context';

function PopUp({open, onPopClose}) {
    const [ , dispatch] = useContext(Context);

    if (!open) return null
    return ReactDom.createPortal(
        <>
            <div className='dark-overlay' onClick={onPopClose}></div>
            <div className='popup'>
                <p>thank you for buying this film, please wait 1x24 hours because your transaction is in process</p>
            </div>
                   
        </>,
        document.getElementById('portal')
    )
}

export default PopUp
