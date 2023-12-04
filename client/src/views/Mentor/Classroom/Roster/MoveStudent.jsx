import { Modal, Button } from 'antd';
import React, { useState } from 'react';

export default function MoveStudent({ linkBtn, student, getFormattedDate }) {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  //const handleCancel = () => {
  //  setVisible(false);
  //};

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
            <p id='other-class-name'>{"NAME OF OTHER CLASSROOM"}</p>
          </div>
          <div id='modal-card-content-container'>
            
          </div>
        </div>
      </Modal>
    </div>
  );
}
