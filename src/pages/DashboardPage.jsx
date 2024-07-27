import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Navbar, Nav, Dropdown, Image, Button } from "react-bootstrap";
import { UserDetailsApi } from "../services/Api";
import { isAuthenticated } from "../services/Auth";

const DashboardPage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  useEffect(() => {
    let name = JSON.parse(localStorage.getItem("userData")).user.name;
    let email = JSON.parse(localStorage.getItem("userData")).user.email;
    setUserData({ name, email });
  }, []);

  const handleLogout = async () => {
    localStorage.clear();
    isAuthenticated();
    return <Navigate to="/" />;
  };

  if (!isAuthenticated()) {
    return <Navigate to="/Login" />;
  }

  return (
    <main role="main" className="container mt-5">
      <div className="container">
        <div className="text-center mt-5">
          <h3>Dashboard page</h3>

          {userData.name && userData.email ? (
            <div>
              <p className="text-bold ">Hi {userData.name},</p>
              <p className="text-bold ">Your Email is {userData.email}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <Link to="/">
          <Button onClick={handleLogout} variant="primary" className="mt-3">
            Logout
          </Button>
        </Link>
      </div>
    </main>
  );
};
export default DashboardPage;
