import React, {useState} from 'react';
import BookCard from '../Card/BookCard';
import PageManager from './PageManager';
import SearchBar from './SearchBar';

const BookList = ({ books, pageItems, type }) => {

    const classname = type === "dashboard" ? "col-md-4 mb-3" : "col-md-3 mb-3";

    const [filteredBooks, setFilteredBooks] = useState(books);

    const { pageManager, currentItems: currentBooks } = PageManager(filteredBooks, pageItems);

    return (
        <div>
            <SearchBar items={books} setItems={setFilteredBooks} placeholder={"Search books..."} />
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
