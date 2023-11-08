import React from 'react';
import NavBar from "../NavBar/NavBar";

export default function Organization() {
    return (
        <div className='container nav-padding'>
            <NavBar />
            <div id='main-header'>Welcome, Organization Page</div>
            {/* No content or buttons in this page */}
        </div>
    );
}