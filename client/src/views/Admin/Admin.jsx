import React, { useEffect, useState } from 'react';
import "./Admin.less";
//import { message } from 'antd';
import NavBar from "../../components/NavBar/NavBar";
//import { useGlobalState } from "../../../Utils/userState";
import { useNavigate } from 'react-router-dom';

import {
    addOrganization,
    getOrgUsers
} from '../../Utils/requests';

export default function Admin() {
    const navigate = useNavigate();

    //handle click on create org button
    async function orgCreateClick(){
        let res = await getOrgUsers(1);
        console.log(res)
    }

    //handle click on org --> navigate(org page)
    function orgClick(id) {
        console.log("Clicked!")
        navigate(`/admin/${id}`);
    }

    //handle click on lesson button --> return a temp popup?


    return (
        <div className='container nav-padding'>
            <NavBar />
            <div id='main-header'>Welcome, [insertname]</div> {/* replace 'admin' with role.name */}
            {/*create org button*/}
                {/*gonna require some kind of connection to org file*/}
            <button id='createOrgButton' onClick={orgCreateClick}> + </button> {/*this needs to be moved to the right spot and do smth when clicked/hovered over */}
            {/*add custom element adminSubHeader?*/}
            <div id='cardholder'>
                <h1>Your Orgs</h1>
                {/* We'll run an async function to get all organizations. then map through the below div. */}
                <div onClick={()=> orgClick("SampleOrgID")}>Sample Organization</div>
            {/*generate org tiles*/}
                {/*have them redirect to org page or org management page?*/}

            {/*create lesson button. this will belong in an org management page*/}
                {/*I think a lesson creator exists? we just have to link to it and allow access*/}
            {/*create classroom button*/}
            {/* */}
            </div>
        </div>

    );
}