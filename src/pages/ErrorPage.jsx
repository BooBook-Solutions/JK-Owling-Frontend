import { useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';

import "../Styles/style.css";

function ErrorPage({ eCode, eText}) {

  const location = useLocation();
  const { code, message } = location.state || { code: eCode, message: eText };

  const goBack = () => { window.history.back(); };

  return (
    <>
    <Container>
        <div className="centered-div">
            <div style={{textAlign: "center"}}>
                <h1>{code}</h1>
                <h3>{message}</h3>
                <button onClick={goBack}>Go back</button>
            </div>
            <br></br>
        </div>
    </Container>
    </>
  );
}

export default ErrorPage;