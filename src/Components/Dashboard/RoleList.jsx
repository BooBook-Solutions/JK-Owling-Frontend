import React, { useState } from 'react';
import { Table, Button, Form } from 'react-bootstrap';
import useAPIFetch from '../../Hooks/useAPIFetch';
import getUrl from '../../Endpoints/endpoints';
import { useEffect } from 'react';

const RoleList = ({ users, page }) => {
  const [currentUser, setCurrentUser] = useState(null);
  
  const [currentRolePage, setCurrentRolePage] = useState(1);
  const usersRolesPerPage = page >= users.length ? users.length : page;

  const indexOfLastUser = currentRolePage * usersRolesPerPage;
  const indexOfFirstUser = indexOfLastUser - usersRolesPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const roles = ["Admin", "Member"];

  const paginate = (pageNumber) => {
    setCurrentRolePage(pageNumber);
  };

  const { handleFetch: changeRole, data: updatedUser, error: userUpdateError } = useAPIFetch({
    url: getUrl("UPDATE_USER", { userId: currentUser?.userId }), 
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Change Role</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
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
      { users.length > page && <div className="pagination">
        <Button variant="primary" onClick={() => paginate(currentRolePage - 1)} disabled={currentRolePage === 1}>
          Previous
        </Button>
        <span className="mx-2" style={{display: "flex", alignItems: "center"}}>{currentRolePage}</span>
        <Button variant="primary" onClick={() => paginate(currentRolePage + 1)} disabled={indexOfLastUser >= users.length}>
          Next
        </Button>
      </div> }
    </div>
  );
};

export default RoleList;
