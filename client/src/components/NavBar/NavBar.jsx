import React from 'react';
import './NavBar.less';
import config from './NavBarConfig.json';
import Logo from '../../assets/casmm_logo.png';
import { useNavigate } from 'react-router-dom';
import { BarsOutlined } from '@ant-design/icons';
import { removeUserSession } from '../../Utils/AuthRequests';
import { useGlobalState } from '../../Utils/userState';


export default function NavBar() {
  const [value] = useGlobalState('currUser');
  let navigate = useNavigate();
  let routes = config.routes;
  
  //toggle for responsive navbar dropdown
  const toggleNavbar = () => {
    const x = document.getElementById("navBar");
      if (x.className === "top-nav") {
      x.className += " responsive";
    } else {
      x.className = "top-nav";
    }
  };

  const handleLogout = () => {
    removeUserSession();
    navigate('/');
  };

  const handleRouteChange = (route) => {
    navigate(route);
  };

  const shouldShowRoute = (route) => {
    return config.users[value.role].includes(route);
  };

  return (
    <div id='navBar' className='top-nav'>
      <img src={Logo} id='logo' alt='logo' />

      {/* the navbar will show paths based on the user's role */}
      {shouldShowRoute('Home') ? (
        <p onClick={() => handleRouteChange(routes.Home)}
          onKeyUp={() => handleRouteChange(routes.Home)}
        >HOME</p>
      ) : null}

      {shouldShowRoute('About') ? (
        <div className="dropdown">
        <button className="drop-btn">
          ABOUT   
        </button>
        <div className="dropdown-content">
          <p onClick={() => handleRouteChange(routes.About)}
            onKeyUp={() => handleRouteChange(routes.About)}
          >ABOUT CASMM</p>

          <p onClick={() => handleRouteChange(routes.HowItWorks)}
            onKeyUp={() => handleRouteChange(routes.HowItWorks)}
          >HOW IT WORKS</p>

          <p onClick={() => handleRouteChange(routes.OurTeam)}
            onKeyUp={() => handleRouteChange(routes.OurTeam)}
          >OUR TEAM</p>

          <p onClick={() => handleRouteChange(routes.FAQ)}
            onKeyUp={() => handleRouteChange(routes.FAQ)}
          >FAQ</p>
        </div>
      </div>
      ) : null}

      {shouldShowRoute('Dashboard') ? (
        <p onClick={() => handleRouteChange(routes.Dashboard)}
        onKeyUp={() => handleRouteChange(routes.Dashboard)}
        >DASHBOARD</p>
      ) : null}

      {shouldShowRoute('StudentDashboard') ? (
        <p onClick={() => handleRouteChange(routes.StudentDashboard)}
        onKeyUp={() => handleRouteChange(routes.StudentDashboard)}
        >DASHBOARD</p>
      ) : null}

      {shouldShowRoute('ContentCreatorDashboard') ? (
        <p onClick={() => handleRouteChange(routes.ContentCreatorDashboard)}
        onKeyUp={() => handleRouteChange(routes.ContentCreatorDashboard)}
        >DASHBOARD</p>
      ) : null}

      {shouldShowRoute('ResearcherDashboard') ? (
        <p onClick={() => handleRouteChange(routes.ResearcherDashboard)}
          onKeyUp={() => handleRouteChange(routes.ResearcherDashboard)}
        >DASHBOARD</p>
      ) : null}

      {shouldShowRoute('Sandbox') ? (
              <p onClick={() => {
                localStorage.removeItem('sandbox-activity');
                handleRouteChange(routes.Sandbox);
              }}
                onKeyUp={() => {
                localStorage.removeItem('sandbox-activity');
                handleRouteChange(routes.Sandbox);
              }}
              >CREATE</p>
      ) : null}

      <p onClick={() => handleRouteChange(routes.Gallery)}
        onKeyUp={() => handleRouteChange(routes.Gallery)}
      >GALLERY</p>

      {shouldShowRoute('BugReport') ? (
        <p onClick={() => handleRouteChange(routes.BugReport)}
          onKeyUp={() => handleRouteChange(routes.BugReport)}
        >REPORT A BUG</p>
      ) : null}

      {shouldShowRoute('SignOut') ? (
        <p onClick={() => handleLogout()} onKeyUp={() => handleLogout()}>SIGN OUT</p>
      ) : null}

      <p className="icon" onClick={() => toggleNavbar()} onKeyUp={() => toggleNavbar()}>
        <BarsOutlined />
      </p>
    </div>
  );
}

