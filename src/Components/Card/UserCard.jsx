import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import UserModal from '../Modal/UserModal';

function UserCard({ user }) {

  const deleteUser = () => {
    alert("User deleted: " + user.email)
  }

  return (
    <Card>
      <img alt="Profile" width="50px" style={{padding: "5px", borderRadius: "10px"}} src={user.picture} />
      <Card.Body>
        <Card.Title>{user.name + " " + user.surname}</Card.Title>
        <Card.Text>{user.email}</Card.Text>
      </Card.Body>
      <Card.Footer><b>Role: </b>{user.role}</Card.Footer>
      <Card.Footer>
        <UserModal userInfo={user}/> { /* Does it make any sense? Data is retrieved from Google... */ }
        <Button variant="danger" style={{ marginLeft: '10px' }} onClick={deleteUser}>Delete</Button>
      </Card.Footer>
    </Card>
  );
}

export default UserCard;