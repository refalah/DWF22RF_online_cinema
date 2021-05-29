import React, {useContext, useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import { Form, FormFile } from "react-bootstrap";
import { API } from "../../config/api";
//import e from 'express';

const EditProfile = () => {

    const router = useHistory();

    const [form, setForm] = useState({
        fullName: undefined,
        picture: undefined,
        email: undefined,
        phone: undefined,
    });

    const loadUser = async () => {
        try {
            const response = await API.get(`/profile`);
            setForm(response.data.data.users);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === "file" ? e.target.files[0] : e.target.value
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
            formData.set("fullName", form.fullName);
            formData.set("email", form.email);
            formData.append("imageFile", form.picture, form.picture.name)
            formData.set("phone", form.phone);
            
            // formData.set("goal", form.goal);
            // formData.set("description", form.description);
            // console.log(formData)

            const response = await API.patch("/edit-profile", formData, config);

            if(response.data.status === "failed"){
                router.push("/edit-profile")
            } else {
                router.push("/profile");
            }

        } catch (error) {
            console.log(error);
        }
    }

    console.log(form.picture)
    const [chosenFile, setChosenFile] = useState();


    const handlePreview = async (e) => {
        
        //pictureSelected(e);
        if (e.target.files[0]) {
            let reader = new FileReader();
            reader.onloadend = () => {
                setChosenFile(reader.result);
                
            }
            reader.readAsDataURL(e.target.files[0])
            setForm({
                ...form,
                [e.target.name]: e.target.type === "file" ? e.target.files[0] : e.target.value
            })
        }
        // const objectUrl = URL.createObjectURL(form.thumbnail);
        // setChosenFile(objectUrl);

        // return () => URL.revokeObjectURL(objectUrl);
    }

    console.log(chosenFile)
   
    useEffect(() => {
        if(form.picture){
            setChosenFile(`http://localhost:5000/uploads/${form.picture}`);
            return;
        }
        
        if(!form.picture) {
            setChosenFile(undefined);
            return;
        }

    }, [form.picture])

    return (
        <div>
             <div className='container mt-5'>
                <div className='fund-header card-fund'>
                    <h3>Edit Profile</h3>
                </div>
               
                <div className='form-container mt-5'>
                <form style={{marginTop: 15}} onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                        }}>          
                    
                    <input type="text" value={form.fullName} name="fullName" onChange={(e) => onChange(e)}></input>
                    <br /> 
                    <input type="email" value={form.email} name="email" onChange={(e) => onChange(e)} readOnly></input>
                    <br />
                    <input type="number" value={form.phone} name="phone" onChange={(e) => onChange(e)}></input>
                    <br />
                    <input type="file" id="add-thumb" name="picture" onChange={handlePreview} hidden/>
                    <label for="add-thumb" style={{marginTop: 10}} id="label-thumb">Add Picture</label>
                    <br></br>
                    {chosenFile&& (
                        <img src={chosenFile} style={{
                            maxHeight: "200px"
                        }}/>
                    )}
                    
                    {/* {form.picture ? (
                        <div>
                            <img src={chosenFile} style={{
                                maxHeight: "200px"
                            }}/>
                        </div>
                    ) : (
                        <div>
                            <img src={form.picture} style={{
                                maxHeight: "200px"
                            }}/>
                        </div>
                    )}                     */}
                    
                    <br />
                    <div className='btn-container pb-3'>
                        <button type='submit' className='btn-film'>Edit</button>
                    </div>
                    
                </form>
                </div>
            </div>
        </div>
    )
}

export default EditProfile
