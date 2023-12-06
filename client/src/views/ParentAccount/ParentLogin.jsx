import { message } from 'antd';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { studentMe } from '../../Utils/requests';
import './ParentLogin.less';

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

export default function ParentLogin() {
  const password = useFormInput('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try{
      const res = await studentMe();
      setLoading(false);
      if(res.data.students[0].parent_key){
        if(res.data.students[0].parent_key == password.value){
          navigate('/restrict-access');
        }else{
          message.error('Login failed. Password is incorrect.');
        }
      }else{
        message.error('Something went wrong.')
      }
    } catch(error){
      setLoading(false);
      message.error('Login failed. Please input a valid password.');
    }
    
  };

  return (
    <div className='container nav-padding'>
      <NavBar />
      <div id='content-wrapper'>
        <form
          id='box'
          onKeyPress={(e) => {
            if (e.key === 'Enter'){ 
              e.preventDefault();
              handleLogin();
            }
          }}
        >
          <div id='box-title'>Parental Controls</div>
          <input
            type='password'
            {...password}
            placeholder='Password'
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
      </div>
    </div>
  );
}
