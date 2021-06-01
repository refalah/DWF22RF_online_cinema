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
        movie: "",
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
            formData.set("movie", form.movie);
            formData.set("description", form.description);
           

            const response = await API.post("/film", formData, config);

            //setMessage(response.data.message);

            if(response.data.status === "failed"){
                router.push('/add-film')
            } else {
                router.push("/home-transaction");
            }

            

        } catch (error) {
            console.log(error);
        }
    }

    const [chosenFile, setChosenFile] = useState()
   
    useEffect(() => {
        if(!form.thumbnail){
            setChosenFile(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(form.thumbnail);
        setChosenFile(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);

    }, [form.thumbnail])

    return (
        <>
            <div className='container mt-5'>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                }}>
                    <div className='top-input'>
                        <input type="text" placeholder="Title" style={{
                            flex: 5
                        }} name="title" onChange={(e) => onChange(e)}></input>                  
                        <input type="file" id="add-thumb" name="thumbnail" onChange={(e) => onChange(e)} hidden/>
                        <label for="add-thumb" id="label-thumb" style={{marginLeft: 10, flex: 1, fontSize: 13, color: '#b1b1b1'}}>Attach Thumbnail <img style={{paddingLeft: 40, height: 25}} src='/paperclip.svg'/></label>                        
                    </div>
                    {<img src={chosenFile} style={{
                        maxHeight: "200px"
                    }}/>}
                    <input type="text" placeholder="Category" name="category" onChange={(e) => onChange(e)}></input>                    
                    <br />                     
                    <input type="number" placeholder="Price" name="price" onChange={(e) => onChange(e)}></input>
                    <br />
                    <input type="text" placeholder="Trailer Link" name="link" onChange={(e) => onChange(e)}></input>                    
                    <br /> 
                    <input type="text" placeholder="The Movie" name="movie" onChange={(e) => onChange(e)}></input>                    
                    <br /> 
                    <textarea placeholder="Description" name="description" rows={10} className='description-input' onChange={(e) => onChange(e)}></textarea>
                    <br />
                    <div className='btn-container pb-3'>
                        <button type='submit' className='btn-film' style={{marginTop: 15}}>Add Film</button>
                    </div>
                </form>
                </div>
        </>
    )
}

export default AddFilm
