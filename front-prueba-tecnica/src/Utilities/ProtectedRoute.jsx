import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { logout } from "./GenericFunctions";
import { jwtDecode } from "jwt-decode";

export const ProtectedRoute = ({ children }) => {
  try {
    const data = Cookies.get("accessToken") || null;
    if (data) {
      const decodedToken = jwtDecode(data);
      const currentDate = new Date();
      if (decodedToken.exp * 1000 < currentDate.getTime()) {
        logout();
        return <Navigate to="/" />;
      }
      return token;
    }
    logout();
    return <Navigate to="/" />;
  } catch (error) {
    logout();
    return <Navigate to="/" />;
  }
  return children ? children : <Outlet />;
};
