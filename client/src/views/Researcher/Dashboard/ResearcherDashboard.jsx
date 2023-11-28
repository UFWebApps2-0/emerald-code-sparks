
/*
[Your Studies] --> list of study objects in grid UI
    [each study] --> description
    [each study] --> button to view study/ view report 
    [each study] --> tag

[Create Study] --> button to create a new study TODO
[Search tag] --> search bar to search for studies by tag TODO

*/
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Modal, Button, Tag, Form, Input } from 'antd';
import './ResearcherDashboard.less';
//import FormItem from 'antd/es/form/FormItem';

const ResearcherDashboard =()=>{
  const navigate = useNavigate();
  const [form] = Form.useForm();

  return (
    <div className='container nav-padding'>
      <div id='main-header'>Welcome Researcher!</div>
      <Button>
        <Link to='/researcher/report'>
            Researcher Dashboard
        </Link>
      </Button>
      
      <Button>
        <Link to='/createstudy'>Create Study</Link>
      </Button>

    </div>
  )

};

export default ResearcherDashboard;