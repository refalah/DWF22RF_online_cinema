import React, {useContext, useState, useEffect} from 'react'
import { Context } from '../../context/context'
import ReactDom from 'react-dom'
import { API, setAuthToken } from "../../config/api";
import { useHistory } from "react-router-dom";

function ModalLogin({open, onClose}) {

    const router = useHistory();

    const [ state, dispatch] = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const initialState = {
        email: "",
        password: "",
      };

    const [form, setForm] = useState(
        initialState
    );

    const { email, password } = form;

    const [message, setMessage] = useState('');

    const onChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    };

    function refreshPage() {
      window.location.reload(false);
    }

    const handleCloseLogin = () => {
        dispatch({
            type: "CLOSELOGIN"
        })
    }
    const handleOpenRegister = () => {
        dispatch({
            type: "OPENREGISTER"
        })
    }

    const [user, setUser] = useState([]);

    const loadUser = async () => {
        
        try {
            const response = await API.get(`/profile`);
            setUser(response.data.data.users);
            
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json"
                }
            }
            const body = JSON.stringify({
                email,
                password
            });

            const response = await API.post("/login", body, config);

            setMessage(response.data.message);

            setAuthToken(response.data.data.user.token);
 
            dispatch({
              type: "USER_SUCCESS",
              payload: response.data.data.user,
            });            

            refreshPage();

            onClose();

            if(response.data.data.user.id === 1){
                router.push("/home-transaction")
            }
           
            // setForm(initialState);

        } catch (error) {
            console.log(error);
            setIsLoading(false);
        }
    }

    
    useEffect(() => {
        loadUser();
    }, []);

    if (!open) return null
    return ReactDom.createPortal(
        <>
            <div className='dark-overlay' onClick={onClose}></div>
            <div className='modal-login'>

                <div className='modal-sample-content'>
                    <h1>Login</h1>

                    {message && (
                            <div class="alert alert-danger py-1" role="alert" style={{
                                zIndex: "1",
                                position: "absolute"
                            }}>
                                <small>{message}</small>
                            </div>
                        )}

                    <form onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit(e);
                    }}>
                        
                        <div className='input-group-sample'>
                            
                            <input type='text' name='email' placeholder='Email' className='email-input grab-input'  onChange={(e) => onChange(e)}></input>
                            <input type='password' name='password' placeholder='Password' className='password-input grab-input'  onChange={(e) => onChange(e)}></input>
                        </div>
                        <button type='submit' style={{textAlign: 'center'}} className='modal-sample-link' >Login</button>
                        
                        <p style={{textAlign: 'center'}}>Don't have an account ?
                            <span onClick={() => {
                                    handleCloseLogin();
                                    handleOpenRegister();
                                }} style={{fontWeight: "bold", cursor: "pointer", marginLeft: "5px"}}>
                                    Click Here
                            </span>
                        </p>
                    </form>
                </div>
                   
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default ModalLogin
