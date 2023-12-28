import React, { useState } from 'react';
import BookCard from '../Card/BookCard';

const BookList = ({ books, page, pagination, type }) => {

    const classname = type === "dashboard" ? "col-md-4 mb-3" : "col-md-3 mb-3";

    const [currentBookPage, setCurrentBookPage] = useState(1);
    const booksPerPage = page >= books.length ? books.length : page;

    const indexOfLastUser = currentBookPage * booksPerPage;
    const indexOfFirstUser = indexOfLastUser - booksPerPage;
    const currentBooks = books.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => {
        setCurrentBookPage(pageNumber);
    };

    return (
        <div>
        <div className="row">
            {currentBooks.map((book) => (
            <div key={book.id} className={classname}>
                <BookCard book={book} type={type}/>
            </div>
            ))}
        </div>
        { books.length > page && <ul className="pagination" style={{justifyContent: pagination}}>
            {Array.from({ length: Math.ceil(books.length / booksPerPage) }, (_, i) => (
            <li key={i} className={`page-item ${currentBookPage === i + 1 ? 'active' : ''}`}>
                <button onClick={() => paginate(i + 1)} className="page-link">
                {i + 1}
                </button>
            </li>
            ))}
        </ul> }
        </div>
    );
};

export default BookList;
