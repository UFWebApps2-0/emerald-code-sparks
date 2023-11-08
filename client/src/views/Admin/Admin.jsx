import React, { useEffect, useState } from 'react';
import "./Admin.less";
//import { message } from 'antd';
import NavBar from "../../components/NavBar/NavBar";
import LessonModal from "../../components/LessonModal/LessonModal";
import TeacherModal from "../../components/TeacherModal/TeacherModal";
import { useGlobalState } from "../../Utils/userState";
import { useNavigate } from 'react-router-dom';

export default function Admin() {
    const [value] = useGlobalState('currUser');
    const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
    const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
    const navigate = useNavigate();
    //handle click on create org button
    function orgCreateClick(){
       alert("you clicked the add org button! functionality coming soon");
    }

    function orgClick(id) {
        const organization = organizations.find(org => org.id === id);
        if(organization){
            console.log("Clicked!")
            navigate(`/admin/${organization.id}`);
        }
    }


    const lessonCreateClick = () => {
        setIsLessonModalOpen(true);
    };

    const closeLessonModal = () => {
        setIsLessonModalOpen(false);
    };

    function lessonTileClick(id) {
        alert("you clicked the lesson tile! functionality coming soon!");
    }

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

    function teacherTileClick() {
        alert("you clicked the teacher tile! functionality coming soon!");
    }

    const organizations = [
        { id: "SampleOrgID", name: "Sample Organization"}, 
    ];

    return (
        <div className='container nav-padding'>
            <NavBar />
            <div id='main-header'>Welcome, {value.name}</div>
            {/*create org button*/}
                {/*gonna require some kind of connection to org file --> someone create a temp org page*/}
            <button id='createOrgButton' onClick={orgCreateClick}> + </button> {/*this needs to do smth when clicked/hovered over */}
            {/*add custom element adminSubHeader?*/}
            <div id='cardholder'>
                <h1>Your Orgs</h1>
                <div>
                    {organizations.map(organization => (
                         <div id='description' onClick={() => orgClick(organization.id)}
                         >{organization.name}</div>
                    ))}
                </div>
                {/* We'll run an async function to get all organizations. then map through the below div. */}
                
            {/*generate org tiles*/}
                {/*have them redirect to org page or org management page?*/}

            {/*create lesson button. this will belong in an org management page*/}
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
                <div id='description' onClick={lessonTileClick}>View Current Lessons</div>      
            </div>
            <button id='createOrgButton' onClick={teacherTransferClick} style={{ marginTop: '20px' }}> + </button>
            <TeacherModal
                isOpen={isTeacherModalOpen}
                closeModal={closeTeacherModal}
                submitLesson={submitTeacherTransfer}
            />    
            <div id='cardholder'>
                <h1>Teacher Management Tool</h1>
                <div id='description' onClick={teacherTileClick}>View Current Teachers</div>      
            </div>
        </div>

    );
}