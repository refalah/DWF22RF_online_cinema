import React, {useState, useEffect} from 'react';
import { API } from '../../config/api';
import NewTable from '../../components/Table/Table';
//import Table from 'react-bootstrap/Table'

function HomeTransaction() {

    const [transactions ,setTransactions] = useState([]);

    const loadPayment = async () =>{
        try {
            const response = await API.get(`/transactions`);
            setTransactions(response.data.data.purchases);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        loadPayment();
    }, [])
    
   

    return (
        <div>
            <div className='container'>
                <h3>Incoming Transaction</h3>
            </div>

            <NewTable transactions={transactions} loadPayment={loadPayment} />

                
        </div>
    )
}

export default HomeTransaction
