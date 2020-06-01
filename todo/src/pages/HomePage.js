import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import banner from '../assets/banner.jpg';
import './homepage.scss';
import firebase from '../firebase.js';

export default function HomePage() {

  const offsetDate = new Date()
  const offset = offsetDate.getTimezoneOffset()
  const currDate = new Date(offsetDate.getTime() + (offset*60*1000))

  const [date, setDate] = useState(currDate.toISOString().split('T')[0]);

  const handleDateChange = (e) => {
    setDate(e.target.value)
  }

  const addDate = () => {
    const itemsRef = firebase.database().ref('items')
    const newItem = {
      text: 'testing',
      date: date
    }
    itemsRef.push(newItem);
  }

  return (
    <div className="home-page">
      <div className="banner-container">
        <img src={banner} alt="Banner" className="banner" />
      </div>
      <div className="content-container">
        <div className="header-container">
          <p className="header">A Day in the Life</p>
          <p className="subtext">Experience the world as it used to be.</p>
        </div>
        <div className="form-container">
          <TextField
            id="date"
            type="date"
            className="date-picker"
            value={date}
            onChange={handleDateChange}
          />
          <Button 
            className="go-btn"
            variant="contained"
            color="secondary"
            onClick={addDate}
          >
            Go
          </Button>
        </div>
      </div>
    </div>
  );

}
