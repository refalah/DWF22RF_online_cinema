import React from 'react';
import { API } from '../../config/api';
import Table from 'react-bootstrap/Table'

function NewTable({transactions, loadPayment}) {

    const {id, accNumber, proofAttachment, status} = transactions;

    const handleApprove = async (id) => {
        try {
            await API.patch(`/approve/${id}`);
            loadPayment();
            //router.push(`/fund/${id}`)
            //onClose();
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = async (id) => {
        try {
            await API.patch(`/cancel/${id}`);
            loadPayment();
            //router.push(`/fund/${id}`)
            //onClose();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div className='container table-container'>
                <Table id='customers' striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Bukti Transfer</th>
                      <th>Film</th>
                      <th>Account Number</th>
                      <th>Payment Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                
                  <tbody>
                  {transactions.map(transaction => (
                    <tr>
                        <td>{transaction.User.fullName}</td>
                        <td>{transaction.proofAttachment}</td>
                        <td>{transaction.Film.title}</td>
                        <td>{transaction.accNumber}</td>
                        <td>{transaction.status}</td>
                        <td>
                        <div class="dropdown" >
                         <i class="arrow down" style={{padding: 5}}></i>
                           <div class="dropdown-content" >
                           <a href="#" onClick={() => handleApprove(transaction.id)}>Approve</a>
                           <a href="#" onClick={() => handleCancel(transaction.id)}>Cancel</a>
                           </div>
                         </div>
                        </td>
                    </tr>
                    ))}
                   
                  </tbody>
                </Table>
            </div>
        </div>
    )
}

export default NewTable