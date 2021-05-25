import React, {useState, useContext, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Context } from '../../context/context';
import ModalLogin from '../Modal/ModalLogin';
import ModalRegister from '../Modal/ModalRegister';
import { NavDropdown } from "react-bootstrap";

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

                            <div class="dropdown">
                              <button class="dropbtn">Dropdown</button>
                              <div class="dropdown-content">
                                <a href="#">Link 1</a>
                                <a href="#">Link 2</a>
                                <a href="#">Link 3</a>
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
