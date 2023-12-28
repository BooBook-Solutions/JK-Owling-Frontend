import { Container } from "react-bootstrap";
import BookList from "../Components/Common/BookList";
import Navigation from "../Components/Common/Navbar";
import { useEffect, useState } from "react";
import useFetch from "../Hooks/useAPIFetch";
import LoadingSpinner from "../Components/Common/Spinner";

function Catalogue(){

  const [books, setBooks] = useState(null);

  const { data: bookData, error: bookError } = useFetch("http://localhost:8000/api/books")

  useEffect(() => {
    if(bookData) { setBooks(bookData.books); }
  }, [bookData, bookError])

  return (
    <>
    <Navigation />
    <Container className="m-5">
        { 
          books ? (
              books?.length > 0 ? <BookList books={books} page={8} pagination={"center"} type={"catalogue"}/> : "Empty"
          ) : (
              <LoadingSpinner />
          )
        }
    </Container>
    </>
  );
}

export default Catalogue;
