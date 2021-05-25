import React, {useContext, useState} from 'react';
import { API } from '../../config/api';
import {useParams} from 'react-router-dom';
import ReactDom from 'react-dom';
import { Context } from '../../context/context';

function ModalBuy({open, onClose}) {

    const params = useParams();
    const {id} = params;
    const [ , dispatch] = useContext(Context);

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

            await API.post(`/buy/${id}`, formData, config);

            
            onClose();

        } catch (error) {
            console.log(error);
        }
    }

    if (!open) return null
    return ReactDom.createPortal(
        <>
            <div className='dark-overlay' onClick={onClose}></div>
            <div className='modal-donate'>
                  
                <div className='modal-sample-content'>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}>
                        
                        <div className='input-group-sample'>
                            
                            <input type='number' name='accNumber' placeholder='Input Your Account Number' className=' grab-input'  onChange={(e) => onChange(e)}></input>

                            <div className='img-proof' style={{
                                marginBottom : '20px'
                            }}>
                                <input type="file" id="add-thumb" name="proofAttachment" onChange={(e) => onChange  (e)} hidden/>
                                <label for="add-thumb" id="label-thumb" style={{
                                    marginRight : "50px",
                                    width: "50%"
                                }}>Attach Thumbnail</label>
                                <p style={{
                                    width: "70%"
                                }}>*transfers can be made to cinema accounts</p>
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
