import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Bookings = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [booking , setBooking] = useState([]);

    useEffect(() =>{
        fetch('http://localhost:4200/bookings?email='+loggedInUser.email,{
            method:'GET',
            headers:{
                'Content-Type' :'application/json',
                authorization : `Bearer ${sessionStorage.getItem('token')}`
            }
        })//quarry perametter to load only loggedin user info .
        .then(res => res.json())
        .then(data => setBooking(data))
    },[])
    return (
        <div style={{textAlign:'center'}}>
            <h1> I Have {booking.length} bookings</h1>
            {
                booking.map(bookInfo => (
                    <div style={{textAlign:'center', padding:'10px' , color:'white', background:'black', margin:'10px'}}>
                        <h3>{bookInfo.name}</h3>
                        <h2>{bookInfo.email} </h2>
                        <p>{(new Date(bookInfo.checkInDate).toDateString('dd/MM/yyyy'))}</p>
                    </div>
                ))
            }
        </div>
    );
};

export default Bookings;