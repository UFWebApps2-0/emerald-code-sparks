// LessonModal.jsx
import React, { useState } from 'react';
import "./TeacherModal.less";


const LessonModal = ({ isOpen, closeModal }) => {
  const [teacherID, setTeacherID] = useState('');
  const [classroom, setClassroom] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setTeacherID('');
    setClassroom('');
    closeModal();
  };

  if (!isOpen) {
    return null;
  }


  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={closeModal}>x</span>
        <h2>Teacher Assignment Form</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={teacherID} placeholder="Please enter teacher id" onChange={(e) => setTeacherID(e.target.value)}/>
            <input type="text" name="description" value={classroom} placeholder="Please enter the classroom you would like to add this teacher to" onChange={(e) => setClassroom(e.target.value)}/>
            <input type="submit" value="Submit" onClick={handleSubmit}></input>
            
        </form>
      </div>
    </div>
  );
};

export default LessonModal;