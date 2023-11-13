import React from 'react';
import Logo from "../../assets/casmm_logo11_duck.png";
import NavBar from "../../components/NavBar/NavBar";
import TeacherLogin from '../TeacherLogin/TeacherLogin';
import './Home.less';
import HomeJoin from "../StudentLogin/HomeJoin";

const Home = () => (
    <div className='container nav-padding'>
        <NavBar />

        {/* logo and logins */}
        <div id='join-wrapper'>
            <div>
                <img src={Logo} alt='logo' id='home-logo'/>
            </div>
            <HomeJoin />
            <TeacherLogin />
        </div>

        {/* featured projects */}
        <div className='projects-container'>
            <h1>FEATURED PROJECTS</h1>
            <div className='projects-row'>
                <div className='project-box'>
                    <div className='credits-overlay'>
                        <h1>Name 1</h1>
                    </div>
                </div>
                <div className='project-box'>
                <div className='credits-overlay'>
                        <h1>Name 2</h1>
                    </div>
                </div>
                <div className='project-box'>
                <div className='credits-overlay'>
                        <h1>Name 3</h1>
                    </div>
                </div>
                <div className='project-box'>
                <div className='credits-overlay'>
                        <h1>Name 4</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default Home;