import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Components/Context/AuthContext";

function AdminRoute({ children }) {
    const { authState } = useAuthContext();

    if (!authState.isAuth) {
        return <Navigate to="/authentication" />;
    }

    if (!authState.isAdmin) {
        return <Navigate to="/permission-denied" state={{ code: 403, message: "Permission denied" }}/>;
    }

    return children;
}

export default AdminRoute;
