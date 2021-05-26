import React from 'react'

function CardHistory({userData}) {

    const {accNumber, createdAt, status, id} = userData;
    //console.log(userData.Fund.createdAt);
    const date = new Date(createdAt);
    const newFormDate = new Intl.DateTimeFormat(['ban', 'en'], { dateStyle: 'full' }).format(date)

    return (
        <div>
            <div className='history mb-3'>
                <div className='history-content'>
                    <div className='history-title'>
                        <p>{userData.Film&&userData.Film.title}</p>
                    </div>
                    <div className='history-date'>
                        <p>{newFormDate}</p>
                    </div>
                    <div className='history-status'>
                        <p>{userData.Film.price&&userData.Film.price}</p>
                        {status == "Pending" ? (
                            <div className='status-card' style={{
                                background: "#F6FF72",
                                color: "orange"
                            }}>{status}</div>
                        ) : (
                            <div className='status-card'>{status}</div>
                        )}
                        
                       
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CardHistory
