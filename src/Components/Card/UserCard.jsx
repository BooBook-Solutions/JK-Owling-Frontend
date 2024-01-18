import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import LoadingSpinner from '../Common/Spinner';

import useAPIFetch from '../../Hooks/useAPIFetch';
import getUrl from '../../Endpoints/endpoints';
import { useAuthContext } from '../Context/AuthContext';

function UserCard({ user, type, onDelete }) {

    const { authState, logout } = useAuthContext();
    const [isDeleting, setIsDeleting] = useState(false);

    const cardStyle = {
        width: type !== "dashboard" ? '18rem' : 'auto',
    };

    const { handleFetch: deleteUser, error: deleteError } = useAPIFetch({
        url: getUrl({ 
            endpoint: "USER_DETAILS", 
            pathParams: { user_id: user.id }
        }), 
        method: "DELETE"
    })

    const handleDelete = () => {
        if(window.confirm("Are you sure you want to delete this user?")) {
            setIsDeleting(true);
            deleteUser()
            .then((deletedUser) => {
                if(deletedUser) {
                    console.log("User [" + deletedUser.email + "] correctly deleted!")
                    alert("User [" + deletedUser.email + "] correctly deleted!");
                    if(type === "dashboard") onDelete(deletedUser.id);

                    if(authState.user.id === deletedUser.id) {
                        logout();
                        window.location.href = "/authentication"
                    }
                }
            })
            .then(() => setIsDeleting(false));
        }
    }

    const handleDeleteError = () => {
        if(deleteError){
            const errorMessage = deleteError ? deleteError : "check console for more details.";
            alert("Error while deleting user [" + user.email + "]: " + errorMessage);
        }
    }

    useEffect(() => { handleDeleteError() }, [deleteError]) // on delete error, show error

    return (
        <>
            { isDeleting && <LoadingSpinner position="fixed" /> }
            <Card style={cardStyle}>
                <img alt="Profile" width="50px" style={{padding: "5px", borderRadius: "10px"}} src={user.picture} />
                <Card.Body>
                    <Card.Title>{user.name + " " + user.surname}</Card.Title>
                    <Card.Text><b>User ID: </b>{user.id}</Card.Text>
                    <Card.Text>{user.email}</Card.Text>
                </Card.Body>
                <Card.Footer><b>Role: </b>{user.role.name_translated}</Card.Footer>
                <Card.Footer>
                    <Button variant="danger" onClick={handleDelete}>Delete</Button>
                </Card.Footer> 
            </Card>
        </>
    );
}

export default UserCard;