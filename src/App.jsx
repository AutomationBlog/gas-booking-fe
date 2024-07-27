import "./App.css";
import Home from "./pages/Home.jsx";
import Login from "./pages/LoginPage.jsx";
import Registration from "./pages/RegistrationPage.jsx";
import Dashboard from "./pages/DashboardPage.jsx";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
