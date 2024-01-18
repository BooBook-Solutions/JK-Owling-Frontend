import React, { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

import { useParams } from 'react-router-dom';

import Navigation from "../Components/Common/Navbar";
import LoadingSpinner from "../Components/Common/Spinner";
import { useAuthContext } from "../Components/Context/AuthContext";

import ErrorPage from "./ErrorPage";

import getUrl from "../Endpoints/endpoints";
import useAPIFetch from '../Hooks/useAPIFetch';

const Book = () => {
    
    const { authState } = useAuthContext();

    const [isOrdering, setIsOrdering] = useState(false);

    const { handleFetch: getBookDetails, data: book, bookError } = useAPIFetch({
        url: getUrl({ 
            endpoint: "BOOK_DETAILS", 
            pathParams: { book_id: useParams().id } // retrieve book id from url
        })
    });

    const { handleFetch: getBookMoreInfo, data: bookMore, error: bookMoreError } = useAPIFetch({
        url: getUrl({ 
            endpoint: "BOOK_MORE_INFO", 
            pathParams: { book_id: useParams().id } // retrieve book id from url
        })
    });

    const { handleFetch: getBookListings, data: bookListings, error: bookListingsError } = useAPIFetch({
        url: getUrl({ 
            endpoint: "BOOK_LISTINGS", 
            pathParams: { book_id: useParams().id } // retrieve book id from url
        })
    });

    const { handleFetch: orderBook, error: createError } = useAPIFetch({
        url: getUrl({ endpoint: "ORDERS" }), 
        method: "POST", 
        body: { user_id: authState.user.id, book_id: useParams().id }
    });

    const handleOrder = () => {
        if(book.quantity === 0) {
            alert("Book out of stock!");
            return;
        }
        
        if(authState.isAuth) {
            const quantity = prompt('Enter the quantity:');

            if(!quantity) return;

            const parsedQuantity = parseInt(Number(quantity), 10);

            if(!isNaN(parsedQuantity) && parsedQuantity > 0 && parsedQuantity <= book.quantity) {
                setIsOrdering(true);
                orderBook({ quantity: parsedQuantity })
                .then((order) => {
                    if(order) {
                        console.log("Book [" + order.book.title + "] correctly ordered!")
                        alert("Book [" + order.book.title + "] correctly ordered! Check your orders for more details.");
                        book.quantity -= parsedQuantity;
                    }
                })
                .then(() => setIsOrdering(false));
            } else { 
                alert("Invalid quantity!");
            }
        } else {
            window.location.href = "/authentication?redirect=" + encodeURIComponent(window.location.pathname);
        }
    }
    
    const handleOrderError = () => {
		if(createError){
			const errorMessage = createError ? createError : "check console for more details.";
            alert("Error while ordering book [" + book.title + "]: " + errorMessage);
		}
	}

    useEffect(() => { getBookDetails() }, []); // on load, get book details
    useEffect(() => { getBookMoreInfo() }, []); // on load, get book more info
    useEffect(() => { getBookListings() }, []); // on load, get book listings
    useEffect(() => { handleOrderError() }, [createError]); // on order error, show alert

    const goBack = () => { window.history.back(); };

    return (
        <>
        { bookError || bookMoreError || bookListingsError ? (
                <ErrorPage eCode={(bookError || bookMoreError || bookListingsError)?.status} eText={(bookError || bookMoreError || bookListingsError)?.message} />
            ) : (
                <>
                    {isOrdering && <LoadingSpinner position="fixed"/>}
                    <Navigation />
                    <Container className="p-5">
                        <Button variant="link" onClick={goBack}>Go back</Button>
                        { book ? (
                            <Card className="d-flex flex-column h-100">
                                <Row>
                                    <Col md={4} className="d-flex align-items-center">
                                        <Card.Img variant="top" src={book.cover} className="p-3"/>
                                    </Col>
                                    <Col md={8}>
                                        <Card.Body>
                                            <Card.Title>{book.title} [{book.id}]</Card.Title>
                                            <Card.Subtitle className="text-muted">{book.author}</Card.Subtitle>
                                            <hr></hr>
                                            <Card.Text><b>Description: </b>{book.description}</Card.Text>
                                            <Card.Text><b>Price: </b>{book.price}€</Card.Text>
                                            <Card.Text><b>Quantity: </b>{book.quantity > 0 ? book.quantity : <span style={{color: "red"}}>Out of stock</span>}</Card.Text>
                                            { bookMore ? (
                                                <>
                                                { bookMore.first_publish_year && <Card.Text><b>First publish year: </b>{bookMore.first_publish_year}</Card.Text> }
                                                { bookMore.number_of_pages && <Card.Text><b>Number of pages: </b>{bookMore.number_of_pages}</Card.Text> }
                                                { bookMore.rating && <Card.Text><b>Average Rating: </b>{bookMore.rating}</Card.Text> }
                                                { bookMore.character &&
                                                    <Stack direction="horizontal">
                                                        <b>Characters: </b>
                                                        <Row className="ms-2 g-2">
                                                            {bookMore.characters.map((character, index) => (
                                                                <Col key={index}>
                                                                    <Badge bg="info">{character}</Badge>
                                                                </Col>
                                                            ))}
                                                        </Row>
                                                    </Stack>
                                                }
                                                { bookMore.first_sentence &&
                                                    <Container className="py-3 px-0">
                                                        <b>First sentences: </b>
                                                        <ListGroup>
                                                            {bookMore.first_sentence.map((sentence, index) => (
                                                                <ListGroup.Item key={index}>"{sentence}"</ListGroup.Item>
                                                            ))}
                                                        </ListGroup>
                                                    </Container>
                                                }
                                                { bookMore.languages &&
                                                    <Stack direction="horizontal">
                                                        <b>Languages: </b>
                                                        <Row className="ms-2 g-2">
                                                            {bookMore.languages.map((language, index) => (
                                                                <Col key={index}>
                                                                    <Badge pill bg="secondary">{language}</Badge>
                                                                </Col>
                                                            ))}
                                                        </Row>
                                                    </Stack>
                                                }
                                                </>
                                            ) : (
                                                <LoadingSpinner />
                                                )
                                            }
                                        </Card.Body>
                                    </Col>
                                </Row>
                                <Card.Footer className="d-flex justify-content-end p-2 align-items-end">
                                    <Button variant="warning" onClick={handleOrder}>Order</Button>
                                </Card.Footer>
                            </Card>
                        ) : (
                            <LoadingSpinner />
                            )
                        }
                        <br></br>
                        <h1 style={{marginTop: "20px"}}>Related Amazon Listings</h1>
                        { bookListings ? (
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Name</th>
                                        <th>Stars</th>
                                        <th>Price</th>
                                        <th>Link</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookListings?.map((listing, index) => (
                                        <tr key={index}>
                                            <td><img alt="Cover" width="100px" src={listing.image}/></td>
                                            <td style={{ maxWidth: "500px" }}>{listing?.name}</td>
                                            <td>{listing?.stars}</td>
                                            <td>{listing?.price}</td>
                                            <td><a href={listing?.url} target="_blank" rel="noreferrer">Link</a></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        ) : (
                            <LoadingSpinner />
                            )
                        }
                    </Container>
                </>
            )}
        </>
    );
};

export default Book;