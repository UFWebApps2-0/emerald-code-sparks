import React, { useEffect, useState } from 'react';
import './Organization.less';
import NavBar from "../../components/NavBar/NavBar";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';



export default function Organization() {
    const { organizationID } = useParams();
    console.log(organizationID);

    return (
        <div className='container nav-padding'>
            <NavBar />
            <div id='main-header'>Sample Organization</div> {/* replace 'admin' with role.name */}
            {/*create org button*/}
                {/*gonna require some kind of connection to org file*/}
            {/*add custom element adminSubHeader?*/}
            <div id='cardholder'>
                <h1>Your Classes</h1>
                <div>[insert classes here]</div>
            {/*generate class tiles*/}
            </div>
            <br></br>
            <Popup trigger=
                {<button className='inv-teacher-btn'> + </button>}
                position="center">
                <div className='inv-teacher-popup'><FontAwesomeIcon icon={faMagnifyingGlass} /><input className='search-input' placeholder='Search Teacher by Name'></input></div>
            </Popup>

            <div id='cardholder'>
                <h1>Current Teachers</h1>
                <div className="teacher-container">
                    <div className='teacher-tile'><span className='teacher-name'>Jeremy Evans </span><FontAwesomeIcon className='remove-btn' icon={faTrashCan} /></div>
                    <div className='teacher-tile'><span className='teacher-name'>Joe Shmoe </span><FontAwesomeIcon className='remove-btn' icon={faTrashCan} /></div>
                    <div className='teacher-tile'><span className='teacher-name'>Judy Smith </span><FontAwesomeIcon className='remove-btn' icon={faTrashCan} /></div>
                </div>
            {/*generate list of teachers... maybe tiles depending on if we need more than name?*/}
            </div>
        </div>

    );
}