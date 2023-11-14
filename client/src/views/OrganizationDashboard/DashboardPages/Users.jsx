import React, { useEffect, useState } from 'react';
import { getToken } from '../../../Utils/AuthRequests';
import { getOrgUsers } from "../../../Utils/requests";
import { message } from 'antd';

export default function OrganizationUsers() {
  const [org, setOrg] = useState({});

  useEffect(() => {
    let classroomIds = [];
    getOrgUsers(JSON.parse(sessionStorage.getItem("user")).organization.id).then((res) => {
      if (res.data) {
        // res.data.classrooms.forEach((classroom) => {
        //   classroomIds.push(classroom.id);
        // });
        // getClassrooms(classroomIds).then((classrooms) => {
        //   setClassrooms(classrooms);
        // });
        setOrg(res.data);
        console.log(org);
        console.log(res.data);
      } else {
        message.error(res.err);
      }
    });
  }, []);
  if (!("Name" in org)) {
    return (<div id='main-header'>Welcome to Loading</div>);
  }
  return (<>
    <div id='main-header'>Welcome to {org.Name}</div>
    {/* <ol>
      {org.users.map((user) => (<><li>{user.username}</li></>
      ))}
    </ol> */}
    <table>
      <th>Username</th>
      <th>Roles</th>
      {org.users.map((user) => (<>
        <tr>
          <td>{user.username}</td>
          <td>{user.role}</td>
        </tr>
      </>))}
    </table>
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