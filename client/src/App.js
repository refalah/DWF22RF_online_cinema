import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {ContextProvider} from './context/context';

import Navbar from './components/Navbar/Navbar'

import Home from './pages/Home/Home';



function App() {
  return (
    <>
    <ContextProvider>
      <Router>
        <Navbar/>
        <Switch>
          <Route path='/' exact component={Home}></Route>
        </Switch>
      </Router>
    </ContextProvider>
    </>
  );
}

export default App;
