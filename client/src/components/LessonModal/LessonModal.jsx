// LessonModal.jsx
import React, { useState } from 'react';
import "./LessonModal.less";


const LessonModal = ({ isOpen, closeModal }) => {
  const [lessonTitle, setLessonTitle] = useState('');
  const [standard, setStandard] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    setLessonTitle('');
    setStandard('');
    setDescription('');
    setContent('');
  };

  if (!isOpen) {
    return null;
  }

  console.log(lessonTitle)

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={closeModal}>x</span>
        <h2>Lesson Form</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" name="title" value={lessonTitle} placeholder="Please make a title" onChange={(e) => setLessonTitle(e.target.value)}/>
            <select name="standard" value={standard} placeholder="Choose a standard" onChange={(e) => setStandard(e.target.value)}>
                <option value="standard1">Standard 1: Critical Thinking</option>
                <option value="standard2">Standard 2: Collaboration</option>
                <option value="standard3">Standard 3: Communication</option>
                <option value="standard4">Standard 4: Creativity</option>
                <option value="standard5">Standard 5: Cultural Awareness</option>
            </select>
            <input type="text" name="description" value={description} placeholder="Enter your lesson description here..." onChange={(e) => setDescription(e.target.value)}/>
            <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter your lesson content here"
            />
            <input type="submit" value="Submit" onClick={handleSubmit}></input>
            
        </form>
      </div>
    </div>
  );
};

export default LessonModal;