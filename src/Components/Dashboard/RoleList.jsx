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

  const { handleFetch: changeRole } = useAPIFetch({
    url: getUrl({ 
      endpoint: "USER_DETAILS", 
      pathParams: { user_id: currentUser?.userId }
    }), 
    method: "PUT",
    body: { user_id: currentUser?.userId, role: currentUser?.userRole }
  })

  // On load, get roles
  useEffect(() => {
    getRoles();
  }, []); // eslint-disable-line

  // When users change, update filtered users
  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  // On role change, set current user
  const handleRoleChange = (id, email, role) => {
    setCurrentUser({ userId: id, userEmail: email, userRole: role });
  };

  // On current user change, update the role
  useEffect(() => {
    if(currentUser) {
      changeRole().then((updatedUser) => {
        if(updatedUser) {
          console.log("Role of user [" + updatedUser.email + "] changed successfully!");
          alert("Role of user [" + updatedUser.email + "] changed successfully!");
        } else {
          alert("Error while changing role of user [" + currentUser.userEmail + "]. Check console for more details.");
        }
      });
    }
  }, [currentUser]); // eslint-disable-line

  return (
    <div>
      <div className="add-button-container">
        <SearchBar items={users} setItems={setFilteredUsers} placeholder={"Search users..."} />
      </div>
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
                { !roles && !rolesError ? (
                    <span>Loading roles...</span>
                  ) : (
                    rolesError ? (
                      <p>{rolesError?.message}</p>
                    ) : (
                      <Form.Control as="select" defaultValue={user.role.name} onChange={(e) => handleRoleChange(user.id, user.email, e.target.value)}>
                        { roles?.map((role) => (<option key={role.name} value={role.name}>{role.name_translated}</option>)) }
                      </Form.Control>
                    )
                )}
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
