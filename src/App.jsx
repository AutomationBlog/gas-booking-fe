import "./App.css";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Registration from "./pages/RegistrationPage.jsx";

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
        </Routes>
      </Router>
    </>
  );
}

export default App;
