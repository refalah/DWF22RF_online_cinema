import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import CardProfile from '../../components/Card/CardProfile';
import History from '../../components/Card/CardHistory';
import { API } from '../../config/api';

function Profile() {

    const router = useHistory();

    const [user, setUser] = useState([]);
    const [purchases, setPurchases] = useState([]);

    const loadUser = async () => {
        try {
            const response = await API.get(`/profile`);
            setUser(response.data.data.users);
        } catch (error) {
            console.log(error);
        }
    }

    const loadPurchases = async () => {
        try {
            const response = await API.get(`/user-purchase`);
            setPurchases(response.data.data.purchases);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadUser();
        loadPurchases();
    }, []);

    return (
        <div>
            <div className='container'>
            <div className="profile-container">
                    <CardProfile user = {user}/>
                    <div className='history-container'>
                        <h1>Transaction History</h1>
                        {purchases&&purchases.map((dono, index) => (
                            <div key={dono.id + index}>
                                <History userData = {dono}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
