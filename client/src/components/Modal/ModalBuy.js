import React, {useContext, useState} from 'react';
import { API } from '../../config/api';
import {useParams} from 'react-router-dom';
import ReactDom from 'react-dom';
import { Context } from '../../context/context';
import {convertToRupiah} from '../../utils/index';
import PopUp from './PopUp';

function ModalBuy({open, onClose, loadFilm}) {

    const params = useParams();
    const {id} = params;
    const [ state, ] = useContext(Context)
    const [ , dispatch] = useContext(Context);
    const [isOpen, setIsOpen] = useState(false);
    

    const [form, setForm] = useState({
        accNumber: "",
        proofAttachment: null,
    });

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value
        })
    };

    const handleOpen = () => {
        dispatch({
            type: "OPENPOPUP"
        })        
    }

    const handleCloseBuy = () => {
        dispatch({
            type: "CLOSEBUY"
        })
    }

    const handleSubmit = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            }

            const formData = new FormData();
            formData.set("accNumber", form.accNumber);
            formData.append("imageFile", form.proofAttachment[0], form.proofAttachment[0].name);

            const response = await API.post(`/buy/${id}`, formData, config);

            
            handleCloseBuy();
            handleOpen();
            

        } catch (error) {
            console.log(error);
        }
    }

    if (!open) return null
    return ReactDom.createPortal(
        <>
            <div className='dark-overlay' onClick={onClose}></div>
            <div className='modal-buy'>                  
                <div className='modal-sample-content'>
                    <form onSubmit={(e) => {
                        e.preventDefault();                        
                        handleSubmit();
                        
                    }}>
                        <p className='cinema-number'>Cinema<span>Online</span> : 0981312323</p>
                        <div className='input-group-sample'>                            
                            <p className='title-buy'>{loadFilm.title}</p>
                            <p className='total'>Total : <span>{loadFilm.price&&convertToRupiah(loadFilm.price)}</span></p>                            
                            <input type='number' name='accNumber' placeholder='Input Your Account Number' className='number-account'  onChange={(e) => onChange(e)}></input>

                            <div className='img-proof' style={{
                                marginBottom : '20px'
                            }}>
                                <input type="file" id="add-thumb" name="proofAttachment" onChange={(e) => onChange  (e)} hidden/>
                                <label for="add-thumb" className='proof'>Attach Payment <img style={{paddingLeft: 20, height: 25, color: 'white'}} src='/list.svg'/></label>
                                <p>*transfers can be made to cinema accounts </p>
                            </div>
                        </div>

                        <button type='submit' style={{textAlign: 'center'}} className='modal-sample-link' >Pay</button>
                        
                       
                    </form>
                    </div>
            </div>
                   
        </>,
        document.getElementById('portal')
    )
}

export default ModalBuy
