import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { UserContext } from '../../App';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import Bookings from '../Bookings/Bookings';

const Book = () => {
    const {bedType} = useParams();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const [selectedDate, setSelectedDate] =useState({
        checkInDate: new Date(),
        checkOutDate: new Date()
    });

    const handleCheckInDate = (date) => {
      const newDate = {...selectedDate};
      newDate.checkInDate = date;
        setSelectedDate(date);
    };
    const handleCheckOutDate = (date) => {
        const newDate = {...selectedDate};
        newDate.checkOutDate = date ;
          setSelectedDate(date);
      };

      const handleBooking = () => {
        const bookingInfo = {...selectedDate, ...loggedInUser};
        console.log(bookingInfo);
        fetch('http://localhost:4200/oneBooking' , {
          method:'POST',
          headers:{'Content-Type' : 'application/json'},
          body: JSON.stringify(bookingInfo)
        })
        .then(result => result.json())
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        })
        
      }
    return (
        <div style={{textAlign: 'center'}}>
            <h1>hellow {loggedInUser.name} Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="check in date"
          label="check in date"
          value={selectedDate.checkInDate}
          onChange={handleCheckInDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="check out date"
          format="dd/MM/yyyy"
          value={selectedDate.checkOutDate}
          onChange={handleCheckOutDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        
      </Grid>
      <Button onClick={handleBooking} className="my-5" variant="contained" color="secondary">book now >></Button>
  

    </MuiPickersUtilsProvider>

    <Bookings></Bookings>


        </div>
    );
};

export default Book;