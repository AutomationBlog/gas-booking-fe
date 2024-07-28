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

  const [showDropdown, setShowDropdown] = useState(false);
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  if (!isAuthenticated()) {
    return <Navigate to="/Login" />;
  }

  return (
    <>
      <Navbar bg="light" expand="sm" className="flex-row">
        <Navbar.Brand href="/dashboard">
          <span style={{ fontWeight: "2rem", marginLeft: "10px" }}>Home</span>
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Dropdown show={showDropdown} onToggle={handleDropdownToggle}>
              <Dropdown.Toggle variant="button" id="dropdown-basic">
                <Image
                  src="/profile-picture.png"
                  roundedCircle
                  style={{ width: "30px", height: "30px" }}
                />
                <span className="ml-2">{userData.name.toUpperCase()}</span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item>My Profile</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item>
                  <Nav.Link
                    onClick={handleLogout}
                    style={{ cursor: "pointer" }}
                    to="/"
                    as={Link}
                  >
                    Logout
                  </Nav.Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container className="mt-5" fluid>
        <div className="text-center mt-5">
          <h3>Dashboard page</h3>
          <p className="text-bold ">Hi {userData.name},</p>
          <p className="text-bold ">Your Email is {userData.email}</p>
        </div>
      </Container>
    </>
  );
};
export default DashboardPage;
