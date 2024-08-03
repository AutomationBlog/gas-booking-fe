// import "./App.css";
import Home from "./pages/Home.jsx";
import Login from "./pages/LoginPage.jsx";
import Registration from "./pages/RegistrationPage.jsx";
import Dashboard from "./pages/DashboardPage.jsx";
import Admin from "./pages/AdminDashboardPage.jsx";

import React, { useState } from "react";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

export const GasBokingContext = React.createContext();

function App() {
  const [dateTime, setDateTime] = useState("");
  return (
    <>
      <GasBokingContext.Provider value={{ dateTime, setDateTime }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Router>
      </GasBokingContext.Provider>
    </>
  );
}

export default App;
