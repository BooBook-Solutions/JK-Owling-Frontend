import React, { useEffect } from "react";
import Container from 'react-bootstrap/Container';

import { useParams } from 'react-router-dom';

import Navigation from "../Components/Common/Navbar";
import LoadingSpinner from "../Components/Common/Spinner";
import BookCard from "../Components/Card/BookCard";

import ErrorPage from "./ErrorPage";

import useAPIFetch from '../Hooks/useAPIFetch';
import getUrl from "../Endpoints/endpoints";

const Book = () => {

    const { id } = useParams();
    const { handleFetch: getBookDetails, data: book, error } = useAPIFetch({url: getUrl("BOOK_DETAILS", { bookId: id })});

    useEffect(() => { 
        getBookDetails(); 
    }, [])

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