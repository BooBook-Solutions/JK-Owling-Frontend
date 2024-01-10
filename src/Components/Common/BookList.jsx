import React, {useState} from 'react';
import BookCard from '../Card/BookCard';
import PageManager from './PageManager';
import SearchBar from './SearchBar';
import BookModal from '../Modal/BookModal';

const BookList = ({ books, pageItems, type }) => {

    const classname = type === "dashboard" ? "col-md-4 mb-3" : "col-md-3 mb-3";

    const [filteredBooks, setFilteredBooks] = useState(books);

    const { pageManager, currentItems: currentBooks } = PageManager(filteredBooks, pageItems);

    const handleBookDeletion = (deletedBookId) => { 
        // Filter out the deleted book from the state
        setFilteredBooks(prevBooks => prevBooks.filter(book => book.id !== deletedBookId));
    }

    const handleBookCreation = (createdBook) => {
        // Add the created book to the state
        setFilteredBooks(prevBooks => [...prevBooks, createdBook]);
    }

    const handleBookUpdate = (updatedBook) => {
        // Update the book in the state
        setFilteredBooks(prevBooks => prevBooks.map(book => book.id === updatedBook.id ? updatedBook : book));
    }

    return (
        <div>
            <div className="add-button-container">
                { books.length > 0 && <SearchBar items={books} setItems={setFilteredBooks} placeholder={"Search books..."} />}
                { books.length === 0 && <p style={{ paddingTop: "15px" }}>There are no books to show.</p> }
                { type === "dashboard" && <BookModal onCreate={handleBookCreation} /> }
            </div>
            <div className="row">
                {currentBooks.map((book) => (
                <div key={book.id} className={classname}>
                    <BookCard book={book} type={type} onUpdate={handleBookUpdate} onDelete={handleBookDeletion}/>
                </div>
                ))}
            </div>
            { books.length > 0 && pageManager }
        </div>
    );
};

export default BookList;
