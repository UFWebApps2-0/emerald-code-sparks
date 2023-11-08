import React, { useEffect, useState } from 'react';
import "./Admin.less";
//import { message } from 'antd';
import NavBar from "../../components/NavBar/NavBar";
import LessonModal from "../../components/LessonModal/LessonModal";
import TeacherModal from "../../components/TeacherModal/TeacherModal";
import Organization from "../../components/Organization/Organization";
//import { useGlobalState } from "../../../Utils/userState";
import { useNavigate } from 'react-router-dom';

export default function Admin() {
    //handle click on create org button
    const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
    const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
    const navigate = useNavigate();
    function orgCreateClick(){
        alert("you clicked the add org button! functionality coming soon");
    }

    const lessonCreateClick = () => {
        setIsLessonModalOpen(true);
    };

    const closeLessonModal = () => {
        setIsLessonModalOpen(false);
    };

    const submitLesson = (lessonData) => {
        console.log(lessonData);
        closeLessonModal();
    };

    const submitTeacherTransfer = (lessonData) => {
        console.log(lessonData);
        closeTeacherModal();
    };

    const closeTeacherModal = () => {
        setIsTeacherModalOpen(false);
    }

    const teacherTransferClick = () => {
        setIsTeacherModalOpen(true)
    }

    const viewOrganizationsClick = () => {
        navigate('Organization');
        return(
            <Organization/>
        )
    };

    


    return (
        <div className='container nav-padding'>
            <NavBar />  {/*edit admin nav bar in NavBar.jsx for admin specific needs. it's currently showing the teacher one */}
            <div id='main-header'>Welcome, [insertname]</div> {/* replace 'admin' with role.name */}
            {/*create org button*/}
                {/*gonna require some kind of connection to org file*/}
            <button id='createOrgButton' onClick={orgCreateClick}> + </button> {/*this needs to be moved to the right spot and do smth when clicked/hovered over */}
            {/*add custom element adminSubHeader?*/}
            <div id='cardholder'>
                <h1>Your Orgs</h1>
                <div id='description' onClick={viewOrganizationsClick}>View Current Organizations</div>     
                
            {/*generate org tiles*/}
                {/*have them redirect to org page or org management page?*/}

            {/*create lesson button. this may belong in an org management page*/}
                {/*I think a lesson creator exists? we just have to link to it and allow access*/}
            {/*create classroom button*/}
            {/* */}
            </div>
            <button id='createOrgButton' onClick={lessonCreateClick} style={{ marginTop: '20px' }}> + </button>
            <LessonModal
                isOpen={isLessonModalOpen}
                closeModal={closeLessonModal}
                submitLesson={submitLesson}
            />            
            <div id='cardholder'>
                <h1>Create Lesson</h1>
                <div id='description' onClick={orgCreateClick}>View Current Lessons</div>      
            </div>
            <button id='createOrgButton' onClick={teacherTransferClick} style={{ marginTop: '20px' }}> + </button>
            <TeacherModal
                isOpen={isTeacherModalOpen}
                closeModal={closeTeacherModal}
                submitLesson={submitTeacherTransfer}
            />    
            <div id='cardholder'>
                <h1>Teacher Management Tool</h1>
                <div id='description' onClick={orgCreateClick}>View Current Teachers</div>      
            </div>
        </div>

    );
}