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

    //handle click on create org button
    function orgCreateClick(){
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
        console.log(orgs);
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
            navigate(`/admin/${organization.id}`);
        }
    }

/*
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
*/
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
                         <div key={organization.id} id='dashboard-org-card'>
                             <div id='card-left-content-container'>
                                 <h1 id='card-title'>{organization.Name}</h1>
                                 <div id='card-button-container' className='flex flex-row'>
                                     <button onClick={() => orgClick(organization.id)}>View</button>
                                 </div>
                             </div>
                             <div id='card-right-content-container'>
                                 <div id='dashboard-display-code-modal'>
                                     <h1 id='number'>{organization.users.length}</h1>
                                     <p id='label'>Members</p>
                                 </div>
                                 <div id='divider' />
                                 <div id={'classroom-number-container'}>
                                     <h1 id='number'>{organization.classrooms.length}</h1>
                                     <p id='label'>Classes</p>
                                 </div>
                             </div>
                         </div>
                    ))}
                </div>
            </div>
        </div>

    );
}