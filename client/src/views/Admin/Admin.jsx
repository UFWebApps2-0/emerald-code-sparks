import React, { useEffect, useState } from 'react';
import "./Admin.less";
//import { message } from 'antd';
import NavBar from "../../components/NavBar/NavBar";
//import { useGlobalState } from '../../../Utils/userState';
import { useNavigate } from 'react-router-dom';

export default function Admin() {
    //handle click on create org button
    function orgCreateClick(){
        alert("you clicked the add org button! functionality coming soon");
    }

    //handle click on org --> navigate(org page)

    //handle click on lesson button --> return a temp popup?


    return (
        <div className='container nav-padding'>
            <NavBar />  {/*edit admin nav bar in NavBar.jsx for admin specific needs */}
            <div id='main-header'>Welcome, [insert name]</div> {/* replace 'admin' with role.name */}
            {/*create org button*/}
                {/*gonna require some kind of connection to org file*/}
            <button id='createOrgButton' onClick={orgCreateClick}> + </button> {/*this needs to be moved to the right spot and do smth when clicked/hovered over */}
            {/*add custom element adminSubHeader*/}
            <div id='cardholder'>
                <h1>Your Orgs</h1>
                <div>[insert orgs here]</div>
            {/*generate org tiles*/}
                {/*have them redirect to org page or org management page?*/}

            {/*create lesson button. this may belong in an org management page*/}
                {/*I think a lesson creator exists? we just have to link to it and allow access*/}
            {/*create classroom button*/}
            {/* */}
            </div>
        </div>

    );
}