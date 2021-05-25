import React, {useContext, useEffect, useState} from 'react'
import { useHistory } from "react-router-dom";
import { API } from "../../config/api";


function AddFilm() {

    const router = useHistory();

    const [form, setForm] = useState({
        title: "",
        thumbnail: null,
        category: "",
        price: "",
        link: "",
        description: ""
    });

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
            formData.set("title", form.title);
            formData.append("imageFile", form.thumbnail, form.thumbnail.name)
            formData.set("category", form.category);
            formData.set("price", form.price);
            formData.set("link", form.link);
            formData.set("description", form.description);
           

            const response = await API.post("/film", formData, config);

            //setMessage(response.data.message);

            if(response.data.status === "failed"){
                router.push('/add-film')
            } else {
                router.push("/add-film");
            }

            

        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='container mt-5'>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>                
                    <input type="text" placeholder="Title" name="title" onChange={(e) => onChange(e)}></input>                    
                    <br />                  
                    <input type="file" id="add-thumb" name="thumbnail" onChange={(e) => onChange(e)} hidden/>
                    <label for="add-thumb" id="label-thumb">Attach Thumbnail</label>
                    <br></br>
                    <input type="text" placeholder="Category" name="category" onChange={(e) => onChange(e)}></input>                    
                    <br />                     
                    <input type="number" placeholder="Price" name="price" onChange={(e) => onChange(e)}></input>
                    <br />
                    <input type="text" placeholder="Trailer Link" name="link" onChange={(e) => onChange(e)}></input>                    
                    <br /> 
                    <textarea placeholder="description" name="description" onChange={(e) => onChange(e)}></textarea>
                    <br />
                    <div className='btn-container pb-3'>
                        <button type='submit' className='btn-fund'>Add Film</button>
                    </div>
                </form>
                </div>
        </>
    )
}

export default AddFilm
