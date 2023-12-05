import React, { useEffect, useState } from 'react';
import { getToken } from '../../../Utils/AuthRequests';
import { getOrgUsers, getOrg, getRoles, getOrgMentors, updateOrganizationUsers, getUsers} from "../../../Utils/requests";
import { message } from 'antd';
import AddUserModal from "../../../components/AddUserModal/AddUserModal";
import './Users.less';

export default function OrganizationUsers(props) {
  const [org, setOrg] = useState({});
  const [rolemap, setRoleMap] = useState(new Map());
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);

  async function addUser(email){

    let users = (await getUsers()).data;
    let user = users.filter((data) => data.email === email);

    if (user.length === 0) {
      message.error("No users found with this email");
      return false;
    }

    let orgUsers = (await getOrg(props.id)).data.users;
    if (orgUsers.map((data) => data.email).includes(user[0].email)) {
      message.error("User already a part of organization");
      return false;
    }
    orgUsers.push(user[0]);

    let res = await updateOrganizationUsers(props.id, orgUsers);
    setOrg((await getOrg(props.id)).data);
    return true;
  }

  useEffect(() => {
    let classroomIds = [];
    const map = async () => {
      let roles = await getRoles();
      let map = new Map(await roles.data.roles.map((role) => [role.id, role.name]));
      setRoleMap(map);
    }
    map();
    getOrg(
      props.id
    ).then((res) => {
      if (res.data) {
        setOrg(res.data);
        console.log(org);
      } else {
        message.error(res.err);
      }
    });
  }, []);

  if (!('Name' in org)) {
    return <div id="main-header">Welcome to Loading</div>;
  }
  console.log(org.users)
  return (<div>
    <div id='main-header' className='welcome-message'>Welcome to {org.Name} Users</div>
    <button className='addUserButton' onClick={() => setIsAddUserModalOpen(true)}>
      +
    </button>
    <AddUserModal
        isOpen = {isAddUserModalOpen}
        submitUser = {addUser}
        closeModal = {() => setIsAddUserModalOpen(false)}
    />
    <div id='userSubHeader'><h1>Organization Members</h1></div>

    <table className='userTable'>
      <thead>
        <tr>
          <th>Username</th>
          <th>Role</th>
        </tr>
      </thead>
      <tbody>
        {org.users.map((user) => (
          <tr key={user.username}>
            <td className='user-username'>{user.username}</td>
            <td className='user-role'>{rolemap.get(user.role)}</td>
          </tr>
        ))}
        {org.mentors.map((mentor) => (
          <tr key={mentor.username}>
            <td className='user-username'>{mentor.last_name}</td>
            <td className='user-role'>Mentor</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>);
}