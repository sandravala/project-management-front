import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import { boolean } from "yup";
import {getLoggedInUser} from "../../store/slices/UserSlice";

const ProtectedRoute = ({children, roles}) => {
    const user = useSelector(({persistedUser}) =>  persistedUser?.userDto)
    const location = useLocation()

    
    const roleBool =!roles;

    // if user is logged in and have any role from required ones
    // allow all logged-in users, if no roles was passed as parameter
    if (!!user && (!roles || user.roles.some(r => roles.includes(r)))) {
        return children;
    }
    return <Navigate to="/" state={{from: location, greeting: false}} replace/>
}

export default ProtectedRoute