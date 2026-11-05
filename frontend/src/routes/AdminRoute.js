import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ id, children }) => {
    const { roleName, userData } = useSelector((store) => store.auth);
    if (roleName == "admin" || (roleName == "sub_admin" && userData?.role_permission?.includes(id))) {
        return children
    } 
    else {
        return <Navigate to='/dashboard' />
    }
}

export default AdminRoute;
