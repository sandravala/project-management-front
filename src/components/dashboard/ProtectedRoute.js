import {useSelector} from "react-redux";
import {Navigate, useLocation} from "react-router-dom";
import { boolean } from "yup";
import {getLoggedInUser} from "../../store/slices/UserSlice";

const ProtectedRoute = ({children, roles}) => {
    const user = useSelector(({persistedUser}) =>  persistedUser?.userDto)
    const location = useLocation()


    console.log("user: ");
    console.log(!!user);
    
    const roleBool =!roles;
    console.log("roles passed: ");
    console.log(roles);
    console.log("roles to bool: ");
    console.log(roleBool);
    // if user is logged in and have any role from required ones
    // allow all logged-in users, if no roles was passed as parameter
    if (!!user && (!roles || user.roles.some(r => roles.includes(r)))) {
        return children;
    }
    return <Navigate to="/" state={{from: location, greeting: false}} replace/>
}

export default ProtectedRoute