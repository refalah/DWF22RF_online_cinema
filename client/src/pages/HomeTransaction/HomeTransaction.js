import React, {useState, useEffect} from 'react';
import { API } from '../../config/api';
import Table from '../../components/Table/Table';

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
            {/* <table id='customers'>
                    <tr>
                      <th>User</th>
                      <th>Bukti Transfer</th>
                      <th>Film</th>
                      <th>Account Number</th>
                      <th>Payment Status</th>
                      <th>Action</th>
                    </tr>

                    <tr>
                       <td>{transactions.accNumber}</td>
                       <td>{transactions.proofAttachment}</td>
                       <td>{transactions.Film.title}</td>
                       <td>{transactions.accNumber}</td>
                       <td>{transactions.status}</td>

                    </tr>
                </table> */}
            {transactions&&transactions.map((pay, index) => (
                <div key={pay.id + index}>
                    <Table pay = {pay} loadPayment={loadPayment}/>
                </div>
            ))}
        </div>
    )
}

export default HomeTransaction
