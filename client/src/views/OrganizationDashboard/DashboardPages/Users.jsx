import React, { useEffect, useState } from 'react';
import { getToken } from '../../../Utils/AuthRequests';
import { getOrgUsers, getOrg } from "../../../Utils/requests";
import { message } from 'antd';

export default function OrganizationUsers(props) {
  const [org, setOrg] = useState({});
  console.log(props.id);

  useEffect(() => {
    let classroomIds = [];
    getOrg(
      props.id
    ).then((res) => {
      if (res.data) {
        setOrg(res.data);
      } else {
        message.error(res.err);
      }
    });
  }, []);

  if (!('Name' in org)) {
    return <div id="main-header">Welcome to Loading</div>;
  }
  console.log(org.users)
  return (<>
    <div id='main-header' className='welcome-message'>Welcome to {org.Name}</div>

<table className='user-table'>
  <thead>
    <tr>
      <th>Username</th>
      <th>Roles</th>
    </tr>
  </thead>
  <tbody>
    {org.users.map((user) => (
      <tr key={user.username}>
        <td className='user-username'>{user.username}</td>
        <td className='user-role'>{user.role}</td>
      </tr>      
    ))}
  </tbody>
</table>
<style>
  {`
    .welcome-message {
      font-family: 'Arial', sans-serif;
      font-size: 24px;
      color: #333;
    }
    .user-table {
      border-collapse: collapse;
      width: 100%;
      margin-top: 20px;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
    .user-username {
      font-weight: bold;
    }
    .user-role {
      font-weight: bold;
      color: #000; /* black */
    }
  `}
</style>
    {/* <p>{sessionStorage.getItem("user")}</p> */}
    {/* {orgs.map((organization) => (
      <div key={organization.id} id='dashboard-class-card'>
        <div id='card-left-content-container'>
          <h1 id='card-title'>{organization.name}</h1>
          <div id='card-button-container' className='flex flex-row'>
            <button>
              View
            </button>
          </div>
        </div>
        <div id='card-right-content-container'>
          <DashboardDisplayCodeModal code={organization.code} />
          <div id='divider' />
          <div id='student-number-container'>
            <h1 id='number'>{organization.students.length}</h1>
            <p id='label'>Students</p>
          </div>
        </div>
      </div>
    ))} */}
  </>);
}