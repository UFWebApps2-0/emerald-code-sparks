import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Modal, Button, Tag, Form, Input } from 'antd';
import './CreateStudyPage.less';
import NavBar from '../../components/NavBar/NavBar';
//import FormItem from 'antd/es/form/FormItem';

const CreateStudyPage =()=>{
  const navigate = useNavigate();
  const [form] = Form.useForm();

  return (
    <div className='container nav-padding'>
      <NavBar/>
      <div className='menu-bar'>
        <div id='create-study-header'>Create New study</div>

        <button
          className='activity-level-return'
          onClick={() => navigate('/report')}
        >
          Return to Dashboard
        </button>
      </div>

      <div id='button-container'>
        <Form form={form} id={"study-form"} /* style={{ maxWidth: '600px', margin: 'auto' }} */>
          <h1 id="new-study-header">Study Information</h1>
          <Form.Item
          name="Study name"
          label="Name"
          rules={[
            {
              required: true,
              message: 'Please enter name of study',
            },
          ]}> 
            <Input/>
          </Form.Item>
          <Form.Item
          name="Study description"
          label="Description">
            <textarea
            style={{ maxHeight: '100px', resize: 'vertical', width: '100%'}}>

            </textarea>
            
          </Form.Item>
          <Form.Item>
            <select
            className='select'
            placeholder='Select a Tag'>
              <option>
                Select a Study Tag
              </option>

            </select>
          </Form.Item>
          <Form.Item>
            <select
            className='select'
            placeholder='Researchers'>
              <option>
                Pick Researchers
              </option>

            </select>
          </Form.Item>

        </Form>
        <Form form = {form} id={"checkbox-form"}>
          <Form.Item className="checkbox-item">
            <input type="checkbox" id="checkbox-1" />
            <label htmlFor="checkbox-1" className="checkbox-label">Profile Info</label>
          </Form.Item>
          <Form.Item className="checkbox-item">
            <input type="checkbox" id="checkbox-2" />
            <label htmlFor="checkbox-2" className="checkbox-label">Access to Code Samples</label>
          </Form.Item>
          <Form.Item className="checkbox-item">
            <input type="checkbox" id="checkbox-2" />
            <label htmlFor="checkbox-2" className="checkbox-label">Messaging and Emails</label>
          </Form.Item>
          <Form.Item className="checkbox-item">
            <input type="checkbox" id="checkbox-2" />
            <label htmlFor="checkbox-2" className="checkbox-label">Access to Video/Lesson Usage</label>
          </Form.Item>
          <Form.Item className="checkbox-item">
            <input type="checkbox" id="checkbox-2" />
            <label htmlFor="checkbox-2" className="checkbox-label">Screen Recording</label>
          </Form.Item>
        </Form>
      </div>
    </div>
    
  )

};

export default CreateStudyPage;