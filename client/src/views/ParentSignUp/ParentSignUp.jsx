import { message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { postUser, setUserSession } from '../../Utils/AuthRequests';
import './ParentSignUp.less';


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


export default function ParentSignUp() {
    const email = useFormInput('');
    const password = useFormInput('');
    const rewritePassword = useFormInput('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const handleSignUp = () => {
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
          message.error('Sign Up failed. Please input a valid email and password.');
        });
    };

    return (
        <div className='container nav-padding'>
          <NavBar />
          <div id='content-wrapper'>
            <form
              id='box'
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSignUp();
              }}
            >
              <div id='box-title'>Parental Controls</div>
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

              <input
                type='password'
                {...password}
                placeHolder='Rewrite Password'
                autoComplete='current-password'
              />

              <input
                type='button'
                value={loading ? 'Loading...' : 'Sign Up'}
                onClick={handleSignUp}
                disabled={loading}
              />
            </form>
          </div>
        </div>
      );

}