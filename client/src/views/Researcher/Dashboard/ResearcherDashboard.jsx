
/*
[Your Studies] --> list of study objects in grid UI
    [each study] --> description
    [each study] --> button to view study/ view report 
    [each study] --> tag

[Create Study] --> button to create a new study TODO
[Search tag] --> search bar to search for studies by tag TODO

*/
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import './ResearcherDashboard.less';
//import FormItem from 'antd/es/form/FormItem';

const ResearcherDashboard =()=>{
  return (
    <div className='container nav-padding'>
      <div id='main-header'>Welcome Researcher!</div>
      <Button>
        <Link to='/researcher/report'>
            Researcher Dashboard
        </Link>
      </Button>
      
      <Button>
        <Link to='/researcher/createStudyPage'>Create Study</Link>
      </Button>

    </div>
  )

};

export default ResearcherDashboard;