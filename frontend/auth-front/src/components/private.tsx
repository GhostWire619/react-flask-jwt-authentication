import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./login-context";

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const location = useLocation();
  const { cookies } = useAuth();

  return cookies.token ? (
    element
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
