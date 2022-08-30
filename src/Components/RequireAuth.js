
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";


const RequireAuth = ({children, redirectTo, navPath}) => {

    const authedUser= useSelector(state => state.authedUser);
 
  return authedUser ? children : <Navigate to={redirectTo} replace state={{ from: navPath }}/>;
}

export default RequireAuth;