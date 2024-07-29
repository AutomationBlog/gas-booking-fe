import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Dropdown,
  Image,
  Button,
  Container,
} from "react-bootstrap";
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

  const [showDropdown, setShowDropdown] = useState(false);
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  if (!isAuthenticated()) {
    return <Navigate to="/Login" />;
  }

  return (
    <>
      <nav class="navbar navbar-dark bg-dark ">
        <div class="container-sm container-md">
          <div class="col-6">
            <a class="navbar-brand" href="/dashboard">
              Dashboard
            </a>
          </div>
          <div class="dropdown mt-2">
            <image src="/profile-picture.png" />
            <button
              class="btn bg-white text-dark dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              <img
                src="/profile-picture.png"
                style={{ width: "30px", height: "30px" }}
              />
              <span class="mx-2 mt-1">{userData.name}</span>
            </button>
            <ul class="dropdown-menu">
              <li>
                <a class="dropdown-item">My Profile</a>
              </li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li>
                <Link class="dropdown-item" onClick={handleLogout} to="/">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};
export default DashboardPage;
