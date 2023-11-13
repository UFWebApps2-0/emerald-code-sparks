import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import PrivateRoute from './Utils/PrivateRoute';
import About from './views/About/About';
import HowItWorks from './views/HowItWorks/HowItWorks';
import FAQ from './views/FAQ/FAQ'
import OurTeam from './views/OurTeam/OurTeam';
import Gallery from './views/Gallery/Gallery';
import BlocklyPage from './views/BlocklyPage/BlocklyPage';
import BugReport from './views/BugReport/BugReport';
import ContentCreator from './views/ContentCreator/ContentCreator';
import Home from './views/Home/Home';
import Classroom from './views/Mentor/Classroom/Classroom';
import Dashboard from './views/Mentor/Dashboard/Dashboard';
import NotFound from './views/NotFound';
import Replay from './views/Replay/Replay';
import ActivityLevelReport from './views/Researcher/ActivityLevelReport';
import ActivityLevelReportView from './views/Researcher/ActivityLevelReportView';
import GroupReport from './views/Researcher/GroupReport';
import Report from './views/Researcher/Report';
import Student from './views/Student/Student';
import StudentLogin from './views/StudentLogin/StudentLogin';
import ForgetPassword from './views/TeacherLogin/ForgetPassword';
import ResetPassword from './views/TeacherLogin/ResetPassword';
import TeacherLogin from './views/TeacherLogin/TeacherLogin';
import {setHistory, getHistory} from './localStorageHelper';
import { useNavigate } from 'react-router-dom';



const App = () => {
  const currentLocation = useLocation();
  const navigate = useNavigate();
  const [isInitial, initializeFirst] = useState(true);
  useEffect(() => {
    //console.log("Effect 2 is running");
    const lastRoute = getHistory('lastVisited');
    //console.log("Last route from storage:", lastRoute);
    if(isInitial && lastRoute && lastRoute !== currentLocation.pathname){
      //console.log("Navigating to:", lastRoute);
      
      navigate(lastRoute, {replace: true});//load the last path
      
    }
    //else {
      //console.log("Not navigating.");
    //}console.log(navigate);
    initializeFirst(false);//run on first open!

  },[currentLocation.pathname]);
  useEffect(() => {//Note! Don't put this before effect 2 or state tracking fails
    //console.log("Effect 1 is running");
    //console.log('Setting lastVisited to', currentLocation.pathname);
    if(!isInitial){
      setHistory('lastVisited', currentLocation.pathname);//store path
    }
  },[currentLocation.pathname]);//render if oath change

  if(isInitial){
    //console.log("directed");
    return <div>Directing to where you left off...</div>;
  }//loading spinner in case loading time too long
  
  return (
    <div>
      <Routes>
        
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/how-it-works' element={<HowItWorks />} />
        <Route path='/faq' element={<FAQ />} />
        <Route path='our-team' element={<OurTeam />} />
        <Route path='/gallery' element={<Gallery />} />
        <Route path='/teacherlogin' element={<TeacherLogin />} />
        <Route path='/forgot-password' element={<ForgetPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/login' element={<StudentLogin />} />
        <Route path='/replay/:saveID' element={<Replay />} />
        <Route path='/sandbox' element={<BlocklyPage isSandbox={true} />} />
        <Route
          path='/report'
          element={
            <PrivateRoute>
              <Report />
            </PrivateRoute>
          }
        />
        <Route
          path='/activityLevel'
          element={
            <PrivateRoute>
              <ActivityLevelReport />
            </PrivateRoute>
          }
        />
        <Route
          path='/activityLevel/:id'
          element={
            <PrivateRoute>
              <ActivityLevelReportView />
            </PrivateRoute>
          }
        />
        <Route
          path='/group-report'
          element={
            <PrivateRoute>
              <GroupReport />
            </PrivateRoute>
          }
        />
        <Route
          path='/dashboard'
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path='/student'
          element={
            <PrivateRoute>
              <Student />
            </PrivateRoute>
          }
        />
        <Route
          path='/classroom/:id'
          element={
            <PrivateRoute>
              <Classroom />
            </PrivateRoute>
          }
        />
        <Route
          path='/workspace'
          element={
            <PrivateRoute>
              <BlocklyPage isSandbox={false} />
            </PrivateRoute>
          }
        />
        <Route
          path='/activity'
          element={
            <PrivateRoute>
              <BlocklyPage isSandbox={false} />
            </PrivateRoute>
          }
        />
        <Route
          path='/ccdashboard'
          element={
            <PrivateRoute>
              <ContentCreator />
            </PrivateRoute>
          }
        />
        <Route path='/bugreport' element={<BugReport />} />
        <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
  );
};

export default App;
