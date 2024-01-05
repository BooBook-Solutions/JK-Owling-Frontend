import React, { useState } from 'react';
import UserCard from '../Card/UserCard';
import PageManager from '../Common/PageManager';
import SearchBar from '../Common/SearchBar';

const UserList = ({ users, pageItems }) => {

    const [filteredUsers, setFilteredUsers] = useState(users);

    const { pageManager, currentItems: currentUsers } = PageManager(filteredUsers, pageItems);

    return (
        <div>
            <SearchBar items={users} setItems={setFilteredUsers} placeholder={"Search users..."} />
            <div className="row">
                { currentUsers.map((user) => (
                    <div key={user.id} className="col-md-4 mb-3">
                        <UserCard user={user}/>
                    </div>
                ))}
            </div>
            { pageManager }
        </div>
    );
};

export default UserList;
