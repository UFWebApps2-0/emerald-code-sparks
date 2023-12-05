import { Modal, Button } from 'antd';
import React, { useState } from 'react';
import { Form, message } from 'antd';
import {
  deleteStudent,
  addStudent,
  getMentor,
  getClassrooms,
} from '../../../../Utils/requests';

export default function MoveStudent({ linkBtn, student, handleDelete/*, classIds*/}) {
  const [visible, setVisible] = useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const [studentData, setStudentData] = useState([]);
  let classIds = [];
  let classIdsSet = false;
  


  //retrieves information on what classes are available as destinations for the student
  const setClassIds = () => {
    if(!classIdsSet){
      //alert("Setting class ids...");
      classIds = [];
      getMentor().then((res) => {
        if (res.data) {
          res.data.classrooms.forEach((classroom) => {
            classIds.push(classroom.id);
          });
          getClassrooms(classIds).then((classrooms) => {
            setClassrooms(classrooms);
          });
        }
      });
      classIdsSet = true;
    }
    
  };

  
  //display move box
  const showModal = () => {
    setVisible(true);
    setClassIds();
  };

  //cancel moving
  //closes the modal
  const handleCancel = () => {
    setVisible(false);
  };

  //this function will move a student from the current class to the class specified in the argument "newClass"
  const handleMoveStudent = async(newClass) => {
    //const oldStudent = studentData
    
    //alert("moving student");

    //remove student from old classroom
    localDeleteStudent(student.key);

    const newStudent = await addStudent(
      student.name, student.character, newClass
    )

    //add student to new classroom
    addStudentsToTable1([newStudent.data]);



    message.success("Refresh page to view changes.");
  }

  //delete a student before moving the student
  //will be called by handleMoveStudent
  const localDeleteStudent = async (key) => {
    const dataSource = [...studentData];
    setStudentData(dataSource.filter((item) => item.key !== key));

    const res = await deleteStudent(key);
  };


  const addStudentsToTable1 = (students) => {
    let newStudentData = [...studentData];
    students.forEach((student) =>
      newStudentData.push({
        key: student.id,
        name: student.name,
        character: student.character,
        enrolled: {
          id: student.id,
          enrolled: student.enrolled,
        },
        last_logged_in: student.last_logged_in,
      })
    );
    setStudentData(newStudentData);
  };



  return (
    <div>
      <button id={linkBtn ? 'link-btn' : null} onClick={showModal}>
        Move
      </button>
      <Modal
        // title={student.name}
        visible={visible}
        onCancel={handleCancel}
        footer={[
          <Button key='ok' type='primary' onClick={handleCancel}>
            Cancel Move
          </Button>,
        ]}
      >
        <div id='modal-student-card-header'>
          <p id='animal'>{student.character}</p>
          <h1 id='student-card-title'>{"Move " + student.name + " to another class"}</h1>
        </div>
        <div id='description-container'>
              <p id='label'>Current class:</p>
              <p id='label-info'> {"NAME OF CLASSROOM"}</p>
              <br></br>
        </div>
        <div id='description-container'>
          <p id='label'>Status:</p>
          <p id='label-info'>
            {student.enrolled.enrolled ? 'Enrolled' : 'Unenrolled'}
          </p>
        </div>
        <div>
          <div id='modal-card-content-container'>
              <p id='label'>Choose destination classroom:</p>
              {}
              





              <select
                  id="classroom-dropdown-selector-id"
                  name="classroom-dropdown-selector-name"
                  onChange={e => handleMoveStudent(e.target.value)}
                  defaultValue={"noChange"}
                  required
              >    
                <option key={0} value={"noChange"} id="disabled-option" disabled>
                
                </option>         
                {classrooms.map((class_) => (
                <option key={class_.id} value={class_.id}>
                    {class_.name}
                </option>
                ))}
              </select>






          </div>
          <div id='modal-card-content-container'>
            
          </div>
        </div>
      </Modal>
    </div>
  );
}
