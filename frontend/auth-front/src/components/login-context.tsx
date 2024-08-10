import React, { useMemo, useContext, createContext, ReactNode } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

interface AuthContextType {
  cookies: { token?: string };
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<AuthContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cookies, setCookies, removeCookie] = useCookies(["token"]);

  const location = useLocation();
  const navigate = useNavigate();

  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });

      // Set the token in the cookies with the path set to '/'
      setCookies("token", response.data.access_token, { path: "/" });

      if (response.data.access_token) {
        navigate(from, { replace: true });
      } else {
        alert("Token not set");
      }
    } catch (error) {
      alert("Login failed");
    }
  };

  const logout = () => {
    removeCookie("token", { path: "/" }); // Remove the token from cookies
    navigate("/login");
  };

  const value = useMemo(
    () => ({
      cookies,
      login,
      logout,
    }),
    [cookies]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useAuth must be used within a UserProvider");
  }
  return context;
};
