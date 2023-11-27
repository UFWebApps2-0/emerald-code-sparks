import { message } from 'antd';
import React, { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { postUser, setUserSession } from '../../Utils/AuthRequests';
import { useGlobalState } from '../../Utils/userState';
import NonOrgMember from './OrganizationNonMember';
import "./OrganizationDashboard.less"
import OrganizationDashSideBar from './OrgDashboardSidebar';
import OrganizationHome from './DashboardPages/Home';
import OrganizationUsers from './DashboardPages/Users';
import OrganizationModeration from './DashboardPages/Moderation';



export default function OrganizationDashboard() {
  function OrgDashboardPage() {
    let list1 = [];
    Object.keys(OrgPages).forEach((page) => { if (pagename === OrgPages[page][0]) { list1.push(<>{OrgPages[page][1]}</>); } });
    if (list1.length === 0) {
      list1.push(OrgPages["Home"][1]);
    }
    return (
      <div className='org-content'>
        {list1}
      </div>
    );
  }
  const [value] = useGlobalState('currUser');
  const pagename = window.location.pathname.substring("/organizationdashboard".length);
  const OrgPages = {
    Home: ["", <OrganizationHome />],
    Users: ["/users", <OrganizationUsers />],
    Moderation: ["/moderation", <OrganizationModeration />]
  };
  if (value.org === undefined) { return NonOrgMember(); }
  return (
    <div className="container nav-padding">
      <NavBar />
      <OrganizationDashSideBar pages={OrgPages} />
      <OrgDashboardPage />
    </div>
  );
}