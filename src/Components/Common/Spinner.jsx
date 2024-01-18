import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner({position = "relative"}) {
  return (
	<div className="overlay" style={{position: position}}>
		<Spinner animation="border" role="status" />
	</div>
  );
}

export default LoadingSpinner;