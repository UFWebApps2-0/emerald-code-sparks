import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { getStudents } from '../../Utils/requests';

export default function HomeJoin(props) {
  const [loading, setLoading] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const navigate = useNavigate();
  const handleLogin = () => {
    setLoading(true);

    getStudents(joinCode).then((res) => {
      if (res.data) {
        setLoading(false);
        localStorage.setItem('join-code', joinCode);
        navigate('/login');
      } else {
        setLoading(false);
        message.error('Join failed. Please input a valid join code.');
      }
    });
  };

  return (
    <div
      id='box'
      onKeyPress={(e) => {
        if (e.key === 'Enter') handleLogin();
      }}
    >
      <h2 className='login-text'>STUDENT</h2>
      <input
        type='text'
        value={joinCode}
        placeholder='Join Code'
        onChange={(e) => setJoinCode(e.target.value)}
      />
      <input
        type='button'
        className='join-button'
        value={loading ? 'LOADING...' : 'JOIN'}
        onClick={handleLogin}
        disabled={loading}
      />
    </div>
  );
}
