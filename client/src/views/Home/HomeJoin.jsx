import React, { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import './Home.less';
import { getStudents, postJoin, addStudents, getAllClassrooms } from '../../Utils/requests';
import { setUserSession } from '../../Utils/AuthRequests';
import {GoogleLogin} from 'react-google-login';
import {gapi} from 'gapi-script';

const CLIENT_ID = "296846904571-jiau68kb1m5ovbjodmho8ei6fe69qbkv.apps.googleusercontent.com";
const API_KEY = "AIzaSyBH4GlSHNm7zUcrcINb-uKI82l36vbD4jA";
const SCOPES = "https://www.googleapis.com/auth/drive";

export default function HomeJoin(props) {
  const [loading, setLoading] = useState(false);
  const [joinCode, setJoinCode] = useState('');
  const [studentList, setStudentList] = useState([]);
  const [classroomList, setClassroomList] = useState([]);
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

  useEffect(() => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES
      })
    };
  
    gapi.load('client:auth2', start);
  });

  useEffect(() => {
    getStudents(2017).then((res) => { //hard coded for now, this is used to get the list of students.
      if (res.data) {
        setStudentList(res.data);
      } else {
        message.error(res.err);
      }
    });
  }, [joinCode]);

  useEffect(() => {
    getAllClassrooms().then((res) => {
      if(res.data) {
        setClassroomList(res.data);
      } else {
        message.error(res.err);
      }
    });
  }, [joinCode]);

  const handleStudentGoogleLogin = async (acct) => {
    setLoading(true);
    let ids = [];
    //console.log(acct.googleId);
    let name = acct.profileObj.givenName;
    let joinCode = '1997';
    //console.log(ids);
    let res = null;

    for(let i = 0; i < studentList.length; i++)
    {
      console.log(studentList[i].name + ' ' + name);
      if(name === studentList[i].name)
      {
        ids[0] = studentList[i].id;
        console.log(joinCode + ' ' + ids);
        
        res = await postJoin(joinCode, ids).catch((error) => {
          res = null;
        });
      }
    }

    console.log(res);

    if (res === null || res.data === null)
    {
      setLoading(false);
      message.error('Google account does not exist, creating one for you. Please login again.'); //student creation happens here

      let tempStudent = null;
      //console.log(studentList[0]);
      tempStudent = studentList[0];
      tempStudent.name = name;
      tempStudent.id = acct.googleId;
      tempStudent.character = null;
      console.log(tempStudent);

      let classroom = null;
      let classroomId = 8;
      for(let j = 0; j < classroomList.length; j++)
      {
        //console.log(classroomList[j].code);
        //console.log(joinCode);

        if(joinCode === classroomList[j].code)
        {
          console.log(classroomList[j]);
          //console.log(classroomList[j].id);
          //console.log(classroomId);
          classroom = classroomList[j];
          //classroomId = classroomList[j].id;
        }
      }
      tempStudent.classroom = classroom;
      let students = [];
      students[0] = tempStudent;
      //students[1] = tempStudent;
      console.log(students);

      const newstudent = await addStudents(students, classroomId);
      console.log(newstudent);
    }
    else if (res.data) {
      setLoading(false);
      setUserSession(res.data.jwt, JSON.stringify(res.data.students));
      navigate('/student');
    }
    else {
      setLoading(false);
      message.error('Error. Please try again.');
    }
  };
  
  const onSucc = (res) => {
    console.log(res);
    handleStudentGoogleLogin(res);
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
    <div>
      <div
        id='box'
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleLogin();
        }}
      >
        <input
          type='text'
          value={joinCode}
          placeholder='Join Code'
          onChange={(e) => setJoinCode(e.target.value)}
        />
        <input
          type='button'
          value={loading ? 'Loading...' : 'Join'}
          onClick={handleLogin}
          disabled={loading}
        />
      </div>
      <Login/>
    </div>
  );
}
