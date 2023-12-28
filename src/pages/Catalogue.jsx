import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import BookList from "../Components/Common/BookList";
import Navigation from "../Components/Common/Navbar";
import LoadingSpinner from "../Components/Common/Spinner";

import ErrorPage from "./ErrorPage";

import useFetch from "../Hooks/useAPIFetch";
import getUrl from "../Endpoints/endpoints";

function Catalogue(){

  const [catalogue, setCatalogue] = useState(null);
  const [error, setError] = useState(null);

  const { data: books, error: booksError } = useFetch(getUrl("ALL_BOOKS"))

  useEffect(() => {
    books ? setCatalogue(books) : setError(booksError);
  }, [books, booksError])

  return (
      <>
      { !catalogue && !error ? (
          <LoadingSpinner />
      ) : (
          error ? (
              <ErrorPage eCode={error?.status} eText={error?.message} />
          ) : (
              <>
                  <Navigation />
                  <Container className="m-5">
                      { catalogue?.length > 0 ? <BookList books={catalogue} page={8} pagination={"center"} type={"catalogue"}/> : "Empty" }
                  </Container>
              </>
          )
      )}
      </>
  );
}

export default Catalogue;
