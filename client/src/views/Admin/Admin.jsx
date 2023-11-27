import React, { useEffect, useState } from 'react';
import "./Admin.less";
//import { message } from 'antd';
import NavBar from "../../components/NavBar/NavBar";
import LessonModal from "../../components/LessonModal/LessonModal";
import TeacherModal from "../../components/TeacherModal/TeacherModal";
import OrganizationModal from "../../components/OrganizationModal/OrganizationModal";
import { useGlobalState} from "../../Utils/userState";
import { useNavigate } from 'react-router-dom';


import {
    addOrganization,
    getAllOrgs,
    getUserOrgs,
} from '../../Utils/requests';
 

export default function Admin() {
    const [value] = useGlobalState('currUser');
    const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
    const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
    const [isOrganizationModalOpen, setIsOrganizationModalOpen] = useState(false);
    const [orgList, setOrgList] = useState([]);
    const navigate = useNavigate();


//Org stuff
    //list of orgs? make this updatable so we can add orgs (at least temporarily)



    //handle click on create org button
    function orgCreateClick(){
        //make a create org form
        setIsOrganizationModalOpen(true);
    }
    const closeOrganizationModal = () => {
        setIsOrganizationModalOpen(false);
    }

    //extremely ugly workaround since getUserOrgs doesn't work; instead of querying user's orgs, looks at all orgs and filters for user
    //(filtering in the query itself also didn't work)
    async function getOrgs() {
        let orgs = await getAllOrgs();
        let userorgs = orgs.data.filter((org) => org.users.filter((user) => user.id === value.id).length > 0);
        return userorgs;
    }
    useEffect(() => {
        getOrgs().then(data => setOrgList(data))
    }, []);


    const submitOrg = async (orgData) => {
        //make another org tile with the data from this submission, and the current user as a user.
        let users = [{id: value.id, username: value.name, email: value.email}];
        let res = await addOrganization(orgData, users);
        setOrgList(await getOrgs());
        closeOrganizationModal();
    }

    //click on an org tile
    function orgClick(id) {
        const organization = orgList.find(org => org.id === id);
        if(organization){
            console.log("Clicked!");
            navigate(`/admin/${organization.id}`);
        }
    }


//Lesson stuff
    //click on create lesson button

    const lessonCreateClick = () => {
        setIsLessonModalOpen(true);
    };

    const closeLessonModal = () => {
        setIsLessonModalOpen(false);
    };

    //click on lesson tile
    function lessonTileClick(id) {
        alert("you clicked the lesson tile! functionality coming soon!");
    }

    //submit data from lesson button
    const submitLesson = (lessonData) => {
        console.log(lessonData);
        closeLessonModal();
    };

//Teacher stuff
    //submit data from teacher button
    const submitTeacherTransfer = (lessonData) => {
        console.log(lessonData);
        closeTeacherModal();
    };

    const closeTeacherModal = () => {
        setIsTeacherModalOpen(false);
    }

    const teacherTransferClick = () => {
        setIsTeacherModalOpen(true);
    }

    //click on teacher tile
    function teacherTileClick() {
        alert("you clicked the teacher tile! functionality coming soon!");
    }

    if  (value.role !=  "Admin") {
        return "Unauthorized";
    }

    return (
        <div className='container nav-padding'>
            <NavBar />
            <div className='main-header'>Welcome {value.name}</div>

            {/*org button*/}
            <button className='createButton' title='Create Organization' onClick={orgCreateClick}> + </button>
            <OrganizationModal
                isOpen={isOrganizationModalOpen}
                closeModal={closeOrganizationModal}
                submitOrg={submitOrg}
            />
            <div className="adminSubHeader"><h1>Your Organizations</h1></div>
            {/* org tiles */}
            <div className='cardholder'>
                {/*generate org tiles, have them redirect to org page / org management page*/}
                <div className='tile-container'>
                    {orgList.map(organization => (
                         <div className='description' onClick={() => orgClick(organization.id)}
                         >{organization.Name}</div>
                    ))}
                </div>
                {/* We'll run an async function to get all organizations. then map through the below div. */}
            </div>

            {/*create lesson button. this will belong in an org management page --> move it there if they don't already have one*/}
            {/*I think a lesson creator exists? we just have to link to it and allow access*/}
            {/*<button className='createOrgButton' onClick={lessonCreateClick} style={{ marginTop: '20px' }}> + </button>
            <LessonModal
                isOpen={isLessonModalOpen}
                closeModal={closeLessonModal}
                submitLesson={submitLesson}
            />
            <div className='cardholder'>
                <h1>Create Lesson</h1>
                <div className='description' onClick={lessonTileClick}>View Current Lessons</div>
            </div>*/}

            {/*teacher management. should be moved into org page*/}
                {/*<button className='createOrgButton' onClick={teacherTransferClick} style={{ marginTop: '20px' }}> + </button>
            <TeacherModal
                isOpen={isTeacherModalOpen}
                closeModal={closeTeacherModal}
                submitLesson={submitTeacherTransfer}
            />    
            <div className='cardholder'>
                <h1>Teacher Management Tool</h1>
                <div className='description' onClick={teacherTileClick}>View Current Teachers</div>
            </div> */}
        </div>

    );
}