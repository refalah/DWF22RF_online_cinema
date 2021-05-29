import React, {useContext, useState} from 'react';
import ReactDom from 'react-dom';
import { Context } from '../../context/context';

function PopUp({open, OnPopClose}) {
    const [ , dispatch] = useContext(Context);

    if (!open) return null
    return ReactDom.createPortal(
        <>
            <div className='dark-overlay' onClick={OnPopClose}></div>
            <div className='popup'>
                <p>HAHAHAH</p>
            </div>
                   
        </>,
        document.getElementById('portal')
    )
}

export default PopUp
