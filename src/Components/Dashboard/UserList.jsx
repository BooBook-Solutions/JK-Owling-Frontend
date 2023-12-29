import React from 'react';
import UserCard from '../Card/UserCard';
import PageManager from '../Common/PageManager';

const UserList = ({ users, pageItems }) => {

    const { pageManager, currentItems: currentUsers} = PageManager(users, pageItems)

    return (
        <div>
            <div className="row">
                {currentUsers.map((user) => (
                <div key={user.id} className="col-md-4 mb-3">
                    <UserCard user={user}/>
                </div>
                ))}
            </div>
            {pageManager}
        </div>
    );
};

export default UserList;
