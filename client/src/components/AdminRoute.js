import React, {useContext, useEffect, useState} from 'react';
import { Route, Redirect } from "react-router-dom";
import { Context } from "../context/context";
import {API} from '../config/api';

const AdminRoute = ({ component: Component, ...rest }) => {
    const [state, dispatch] = useContext(Context);
    const {isAdmin} = state
    // const [user, setUser] = useState([]);

    // const loadUser = async () => {
    //     try {
    //         const response = await API.get(`/profile`);
    //         setUser(response.data.data.users);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // useEffect(() => {
    //     loadUser()
    // })

    return (
        <Route
          {...rest}
          render={(props) =>
            isAdmin ? <Redirect to="/home-transaction"/> : <Redirect to="/"/>
          }
        />
    )
}

export default AdminRoute
