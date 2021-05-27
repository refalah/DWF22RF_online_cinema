import React, {useState, useContext, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../../context/context';
import { API } from '../../config/api';
import ModalLogin from '../Modal/ModalLogin';
import ModalRegister from '../Modal/ModalRegister';

function Navbar() {
    const [ state, ] = useContext(Context)
    const [ , dispatch] = useContext(Context)
    
    const handleLogout = () => {
        dispatch({
            type: "LOGOUT"
        })
    }
    const handleOpenLogin = () => {
        dispatch({
            type: "OPENLOGIN"
        })
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
    const handleCloseRegister = () => {
        dispatch({
            type: "CLOSEREGISTER"
        })
    }

    const router = useHistory();

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

    console.log(user.id)

    return (
        <>
            <div className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo">
                        <img src="/Icon.svg" alt="icon-cinema"/>
                    </Link>
                    <ul className="nav-menu">
                    {!state.isLogin ? ( 
                            <>

                            
                            <li className="nav-item">
                                <div className='nav-links' onClick={handleOpenLogin}>Login</div>
                                <ModalLogin open={state.isVisibleLogin} onClose={handleCloseLogin}></ModalLogin>
                            </li>
                            <li>
                                <div className='nav-links-mobile' onClick={handleOpenRegister}>Register </div>
                                <ModalRegister opens={state.isVisibleRegister} onClose={handleCloseRegister}></ModalRegister>
                            </li>
                            </>
                         ) : ( 
                            <>
                           
                            <div style={{
                                display:'flex'
                            }}>

                            <li className="nav-item">
                                <div className='nav-links' onClick={() => router.push('/film-list')}>All Films</div>
                            </li>

                            <div class="dropdown">
                              <button class="dropbtn">Dropdown</button>
                              <div class="dropdown-content">
                                {user.id&&user.id === 1 ? (
                                    <>
                                        <a href="#" onClick={() => router.push('/add-film')}>Add Film</a>
                                        <a href="#" onClick={handleLogout}>Logout</a>
                                    </>
                                ) : (
                                    <>
                                        <a href="#" onClick={() => router.push('/profile')}>Profile</a>
                                        <a href="#" onClick={() => router.push('/my-films')}>My Film List</a>
                                        <a href="#" onClick={handleLogout}>Logout</a>
                                    </>
                                )}
                               
                                        
                              </div>
                            </div>
                                
                            </div>

                            
                            </>
                         )}
                    </ul>
                </div>
            </div>            
        </>
    )
}

export default Navbar
