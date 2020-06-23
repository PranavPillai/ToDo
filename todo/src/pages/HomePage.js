import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import banner from '../assets/banner.jpg';
import './homepage.scss';
import firebase from '../firebase.js';

function HomePage(props) {

  const { setLoggedIn, setUserID, history } = props;

  const [onLogin, setOnLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [wrongCombo, setWrongCombo] = useState(false);

  const signUp = () => {
    const usersRef = firebase.database().ref('users')
    const newUser = {
      email,
      password
    }
    const newUserId = usersRef.push(newUser).ref.key;
    setUserID(newUserId);
    setLoggedIn(true);
    history.push('/dashboard');
  }

  const login = () => {
    const usersRef = firebase.database().ref('users').orderByChild('email').equalTo(email).once('child_added', (snapshot) => { 
        const user = snapshot.val();
        if (user.password === password) {
            setUserID(snapshot.key);
            setLoggedIn(true);
            history.push('/dashboard')
        } else {
          setWrongCombo(true);
        }
    });
    console.log(usersRef)
  }

  return (
    <div className="home-page">
      <div className="banner-container">
        <img src={banner} alt="Banner" className="banner" />
      </div>
      <div className="content-container">
        <div className="header-container">
          <p className="header">Wacha Gotta Do?</p>
          <p className="subtext">Organize your life and get **** done.</p>
        </div>
        <div className="form-container">
          <p className="form-title">{onLogin ? 'Login' : 'Sign Up'}</p>
          <div className="form-fields">
            <TextField
              label="email"
              type="text"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="password"
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button 
              className="go-btn"
              variant="contained"
              color="secondary"
              onClick={onLogin ? login : signUp}
            >
              Go
            </Button>
          </div>
          {
            wrongCombo && <p className="error-text">Wrong username or password.</p>
          }
          {onLogin
            ? <p className="sub-text">Don't have an account? <span className="link" onClick={() => setOnLogin(!onLogin)}>Sign Up.</span></p>
            :  <p className="sub-text">Already have an account? <span className="link" onClick={() => setOnLogin(!onLogin)}>Login.</span></p>
          }
        </div>
      </div>
    </div>
  );

}

export default withRouter(HomePage);
