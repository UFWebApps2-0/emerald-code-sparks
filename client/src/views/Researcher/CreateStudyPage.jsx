import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Modal, Button, Tag, Form, Input, Select } from 'antd';
import './CreateStudyPage.less';
import NavBar from '../../components/NavBar/NavBar';
//import FormItem from 'antd/es/form/FormItem';
import { sendEmail, getAllStudents, getStudies, getResearchers, addStudy, getStudent, getAllClassrooms, getClassroom} from '../../Utils/requests';

const { Option } = Select;

const CreateStudyPage =()=>{
  const [students, setStudents] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [selectedStudentsData, setSelectedStudentsData] = useState([]);
  const [selectedClassroomsData, setSelectedClassroomsData] = useState([]);
  const [checkboxValues, setCheckboxValues] = useState({});
  const [selectedStudyTag, setSelectedStudyTag] = useState(null);

  const handleStudentChange = async (selectedValues) => {
    //console.log(selectedValues);
    const studentsData = [];
    for (const studentID of selectedValues) {
      const student = await getStudent(studentID);
      studentsData.push(student.data);
    }
    setSelectedStudentsData(studentsData);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsRes = await getAllStudents();
        if (studentsRes.error) {
          console.error('Failed to retrieve students');
        } else {
          console.log(studentsRes.data);
          setStudents(studentsRes.data);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };
    fetchData();
  }, []);

  const handleClassroomChange = async (selectedValues) => {
    //console.log(selectedValues);
    const classroomData = [];
    for (const classroomID of selectedValues) {
      const classroom = await getClassroom(classroomID);
      classroomData.push(classroom.data);
    }
    setSelectedClassroomsData(classroomData);

  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const classroomsRes = await getAllClassrooms();
        if (classroomsRes.error) {
          console.error('Failed to retrieve classrooms');
        } else {
          console.log(classroomsRes.data);
          setClassrooms(classroomsRes.data);
        }
      } catch (error) {
        console.error('Error fetching classrooms:', error);
      }
    };
    fetchData();
  }, []);



  const studyTagsDefault = ["qualitative", "quantitative", "design", "TBD"];

  const [researchers, setResearchers] = useState([]);
  useEffect(() => {
    const fetchResearchers = async () => {
      console.log('Fetching researchers');
      try {
        const researchersRes = await getResearchers();
        if (researchersRes.error) {
          console.error('Failed to retrieve researchers');
        } else {
          console.log(researchersRes.data);
          //send email to researcher
          setResearchers(researchersRes.data);
        }
      } catch (error) {
        console.error('Error fetching researchers:', error);
      }
    };
    fetchResearchers();
  }, []);

    
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
    /*
      NewStudy{
        studyID	integer
        studyDescription	string
        students	[string]
        classrooms	[string]
        researchers	[string]
        studyName	string
        studyTag	string
        Enum:
        [ qualitative, quantitative ]
        consentOptions	string
        Enum:
        [ profile, code_samples, emails_messages, video_lesson_usage, screen_recording ]
        published_at	string($date-time)
        created_by	string
        updated_by	string
      }
    */
    
    // Get study form values
    const studyValues = studyForm.getFieldsValue();
    //sanitize data
    studyValues['Study name'] = studyValues['Study name'].replace(/[^a-zA-Z0-9 ]/g, "");
    studyValues['Study ID'] = studyValues['Study ID'].replace(/[^a-zA-Z0-9 ]/g, "");
    studyValues['Study description'] = studyValues['Study description'].replace(/[^a-zA-Z0-9 ]/g, "");
    //keep @ and . for email
    //studyValues['Student Email'] = studyValues['Student Email'].replace(/[^a-zA-Z0-9@. ]/g, "");
    console.log(studyValues);

    // Use the updated checkboxValues state
    const values = {
      ...studyValues,
      checkboxes: checkboxValues,
      selectedStudentsData: selectedStudentsData,
      newResearchers: researchers,
      selectTags: selectedStudyTag.toString(),
    };

    console.log(values);
    setIsModalVisible(false);


    // Adjust the email template creation according to your form field names
    const emailTemplate = {
      name: values['Study name'],
      studyID: values['Study ID'],
      description: values['Study description'],
      //studentEmail: values['Student Email'],
      checkboxes: values.checkboxes,
      searchBar: values.searchBar,
    };
    const consentOptionsReformat = {};
    for (const [key, value] of Object.entries(values.checkboxes)) {
      if (value) {
        consentOptionsReformat[key] = true;
      }
    }

     console.log(consentOptionsReformat);

    if (!values.newTag) {
      values.newTag = [];
      values.newTag.push("");
    }

    const studyData = {
      studyID: values['Study ID'],
      studyDescription: values['Study description'],
      students: values.selectedStudentsData,
      classrooms: [],
      researchers: values.newResearchers,
      studyName: values['Study name'],
      studyTag: values.selectTags,
      consentOptions: consentOptionsReformat,
    }
    console.log(studyData);

    //post study to database
    addStudy(studyData);
    //send email to all added researchers
    console.log(values.newResearchers);
    for (const researcher of values.newResearchers) {
      const emailTemplate = {
        name: researcher.first_name + ' ' + researcher.last_name,
        email: researcher.researcherEmail,
        studyID: values['Study ID'],
      }
      sendEmail(emailTemplate);
    } 
    studyForm.resetFields();
    checkboxForm.resetFields();
    searchBarForm.resetFields();
    setIsModalVisible(false);
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
            <Form.Item>
            <Select
              className='select'
              placeholder='Select a Study Tag'
              value={selectedStudyTag}
              onChange={(value) => setSelectedStudyTag(value)}
              allowClear
            >
              {
                studyTagsDefault.map((tag) => (
                  <Select.Option key={tag} value={tag}>
                    {tag}
                  </Select.Option>
                ))
              }
            </Select>
          </Form.Item>
          <Form.Item>
            <Select
              mode='multiple'
              className='select'
              placeholder='Select a Researcher'
              allowClear
            >
              {researchers.map((researcher) => (
                <Select.Option key={researcher.id} value={researcher.id}>
                  {researcher.first_name} {researcher.last_name}
                </Select.Option>
              ))}
            </Select>
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
        <Select
            mode="multiple"
            placeholder="Search for a Student"
            onChange={handleStudentChange}
            value={selectedStudentsData.map(student => student.id)}  // Use selectedStudentsData
            className="search-bar"
          >
            {students.map(student => (
              <Option key={student.id} value={student.id}>
                {student.name}
              </Option>
            ))}
          </Select>
          <Select
            mode="multiple"
            placeholder="Search for a Classroom"
            onChange={handleClassroomChange}
            value={selectedClassroomsData.map(classroom => classroom.id)}  // Use selectedStudentsData
            className="search-bar"
          >
            {classrooms.map(classroom => (
              <Option key={classroom.id} value={classroom.id}>
                {classroom.name}
              </Option>
            ))}
          </Select>
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