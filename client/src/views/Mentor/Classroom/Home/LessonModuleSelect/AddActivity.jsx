import React, { useState } from 'react';
import { Modal, Button, message } from 'antd';
import { createActivity } from '../../../../../Utils/requests';
import ActivityComponentTags from "../../../../ContentCreator/ActivityEditor/components/ActivityComponentTags";
import './AddActivity.css';

//on cancel clear forms
const resetFormFields = (
    setActivityName,
    setDescription,
    setStandards,
    setTable,
    setClassroomMaterials,
    setStudentMaterials,
    setArduinoComponents
  ) => {
    setActivityName('');
    setDescription('');
    setStandards('');
    setTable('');
    setClassroomMaterials([]);
    setStudentMaterials([]);
    setArduinoComponents([]);
  };

  //all the fields of an activity
const AddActivity = ({ visible, onCancel, setUpdatedActivities }) => {
  const [activityName, setActivityName] = useState('');
  const [descriptionName, setDescription] = useState('');
  const [standardsName, setStandards] = useState('');
  const [tableName, setTable] = useState('');
  const [classroomMaterialsTag, setClassroomMaterials] = useState([]);
  const [studentMaterialsTag, setStudentMaterials] = useState([]);
  const [arduinoComponentsTag, setArduinoComponents] = useState([]);
  //add more if needed

  const handleOk = async () => {
    // Check if required fields are filled
    if (!activityName) {
      message.error('Please enter an activity name');
      return;
    }
    // Call the API to create a new activity
    const res = await createActivity({
      name: activityName,
      description: descriptionName,
      standards: standardsName,
      tablechart: tableName,
      ClassroomMaterials: classroomMaterialsTag,
      studentMaterials: studentMaterialsTag,
      arduinoComponents: arduinoComponentsTag,
    });

    if (res.data) { //successful creation
      message.success(`Activity '${activityName}' created successfully`);
      setUpdatedActivities(true);
      onCancel();
      resetFormFields(
        setActivityName,
        setDescription,
        setStandards,
        setTable,
        setClassroomMaterials,
        setStudentMaterials,
        setArduinoComponents
      );
    } else {
      message.error(`Failed to create activity: ${res.err}`);
    }
  };
  

  return (
    <Modal
      title="Enter Activity Info"
      visible={visible}
      onCancel={ () => {onCancel(); 
        resetFormFields(
            setActivityName,
            setDescription,
            setStandards,
            setTable,
            setClassroomMaterials,
            setStudentMaterials,
            setArduinoComponents
      );}}
      footer={[
        <Button key="cancel" onClick={() => {onCancel(); 
        resetFormFields(
            setActivityName,
            setDescription,
            setStandards,
            setTable,
            setClassroomMaterials,
            setStudentMaterials,
            setArduinoComponents
        );}}>
          Cancel
        </Button>,
        <Button key="ok" type="primary" onClick={handleOk}>
          Create Activity
        </Button>,
      ]}
    >
      <div className="form-container">
        <p>Enter Activity Name:</p>
        <input
          type="text"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
          className="form-input"
        />
      </div>
      <div className="form-container">
        <p>Enter Description:</p>
        <textarea
          value={descriptionName}
          onChange={(e) => setDescription(e.target.value)}
          className="form-textarea"
        />
      </div>
      <div className="form-container">
    <p>Classroom Materials:</p>
    <ActivityComponentTags
      components={classroomMaterialsTag}
      setComponents={setClassroomMaterials}
      colorOffset={0}
    />
  </div>

  <div className="form-container">
    <p style= {{marginTop: '20px'}}>Student Materials:</p>
    <ActivityComponentTags
      components={studentMaterialsTag}
      setComponents={setStudentMaterials}
      colorOffset={3}
    />
  </div>

  <div className="form-container">
    <p style= {{marginTop: '20px'}}>Arduino Components:</p>
    <ActivityComponentTags
      components={arduinoComponentsTag}
      setComponents={setArduinoComponents}
      colorOffset={6}
    />
  </div>
      {/* Add more input fields for other parameters */}
    </Modal>
  );
};

export default AddActivity;
