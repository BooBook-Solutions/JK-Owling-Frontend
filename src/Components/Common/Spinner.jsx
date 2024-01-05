import Spinner from 'react-bootstrap/Spinner';

import "../../Styles/style.css";

function LoadingSpinner() {
  return (
    <div className="centered-div">
        <Spinner animation="border" role="status" />
    </div>
  );
}

export default LoadingSpinner;