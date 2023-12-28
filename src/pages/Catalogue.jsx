import React, { useEffect } from "react";
import Container from 'react-bootstrap/Container';

import BookList from "../Components/Common/BookList";
import Navigation from "../Components/Common/Navbar";
import LoadingSpinner from "../Components/Common/Spinner";

import ErrorPage from "./ErrorPage";

import useAPIFetch from '../Hooks/useAPIFetch';
import getUrl from "../Endpoints/endpoints";

function Catalogue(){

  const { handleFetch: getBooks, data: catalogue, error } = useAPIFetch({url: getUrl("ALL_BOOKS")})

  useEffect(() => {
    getBooks();
  }, [])

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