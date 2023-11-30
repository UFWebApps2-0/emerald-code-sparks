import { message } from 'antd';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { postUser, setUserSession } from '../../Utils/AuthRequests';
import './TeacherLogin.less';
import {GoogleLogin} from 'react-google-login';
import {gapi} from 'gapi-script';
import './style.css'

const CLIENT_ID = "296846904571-jiau68kb1m5ovbjodmho8ei6fe69qbkv.apps.googleusercontent.com";
const API_KEY = "AIzaSyBH4GlSHNm7zUcrcINb-uKI82l36vbD4jA";
const SCOPES = "https://www.googleapis.com/auth/drive";

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return {
    value,
    onChange: handleChange,
  };
};

export default function TeacherLogin() {
  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES
      })
    };

    gapi.load('client:auth2', start);
  })

  const email = useFormInput('');
  const password = useFormInput('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    setLoading(true);
    let body = { identifier: email.value, password: password.value };

    postUser(body)
      .then((response) => {
        setUserSession(response.data.jwt, JSON.stringify(response.data.user));
        setLoading(false);
        if (response.data.user.role.name === 'Content Creator') {
          navigate('/ccdashboard');
        } else if (response.data.user.role.name === 'Researcher') {
          navigate('/report');
        } else {
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        setLoading(false);
        message.error('Login failed. Please input a valid email and password.');
      });
  };

  const handleGoogleLogin = (res) => {
    setLoading(true);
    //console.log(res.googleId);
    //console.log(res.profileObj.givenName);
    let name = res.profileObj.givenName;
    let pass = res.googleId;
    name = 'teacher';
    pass = 'easypassword';
    let body = { identifier: name, password: pass };

    postUser(body)
      .then((response) => {
        setUserSession(response.data.jwt, JSON.stringify(response.data.user));
        setLoading(false);
        if (response.data.user.role.name === 'Content Creator') {
          navigate('/ccdashboard');
        } else if (response.data.user.role.name === 'Researcher') {
          navigate('/report');
        } else {
          navigate('/dashboard');
        }
      })
      .catch((error) => {
        setLoading(false);
        message.error('Google account does not exist, creating one for you. Please login again.'); //teacher creation happens here.
        //a request would need to be added to requests.js of type post that accepts a teacher's username & password,
        //and creates an account in the database, and the mentor model would need to be updated to contain the username and password
        //for support for teacher accounts to not be "manually" added in the strapi admin panel.
      });
  };

  const onSucc = (res) => {
    console.log(res);
    handleGoogleLogin(res);
  };
  
  const onFail = (res) => {
    console.log(res);
  };
  
  function Login() {
    return (
        <div id="signInButton">
          <GoogleLogin
            className="googleButton"
            clientID={CLIENT_ID}
            buttonText="Google Sign-up"
            onSuccess={onSucc}
            onFailure={onFail}
            cookiePolicy={'single_host_origin'}
            isSignedIn={false}
          />
        </div>
    )
  }

  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='content-wrapper'>
        <form
          id='box'
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleLogin();
          }}
        >
          <div id='box-title'>User Login</div>
          <input
            type='email'
            {...email}
            placeholder='Email'
            autoComplete='username'
          />
          <input
            type='password'
            {...password}
            placeholder='Password'
            autoComplete='current-password'
          />
          <p id='forgot-password' onClick={() => navigate('/forgot-password')}>
            Forgot Password?
          </p>
          <input
            type='button'
            value={loading ? 'Loading...' : 'Login'}
            onClick={handleLogin}
            disabled={loading}
          />
        </form>
        <Login/>
      </div>
    </div>
  );
}
