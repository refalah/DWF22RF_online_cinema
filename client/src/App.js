import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {ContextProvider} from './context/context';

import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar/Navbar';

import Home from './pages/Home/Home';
import FilmList from './pages/FilmList/FilmList';
import AddFilm from './pages/AddFilm/AddFilm';
import FilmDetails from './pages/FilmDetails/FilmDetails';



function App() {
  return (
    <>
    <ContextProvider>
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/' exact component={Home}></Route>
          <PrivateRoute path='/film-list' exact component={FilmList}></PrivateRoute>
          <PrivateRoute path='/add-film' exact component={AddFilm}></PrivateRoute>
          <PrivateRoute path='/film/:id' exact component={FilmDetails}></PrivateRoute>
        </Switch>
      </Router>
    </ContextProvider>
    </>
  );
}

export default App;