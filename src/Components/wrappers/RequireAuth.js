import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ children, navPath }) => {
  const authedUser = useSelector((state) => state.authedUser);
  const location = useLocation();

  return authedUser ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
};

export default RequireAuth;
