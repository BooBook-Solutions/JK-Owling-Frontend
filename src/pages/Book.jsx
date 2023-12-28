import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import Navigation from "../Components/Common/Navbar";
import LoadingSpinner from "../Components/Common/Spinner";
import BookCard from "../Components/Card/BookCard";

import ErrorPage from "./ErrorPage";

import useFetch from "../Hooks/useAPIFetch";
import getUrl from "../Endpoints/endpoints";

const Book = () => {

    const { id } = useParams(); /* Use this to fetch the book details from backend API */
    
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);

    const { data: details, error: detailsError } = useFetch(getUrl("BOOK_DETAILS", { bookId: id }));

    useEffect(() => {
        details ? setBook(details) : setError(detailsError);
    }, [details, detailsError])

    return (
        <>
        { !book && !error ? (
            <LoadingSpinner />
        ) : (
            error ? (
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