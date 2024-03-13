import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoute = (props) => {
  console.log("check props: ", props);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login"></Navigate>; // Redirect
  }
  return <>{props.children}</>;
};
export default PrivateRoute;
