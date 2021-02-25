import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import firebaseConfig from './firebase.config';
import './Login.css';

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  const handleGoogleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function (result) {
      const { displayName, email } = result.user;
      const signedInUser = { name: displayName, email }
      setLoggedInUser(signedInUser);
      storeAuthToken();
      history.replace(from);
    })

      .catch(function (error) {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }
  const storeAuthToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      .then(function (idToken) {
        sessionStorage.setItem('token', idToken);
      })
      .catch(function (error) {
        // Handle error
      });
  }
  return (

    <div className="full-container mt-5">
      <div className="login-container text-center">
        <h1>Login</h1>
        <button onClick={handleGoogleSignIn}>
          <img style={{ height: '30px' }} className="mr-1 mr-md-5" src="https://i.imgur.com/Sx1nRKu.png" alt="" /> login with google
            </button>
      </div>
    </div>

  );
};

export default Login;