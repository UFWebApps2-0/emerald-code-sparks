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
import OrganizationLessons from './DashboardPages/Lessons';
import {useSearchParams, useParams, useNavigate} from 'react-router-dom';


const { TabPane } = Tabs;
export default function OrganizationDashboard() {

  const [value] = useGlobalState('currUser');
  const [verify, setVerify] = useState(false);
  const { orgId } = useParams();
  const navigate = useNavigate();

  async function isVerified(orgId) {
    let org = await getOrg(orgId);
    console.log("ran function")
    return org.data.users.map((user) => user.id).includes(value.id);
  }

  useEffect(() => {
    isVerified(orgId).then(verified => {
      setVerify(verified);
    });
  }, [orgId]);  // Add orgId to the dependency array
  const handleBack = () => {
    navigate('/admin');
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab');

  function Page(props) {
    return (
    <div className="container nav-padding">
    <NavBar />
      <button id='org-back-btn' onClick={handleBack}>
        <i className='fa fa-arrow-left' aria-hidden='true' />
      </button>
    <Tabs
      defaultActiveKey={tab ? tab : 'home'}
      onChange={(key) => setSearchParams({ tab: key })}
    >
      <TabPane tab="Classrooms" key="classroom">
        <OrganizationClasses id={props.id}/>
      </TabPane>
     
      <TabPane tab="Users" key="users">
        <OrganizationUsers id={props.id}/>
      </TabPane>
      {/*<TabPane tab="Moderation" key="moderation">
        <OrganizationModeration id={props.id}/>
      </TabPane>
       <TabPane tab="Home" key="home">
        <OrganizationHome id={props.id}/>
      </TabPane>
      */
      }
      
    
      <TabPane tab="Lessons" key="lessons">
        <OrganizationLessons/>
      </TabPane>
      </Tabs>
  </div>)
  }

  const renderedPage = <Page id={orgId}/>;

  if (!verify) return <NonOrgMember/>
  else return renderedPage;
}
