import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
    const { roleName } = useSelector((store) => store.auth);
    if (roleName == null) {
        return <Navigate to='/login' />
    }
    // else if (roleName == 'asm' || roleName == 'tl' || roleName == 'promoter' || roleName == 'merchandiser') {
    else if (roleName == "tl" || roleName == 'npc' || roleName == 'npm' || roleName == 'ta' || roleName == 'asm' || roleName == 'ase' || roleName == 'se') {
        return children
    } else {
        return <Navigate to='/admin/dashboard' />
    }
}
export default UserRoute;