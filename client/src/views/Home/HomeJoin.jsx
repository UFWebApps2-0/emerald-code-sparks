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

  //connect to google API
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

  //get a list of all students in a classroom according to the join code
  useEffect(() => {
    getStudents(joinCode).then((res) => {
      if (res.data) {
        setStudentList(res.data);
      } else {
        message.error(res.err);
      }
    });
  }, [joinCode]);

  //get all classrooms, so we can return the one the join code is for
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
    let name = acct.profileObj.givenName; //get the google profile's name to search the classroom for it
    //console.log(ids);
    let res = null;


    //if the name is found, return the corresponding id, then log in.
    for(let i = 0; i < studentList.length; i++)
    {
      //console.log(studentList[i].name + ' ' + name);
      if(name === studentList[i].name)
      {
        ids[0] = studentList[i].id;
        //console.log(joinCode + ' ' + ids);
        
        //attempt to log the user in, otherwise return a null value
        res = await postJoin(joinCode, ids).catch((error) => {
          res = null;
        });
      }
    }
    //console.log(res);

    //handle if a new account should be made if null
    if (res === null || res.data === null)
    {
      setLoading(false);
      message.error('Google account does not exist, creating one for you. Please login again.'); //student creation happens here

      //create a temporary student object, based off the first item in the student list to get the formatting correct.
      //then, edit the values to create an account based off the google account
      let tempStudent = null;
      //console.log(studentList[0]);
      tempStudent = studentList[0];
      tempStudent.name = name;
      tempStudent.id = acct.googleId;
      tempStudent.character = null;
      console.log(tempStudent);

      //get the classroom and id
      let classroom = null;
      let classroomId = null;
      for(let j = 0; j < classroomList.length; j++)
      {
        //console.log(classroomList[j].code);
        //console.log(joinCode);

        if(joinCode === classroomList[j].code) //if found, set the classroom & id
        {
          classroom = classroomList[j];
          classroomId = classroomList[j].id;
        }
      }
      tempStudent.classroom = classroom;//set the classroom in the student object
      let students = [];                //create an array to pass the student into the addStudents function
      students[0] = tempStudent;        //which posts the student to the server.
      //console.log(students);

      const newstudent = await addStudents(students, classroomId);
      console.log(newstudent);          //output the new student object to the console to confirm it was created correctly.
    }
    else if (res.data) { //otherwise, login to the session
      setLoading(false);
      setUserSession(res.data.jwt, JSON.stringify(res.data.students));
      navigate('/student');
    }
    else { //should not error, but just in case handle it
      setLoading(false);
      message.error('Error. Please try again.');
    }
  };
  
  const onSucc = (res) => {
    console.log(res); //if google auth was successful, login
    handleStudentGoogleLogin(res);
  };
  
  const onFail = (res) => {
    console.log(res); //if not successful, do nothing
  };
  
  //login component to be returned to the website
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
