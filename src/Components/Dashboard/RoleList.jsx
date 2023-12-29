import React, { useState, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';

import PageManager from '../Common/PageManager';

import useAPIFetch from '../../Hooks/useAPIFetch';
import getUrl from '../../Endpoints/endpoints';
import SearchBar from '../Common/SearchBar';

const RoleList = ({ users, pageItems }) => {

  const roles = ["admin", "user"] // Need to get this from API

  const [currentUser, setCurrentUser] = useState(null);

  const [filteredUsers, setFilteredUsers] = useState(users);

  const { pageManager, currentItems: currentUsers } = PageManager(filteredUsers, pageItems);

  const { handleFetch: changeRole, data: updatedUser, error: userUpdateError } = useAPIFetch({
    url: getUrl({ 
      endpoint: "USER_DETAILS", 
      pathParams: { userId: currentUser?.userId }
    }), 
    method: "PUT",
    body: { role: currentUser?.userRole }
  })

  const handleRoleChange = (id, role) => {
    setCurrentUser({userId: id, userRole: role})
  };

  useEffect(() => {
    if(currentUser) changeRole()
  }, [currentUser])

  useEffect(() => {
    if(updatedUser){
      alert(updatedUser.role);
      window.location.reload();
    }

    if(userUpdateError){
      alert("Something went wrong! Check console logs...");
      console.error(userUpdateError);
    }
  }, [updatedUser, userUpdateError])

  return (
    <div>
      <SearchBar items={users} setItems={setFilteredUsers} placeholder={"Search users..."} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Change Role</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>
                <Form.Control as="select" defaultValue={user.role} onChange={(e) => handleRoleChange(user.id, e.target.value)}>
                    {roles.map((role) => (
                        <option value={role}>{role}</option>
                    ))}
                </Form.Control>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      { pageManager }
    </div>
  );
};

export default RoleList;
