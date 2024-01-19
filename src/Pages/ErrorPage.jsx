import { useLocation } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import { Button } from "react-bootstrap";

function ErrorPage({ eCode, eText}) {

    const location = useLocation();
    const { code, message } = location.state || { code: eCode, message: eText };

    return (
        <>
        <Container>
            <div className="centered-div">
                <div style={{textAlign: "center"}}>
                    <h1>{code}</h1>
                    <h3>{message}</h3>
                    <Button variant="link" onClick={() => window.history.back()}>Go back</Button>
                </div>
                <br></br>
            </div>
        </Container>
        </>
    );
}

export default ErrorPage;