import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Modal, Button, Tag, Form, Input } from 'antd';
import './CreateStudyPage.less';
import NavBar from '../../components/NavBar/NavBar';
//import FormItem from 'antd/es/form/FormItem';
import { sendEmail } from '../../Utils/requests';

const CreateStudyPage =()=>{
  const [checkboxValues, setCheckboxValues] = useState({});

  const handleCheckboxChange = (checkboxId) => (e) => {
    setCheckboxValues((prevValues) => ({
      ...prevValues,
      [checkboxId]: e.target.checked,
    }));
  };

  const navigate = useNavigate();
  const [studyForm] = Form.useForm();
  const [checkboxForm] = Form.useForm();
  const [searchBarForm] = Form.useForm();

  //add submit button
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSubmitStudy = () => {
    // Get study form values
    const studyValues = studyForm.getFieldsValue();

    // Use the updated checkboxValues state
    const values = {
      ...studyValues,
      checkboxes: checkboxValues,
      searchBar: searchBarForm.getFieldsValue(),
    };

    console.log(values);
    setIsModalVisible(false);

    // Adjust the email template creation according to your form field names
    const emailTemplate = {
      name: values['Study name'],
      studyID: values['Study ID'],
      description: values['Study description'],
      studentEmail: values['Student Email'],
      checkboxes: values.checkboxes,
      searchBar: values.searchBar,
    };

    sendEmail(emailTemplate); //send email to student 

  
  }
  const handleCancel = () => {

    setIsModalVisible(false);
  }

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
      <Form form={studyForm} id={"study-form"}>
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
          name = "Study ID"
          label="ID"
          rules={[
            {
              required: true,
              message: 'Please enter ID of study',
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
            <Form.Item
            name="Student Email"
            label="Student Email"
            rules={[
              {
                required: true,
                message: 'Please enter student email',
              },
            ]}>
              <Input/>
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
        <Form form={checkboxForm} id={"checkbox-form"}>
          <Form.Item className="checkbox-item">
            <input type="checkbox" id="checkbox-1" onChange={handleCheckboxChange("Profile Info")} />
            <label htmlFor="checkbox-1" className="checkbox-label">Profile Info</label>
          </Form.Item>
          <Form.Item className="checkbox-item">
            <input type="checkbox" id="checkbox-2" onChange={handleCheckboxChange("Access to Code Samples")}/>
            <label htmlFor="checkbox-2" className="checkbox-label">Access to Code Samples</label>
          </Form.Item>
          <Form.Item className="checkbox-item">
            <input type="checkbox" id="checkbox-3" onChange={handleCheckboxChange("Messaging and Emails")}/>
            <label htmlFor="checkbox-3" className="checkbox-label">Messaging and Emails</label>
          </Form.Item>
          <Form.Item className="checkbox-item">
            <input type="checkbox" id="checkbox-4" onChange={handleCheckboxChange("Access to Video/Lesson Usage")}/>
            <label htmlFor="checkbox-4" className="checkbox-label">Access to Video/Lesson Usage</label>
          </Form.Item>
          <Form.Item className="checkbox-item">
            <input type="checkbox" id="checkbox-5" onChange={handleCheckboxChange("Screen Recording")}/>
            <label htmlFor="checkbox-5" className="checkbox-label">Screen Recording</label>
          </Form.Item>
        </Form>
        <Form form={searchBarForm} id={"search-bar-form"}>
          <Form.Item>
            <input
            className='search-bar'
            placeholder='Search for a Student'
            />
          </Form.Item>
          <Form.Item>
            <input
            className='search-bar'
            placeholder='Search for a Tags'
            />
          </Form.Item>
          <Button className='add-researcher-button' onClick={showModal}>
              Submit Study Request 
          </Button>
          <Modal title="Submit Study Request" visible={isModalVisible} onOk={handleSubmitStudy} onCancel={handleCancel}>
            <p>Are you sure you want to submit this study request?</p>
          </Modal>
        </Form>
        
        
        
      </div>
    </div>
    
  )

};

export default CreateStudyPage;