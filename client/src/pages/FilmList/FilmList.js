import React, {useContext, useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import { Context } from '../../context/context';
import { API } from '../../config/api';

function FilmList() {
    return (
        <>
            <div className="container mt-5">
                <div className="film-header">
                    <h3>My Film List</h3>
                </div>
            </div>
        </>
    )
}

export default FilmList
