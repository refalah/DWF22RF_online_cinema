import React from 'react';
import { API } from '../../config/api';

function Table({pay, loadPayment}) {

    const {id, accNumber, proofAttachment, status} = pay;

    const handleApprove = async () => {
        try {
            await API.patch(`/approve/${id}`);
            loadPayment();
            //router.push(`/fund/${id}`)
            //onClose();
        } catch (error) {
            console.log(error);
        }
        console.log(`hello ${id}`)
    }

    const handleCancel = async () => {
        try {
            await API.patch(`/cancel/${id}`);
            loadPayment();
            //router.push(`/fund/${id}`)
            //onClose();
        } catch (error) {
            console.log(error);
        }
        console.log(`hello ${id}`)
    }

    return (
        <div>
            <div className='container table-container'>
                <table id='customers'>
                    {/* <tr>
                      <th>User</th>
                      <th>Bukti Transfer</th>
                      <th>Film</th>
                      <th>Account Number</th>
                      <th>Payment Status</th>
                      <th>Action</th>
                    </tr> */}

                    <tr>
                       <td>{pay.User.fullName}</td>
                       <td>{proofAttachment}</td>
                       <td>{pay.Film.title}</td>
                       <td>{accNumber}</td>
                       <td>{status}</td>
                       <td>
                       <div class="dropdown">
                        <i class="arrow down"></i>
                          <div class="dropdown-content">
                          <a href="#" onClick={handleApprove}>Approve</a>
                          <a href="#" onClick={handleCancel}>Cancel</a>
                          </div>
                        </div>
                       </td>
                    </tr>
                </table>
            </div>
        </div>
    )
}

export default Table