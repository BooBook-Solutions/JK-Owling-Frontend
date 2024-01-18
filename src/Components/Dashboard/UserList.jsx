import React, { useEffect, useState } from 'react';
import UserCard from '../Card/UserCard';
import PageManager from '../Common/PageManager';
import SearchBar from '../Common/SearchBar';

const UserList = ({ users, setUsers, pageItems }) => {

    const [filteredUsers, _setFilteredUsers] = useState(users);

    function setFilteredUsers(value) {
        _setFilteredUsers(value);
        setUsers(value);
    }

    const { pageManager, currentItems: currentUsers } = PageManager(filteredUsers, pageItems);

    const handleUserDeletion = (deletedUserId) => {
        // Filter out the deleted user from the state
        setFilteredUsers(prevUsers => prevUsers.filter(user => user.id !== deletedUserId));
    };

    useEffect(() => { setFilteredUsers(users) }, [users]); //when users change, update filtered users

    return (
        <>
        { users.length > 0 ? (
            <div>
                <div className="add-button-container">
                    <SearchBar items={users} setItems={setFilteredUsers} placeholder={"Search users..."} />
                </div>
                <div className="row">
                    { currentUsers.map((user) => (
                        <div key={user.id} className="col-md-4 mb-3">
                            <UserCard user={user} type={"dashboard"} onDelete={handleUserDeletion}/>
                        </div>
                    ))}
                </div>
                { pageManager }
            </div>
        ) : (
            <p>There are no users to show.</p>
        )}
        </>
    );
};

export default UserList;
