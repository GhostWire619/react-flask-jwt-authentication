import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./components/login-context";
import Login from "./components/login"; // Login/Register component
import Dashboard from "./components/dashbord"; // Protected component

import PrivateRoute from "./components/private"; // Custom route for protected routes

const App: React.FC = () => {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          {/* <Route path="/settings" element={<PrivateRoute element={<Settings />} />} /> */}
          <Route path="*" element={<Login />} />
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;
