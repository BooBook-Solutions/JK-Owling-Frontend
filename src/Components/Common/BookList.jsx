import React from 'react';
import BookCard from '../Card/BookCard';
import PageManager from './PageManager';

const BookList = ({ books, pageItems, type }) => {

    const classname = type === "dashboard" ? "col-md-4 mb-3" : "col-md-3 mb-3";

    const { pageManager, currentItems: currentBooks} = PageManager(books, pageItems)

    return (
        <div>
            <div className="row">
                {currentBooks.map((book) => (
                <div key={book.id} className={classname}>
                    <BookCard book={book} type={type}/>
                </div>
                ))}
            </div>
            { pageManager }
        </div>
    );
};

export default BookList;
