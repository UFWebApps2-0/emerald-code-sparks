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
  const [verify, setVerify] = useState(false);
  const { orgId } = useParams();

  async function isVerified() {
    let org = await getOrg(orgId);
    console.log("ran function")
    return org.data.users.map((user) => user.id).includes(value.id);
  }

  useEffect(() => {
    // Call isVerified with orgId and handle the promise
    isVerified(orgId).then(verified => {
      setVerify(verified);
    });
  }, [orgId]);  // Add orgId to the dependency array


  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab');

  function Page(props) {
    <div className="container nav-padding">
    <NavBar />
    <Tabs
      defaultActiveKey={tab ? tab : 'home'}
      onChange={(key) => setSearchParams({ tab: key })}
    >
      <TabPane tab="Home" key="home">
        <OrganizationHome id={props.id}/>
      </TabPane>
      {/* <TabPane tab="Users" key="users">
        <OrganizationUsers id={orgId}/>
      </TabPane> */}
      {/* <TabPane tab="Moderation" key="moderation">
        <OrganizationModeration />
      </TabPane>
      <TabPane tab="Classrooms" key="classroom">
        <OrganizationClasses />
      </TabPane> */}
    </Tabs>
  </div>
  }

  const renderedPage = <Page id={orgId}/>;

  if (!verify) return <NonOrgMember/>
  else return renderedPage;
}
