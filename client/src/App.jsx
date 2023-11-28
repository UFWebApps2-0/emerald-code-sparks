import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './Utils/PrivateRoute';
import About from './views/About/About';
import BlocklyPage from './views/BlocklyPage/BlocklyPage';
import BugReport from './views/BugReport/BugReport';
import ContentCreator from './views/ContentCreator/ContentCreator';
import Home from './views/Home/Home';
import Classroom from './views/Mentor/Classroom/Classroom';
import Dashboard from './views/Mentor/Dashboard/Dashboard';
import NotFound from './views/NotFound';
import Replay from './views/Replay/Replay';
import AppLayout from "./AppLayout"
import ResearcherLayout from './views/Researcher/ResearcherLayout';
import ResearcherDashboard from './views/Researcher/Dashboard/ResearcherDashboard';
import ActivityLevelReport from './views/Researcher/Common/ActivityLevelReport';
import ActivityLevelReportView from './views/Researcher/Common/ActivityLevelReportView';
import GroupReport from './views/Researcher/Common/GroupReport';
import Report from './views/Researcher/Report';
import Student from './views/Student/Student';
import StudentLogin from './views/StudentLogin/StudentLogin';
import ForgetPassword from './views/TeacherLogin/ForgetPassword';
import ResetPassword from './views/TeacherLogin/ResetPassword';
import TeacherLogin from './views/TeacherLogin/TeacherLogin';
import StudyLevelReportView from './views/Researcher/StudyLevelReportView';
import StudyLevelReport from './views/Researcher/StudyLevelReport';
import CreateStudyPage from './views/Researcher/CreateStudyPage';

const App = () => {
  return (<>
    <Routes>
      <Route path='/' element={<AppLayout/>}>
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='teacherlogin' element={<TeacherLogin/>} />
        <Route path='forgot-password' element={<ForgetPassword />} />
        <Route path='reset-password' element={<ResetPassword />} />
        <Route path='login' element={<StudentLogin />} />
        <Route path='replay/:saveID' element={<Replay />} />
        <Route path='sandbox' element={<BlocklyPage isSandbox={true} />} />
        <Route path='dashboard' element={ <PrivateRoute> <Dashboard /> </PrivateRoute> }/>
        <Route path='student' element={ <PrivateRoute> <Student /> </PrivateRoute> }/>
        <Route path='workspace' element={ <PrivateRoute> <BlocklyPage isSandbox={false} /> </PrivateRoute> }/>
        <Route path='activity' element={ <PrivateRoute> <BlocklyPage isSandbox={false} /> </PrivateRoute> }/>
        <Route path='ccdashboard' element={ <PrivateRoute> <ContentCreator /> </PrivateRoute> }/>
        <Route path='bugreport' element={<BugReport />} />
      </Route>
      {/* Researcher Layout / Nested Navbar */}
      {/* Routes beneath here will render their elements into the ResearcherLayout component allowing a nested navbar */}
      <Route path='/researcher/' element={<PrivateRoute><ResearcherLayout/></PrivateRoute>}>
        <Route index element={<ResearcherDashboard/>}/>
        <Route path='report' element={<Report />}/>
        <Route path='createStudyPage' element={<CreateStudyPage/>}/>
        <Route path='studyLevel' element={<StudyLevelReport />}/>
        <Route path='studyLevel/:id' element={<StudyLevelReportView />}/>
        <Route path='activityLevel' element={<ActivityLevelReport />}/>
        <Route path='activityLevel/:id' element={<ActivityLevelReportView/>}/>
        <Route path='group-report' element={<GroupReport />}/>
      </Route>
      {/* mentor navbar variant */}
      {/* TODO: Add mentor navbar variant */}
      <Route path='/classroom/:id' element={ <PrivateRoute> <Classroom handleLogout={undefined} selectedActivity={undefined} setSelectedActivity={undefined}/> </PrivateRoute> }/>
      {/* No Navbar */}
      <Route path='*' element={<NotFound/>} />
    </Routes>
  </>);
};

export default App;
