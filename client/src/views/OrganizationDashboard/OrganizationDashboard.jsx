import { message } from 'antd';
import React, { useState, useEffect} from 'react';
import { Tabs } from 'antd';
import NavBar from '../../components/NavBar/NavBar';
import { postUser, setUserSession } from '../../Utils/AuthRequests';
import { useGlobalState } from '../../Utils/userState';
import { getOrg} from '../../Utils/requests';
import NonOrgMember from './OrganizationNonMember';
import './OrganizationDashboard.less';
import OrganizationDashSideBar from './OrgDashboardSidebar';
import OrganizationHome from './DashboardPages/Home';
import OrganizationUsers from './DashboardPages/Users';
import OrganizationModeration from './DashboardPages/Moderation/Moderation';
import OrganizationClasses from './DashboardPages/Classes';
import { useSearchParams, useParams } from 'react-router-dom';

const { TabPane } = Tabs;
export default function OrganizationDashboard() {

  const [value] = useGlobalState('currUser');
  const [verify,setVerify] = useState(false)

  async function isVerified() {
    const {orgId} = useParams();
    let org = await getOrg(orgId);
    console.log("is it verified?");
    console.log(org.data.users.map((user) => user.id).includes(value.id));
    return org.data.users.map((user) => user.id).includes(value.id);
  }
  useEffect(() => {
    isVerified().then(data => setVerify(data))
  }, []);

  if (!isVerified()) {
    console.log("TEST 1221@$1204");
    return NonOrgMember();
  }else {
    console.log("OHTER TEST");
  }



  function OrgDashboardPage() {
    let list1 = [];
    Object.keys(OrgPages).forEach((page) => {
      if (pagename === OrgPages[page][0]) {
        list1.push(<>{OrgPages[page][1]}</>);
      }
    });
    if (list1.length === 0) {
      list1.push(OrgPages['Home'][1]);
    }
    return <div className="org-content">{list1}</div>;
  }

  const pagename = window.location.pathname.substring(
    '/organizationdashboard'.length
  );
  const OrgPages = {
    Home: ['', <OrganizationHome />],
    Users: ['/users', <OrganizationUsers />],
    Moderation: ['/moderation', <OrganizationModeration />],
    Classrooms: ['/classes', <OrganizationClasses />],
  };

  const [searchParams, setSearchParams] = useSearchParams();

  const tab = searchParams.get('tab');

  return (
    <div className="container nav-padding">
      <NavBar />
      <Tabs
        defaultActiveKey={tab ? tab : 'home'}
        onChange={(key) => setSearchParams({ tab: key })}
      >
        <TabPane tab="Home" key="home">
          <OrganizationHome />
        </TabPane>
        <TabPane tab="Users" key="users">
          <OrganizationUsers />
        </TabPane>
        <TabPane tab="Moderation" key="moderation">
          <OrganizationModeration />
        </TabPane>
        <TabPane tab="Classrooms" key="classroom">
          <OrganizationClasses />
        </TabPane>
      </Tabs>
    </div>
  );
}
