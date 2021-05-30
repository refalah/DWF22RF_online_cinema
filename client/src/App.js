import React, {useEffect, useContext} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {ContextProvider, Context} from './context/context';
import { API, setAuthToken } from './config/api';


import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar/Navbar';

import Home from './pages/Home/Home';
import FilmList from './pages/FilmList/FilmList';
import AddFilm from './pages/AddFilm/AddFilm';
import FilmDetails from './pages/FilmDetails/FilmDetails';
import Profile from './pages/Profile/Profile';
import HomeTransaction from './pages/HomeTransaction/HomeTransaction';
import MyFilms from './pages/MyFilms/MyFilms';
import EditProfile from './pages/EditProfile/EditProfile';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}


function App() {   
  
    const [, dispatch] = useContext(Context);
  
    const checkUser = async () => {
      try {
        const response = await API.get("/check-auth");
        if (response.status === 404 || response.status === 500) {
          return dispatch({
            type: "AUTH_ERROR",
          });
        }
        let payload = response.data.data.user;
        payload.token = localStorage.token;
        dispatch({
          type: "USER_SUCCESS",
          payload,
        });
      } catch (error) {
        console.log(error);
        dispatch({
          type: "AUTH_ERROR",
        });
      }
    };
  
    useEffect(() => {
      checkUser();
    }, []);

  return (
    <>
    {/* <ContextProvider> */}
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/' exact component={Home}></Route>
          <PrivateRoute path='/film-list' exact component={FilmList}></PrivateRoute>
          <PrivateRoute path='/add-film' exact component={AddFilm}></PrivateRoute>
          <PrivateRoute path='/film/:id' exact component={FilmDetails}></PrivateRoute>
          <PrivateRoute path='/profile' exact component={Profile}></PrivateRoute>
          <PrivateRoute path='/edit-profile' exact component={EditProfile}></PrivateRoute>
          <PrivateRoute path='/my-films' exact component={MyFilms}></PrivateRoute>
          <PrivateRoute path='/home-transaction' exact component={HomeTransaction}></PrivateRoute>
        </Switch>
      </Router>
    {/* </ContextProvider> */}
    </>
  );
}

export default App;
