import { Navigate } from "react-router-dom";
import {UserContext} from '../context/UserContext';
import { useContext } from "react";

const PublicRoute = (props) => {
    const { redirectPath = "/login", children } = props;
    const { user } = useContext(UserContext);

    return <>{!user ? <Navigate to={redirectPath} replace /> : children}</>;
};


export default PublicRoute