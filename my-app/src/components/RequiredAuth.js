import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/authContext";

function RequireAuth(props) {
    const {children} = props;
    const {isAuthenticated} = useAuthContext();
    return isAuthenticated ? children : <Navigate to="/login"/>;
}

export default RequireAuth;