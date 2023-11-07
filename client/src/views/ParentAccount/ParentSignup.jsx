import { message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar'; 
import './Parent.less'; 

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

export default function ParentSignup() {
  const name = useFormInput('');
  const email = useFormInput('');
  const password = useFormInput('');
  const confirmPassword = useFormInput('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = () => {
    //TODO: Handle backend to allow parent account signup
  };

  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='content-wrapper'>
        <form
          id='box'
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSignup();
          }}
        >
          <div id='box-title'>Create Parent Account</div>
          <input
            type='text'
            {...name}
            placeholder='Full Name'
            autoComplete='name'
          />
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
            autoComplete='new-password'
          />
          <input
            type='password'
            {...confirmPassword}
            placeholder='Confirm Password'
            autoComplete='new-password'
          />
          <input
            type='button'
            value={loading ? 'Creating Account...' : 'Create Account'}
            onClick={handleSignup}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
}
