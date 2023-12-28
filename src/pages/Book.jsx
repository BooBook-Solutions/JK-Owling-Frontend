import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import { useParams } from 'react-router-dom';

import Navigation from "../Components/Common/Navbar";

import useFetch from "../Hooks/useAPIFetch";

import ErrorPage from "./ErrorPage";
import LoadingSpinner from "../Components/Common/Spinner";
import BookCard from "../Components/Card/BookCard";

const Book = () => {

    const { id } = useParams(); /* Use this to fetch the book details from backend API */
    
    const [book, setBook] = useState({});
    const [error, setError] = useState({});
    const [found, setFound] = useState(false);

    const { data: bookData, error: bookError } = useFetch("http://localhost:8000/api/books/" + id);

    useEffect(() => {
        if(bookData) { setBook(bookData); setFound(true); }
        else setError(bookError);
    }, [bookData, bookError])

    return (
        <>
        { !bookData && !bookError ? (
            <LoadingSpinner />
        ) : (
            !found ? (
                <ErrorPage eCode={error?.status} eText={error?.message} />
            ) : (
                <>
                    <Navigation />
                    <Container className="p-3 centered-div">
                        <BookCard book={book}/>
                    </Container>
                </>
            )
        )}
        </>
    );
};

export default Book;