import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import UserModal from '../Modal/UserModal';

import useAPIFetch from '../../Hooks/useAPIFetch';
import getUrl from '../../Endpoints/endpoints';

function UserCard({ user }) {

  const { handleFetch: deleteUser, data: deletedUser, error } = useAPIFetch({
    url: getUrl({ 
      endpoint: "USER_DETAILS", 
      pathParams: { user_id: user.id }
    }), 
    method: "DELETE"
  })

  const handleDelete = () => {
    if(window.confirm("Are you sure you want to delete this user?")) deleteUser();
  }

  useEffect(() => {
    if(deletedUser){
      alert(deletedUser.id + " correctly deleted!");
      window.location.reload();
    }

    if(error){
      alert("Something went wrong! Check console logs...");
      console.error(error);
    }
  }, [deletedUser, error])

  return (
    <Card>
      <img alt="Profile" width="50px" style={{padding: "5px", borderRadius: "10px"}} src={user.picture} />
      <Card.Body>
        {console.log(user)}
        <Card.Title>{user.name + " " + user.surname}</Card.Title>
        <Card.Text><b>User ID: </b>{user.id}</Card.Text>
        <Card.Text>{user.email}</Card.Text>
      </Card.Body>
      <Card.Footer><b>Role: </b>{user.role.name_translated}</Card.Footer>
      <Card.Footer>
        { /* <UserModal userInfo={user}/> */ } { /* Does it make any sense? Data is retrieved from Google... */ }
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Card.Footer>
    </Card>
  );
}

export default UserCard;