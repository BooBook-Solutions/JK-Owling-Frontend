import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../Components/Context/AuthContext";

function AuthRoute({ children }) {

	const { authState } = useAuthContext();

    const redirect = decodeURIComponent(new URLSearchParams(useLocation().search).get('redirect') ?? "") || "/";
	
	if (authState.isAuth) {
		return <Navigate to={redirect} />
	}
	
	return children;
}

export default AuthRoute;
