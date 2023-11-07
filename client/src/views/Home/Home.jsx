import React from 'react';
import Logo from "../../assets/casmm_logo.png";
import NavBar from "../../components/NavBar/NavBar";
import './Home.less';
import HomeJoin from "./HomeJoin";

const Home = () => {
    return(
        <div id='join-wrapper'>
            <img src={Logo} id='casmm-logo' alt='logo'/>
            <HomeJoin />
        </div>
        )
    }

export default Home;