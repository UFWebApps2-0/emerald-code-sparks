import React from 'react';
import Logo from "../../assets/casmm_logo.png";
import NavBar from "../../components/NavBar/NavBar";

const Gallery = () => (
    <div className='container nav-padding'>
        <NavBar />
        <div id='join-wrapper'>
            <img src={Logo} id='casmm-logo' alt='logo'/>
        </div>
    </div>
)

export default Gallery;