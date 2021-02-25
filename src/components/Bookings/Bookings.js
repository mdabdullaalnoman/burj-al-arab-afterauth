import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [booking, setBooking] = useState([]);

    useEffect(() => {
        fetch('https://still-shore-81542.herokuapp.com/bookings?email=' + loggedInUser.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        })//quarry perametter to load only loggedin user info .
            .then(res => res.json())
            .then(data => setBooking(data))
    }, [])
    return (
        <div style={{ textAlign: 'center' }}>
            <h1> I Have {booking.length} bookings</h1>
            {
                booking.map(bookInfo => (
                    <div className="container">
                        <div className="row text-center">
                            <div className="col-6 px-2 my-2" style={{border: '1px solid gray'}}>
                                <h4>{bookInfo.name}</h4>
                                <h6>{bookInfo.email} </h6>
                                <p>{(new Date(bookInfo.checkInDate).toDateString('dd/MM/yyyy'))}</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Bookings;