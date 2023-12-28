import React, { useState } from 'react';
import UserCard from '../Card/UserCard';

const UserList = ({ users, page }) => {

    const [currentUserPage, setCurrentUserPage] = useState(1);
    const userPerPage = page >= users.length ? users.length : page;

    const indexOfLastUser = currentUserPage * userPerPage;
    const indexOfFirstUser = indexOfLastUser - userPerPage;
    const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
    
    const paginate = (pageNumber) => {
        setCurrentUserPage(pageNumber);
    };

    return (
        <div>
        <div className="row">
            {currentUsers.map((user) => (
            <div key={user.id} className="col-md-4 mb-3">
                <UserCard user={user}/>
            </div>
            ))}
        </div>
        { users.length > page && (
            <ul className="pagination">
                { Array.from({ length: Math.ceil(users.length / userPerPage) }, (_, i) => (
                <li key={i} className={`page-item ${currentUserPage === i + 1 ? 'active' : ''}`}>
                    <button onClick={() => paginate(i + 1)} className="page-link">{i + 1}</button>
                </li>
                ))}
            </ul>
        )}
        </div>
    );
};

export default UserList;
