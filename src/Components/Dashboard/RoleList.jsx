import React, { useState, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';

import PageManager from '../Common/PageManager';

import useAPIFetch from '../../Hooks/useAPIFetch';
import getUrl from '../../Endpoints/endpoints';
import SearchBar from '../Common/SearchBar';

const RoleList = ({ users, pageItems }) => {

  const [currentUser, setCurrentUser] = useState(null);

  const [filteredUsers, setFilteredUsers] = useState(users);

  const { pageManager, currentItems: currentUsers } = PageManager(filteredUsers, pageItems);

  const { handleFetch: getRoles, data: roles, error: rolesError } = useAPIFetch({
    url: getUrl({ endpoint: "ROLES" })
  })

  useEffect(() => {
      getRoles();
  }, [])

  const { handleFetch: changeRole, data: updatedUser, error: userUpdateError } = useAPIFetch({
    url: getUrl({ 
      endpoint: "USER_DETAILS", 
      pathParams: { user_id: currentUser?.userId }
    }), 
    method: "PUT",
    body: { user_id: currentUser?.userId, role: currentUser?.userRole }
  })

  const handleRoleChange = (id, role) => {
    setCurrentUser({userId: id, userRole: role})
  };

  useEffect(() => {
    if(currentUser) changeRole()
  }, [currentUser])

  useEffect(() => {
    if(updatedUser){
      alert("Role changed successfully!");
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
                { roles && !rolesError &&
                  <Form.Control as="select" defaultValue={user.role.name} onChange={(e) => handleRoleChange(user.id, e.target.value)}>
                      { roles?.map((role) => (<option value={role.name}>{role.name_translated}</option>)) }
                  </Form.Control>
                }
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
