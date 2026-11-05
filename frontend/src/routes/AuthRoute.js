import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
    const { token } = useSelector((store) => store.auth);

    if (token) {
        return children;
    } else {
        return <Navigate to='/login' />
    }
}
export default AuthRoute;