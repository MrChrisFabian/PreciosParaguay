import { Navigate } from "react-router-dom";
import {UserContext} from '../context/UserContext';
import { useContext } from "react";

const PrivateRoute = (props) => {
    const { redirectPath = "/login", children } = props;
    const { user } = useContext(UserContext);

    return <>{!user ? <Navigate to={redirectPath} replace /> : children}</>;
};


export default PrivateRoute