import React, {useState, useContext, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../../context/context';
import { API } from '../../config/api';
import ModalLogin from '../Modal/ModalLogin';
import ModalRegister from '../Modal/ModalRegister';
import LoadingPage from '../../pages/LoadingPage';

function Navbar() {
    const [ state, ] = useContext(Context)
    const [ , dispatch] = useContext(Context)

    function refreshPage() {
        window.location.reload(false);
      }
    
    const handleLogout = () => {
        refreshPage();
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
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
        }, 500)
    }, []);


    return (
        <>
        {isLoading ? <LoadingPage/> :
        <div>
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
                            <img src='/User.png'/>
                              <button class="dropbtn" hidden>Dropdown</button>
                              <div class="dropdown-content">
                                {user&&user.id === 1 ? (
                                    <>
                                        <div style={{borderBottom: 1, borderBottomStyle: 'solid', borderWidth: 1, marginTop: 7}}>
                                            <a href="#" onClick={() => router.push('/add-film')}><img src='/film.svg'/>Add Film</a>
                                        </div>
                                        <a href="#" onClick={handleLogout}><img src='/logout.svg'/>Logout</a>
                                    </>
                                ) : (
                                    <>
                                        <div style={{borderBottom: 1, borderBottomStyle: 'solid', borderWidth: 1}}>
                                            <a href="#" onClick={() => router.push('/profile')}><img src='/user2.svg'/>Profile</a>
                                            <a href="#" onClick={() => router.push('/my-films')}><img src='clapperboard.svg'/>My Film List</a>
                                            <a href="#" onClick={() => router.push('/wishlist')}><img src='clapperboard.svg'/>Wishlist</a>
                                        </div>                                        
                                        <a href="#" onClick={handleLogout}><img src='/logout.svg'/>Logout</a>
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
            </div>  
            }          
        </>
    )
}

export default Navbar
