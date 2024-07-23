import React from "react";
import { Navbar, Nav, Dropdown, Image } from "react-bootstrap";

const LandingPage = ({ username }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">Gas Booking</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Nav>
          <Nav.Link>Hi, {localStorage.getItem("username")}</Nav.Link>
          <Dropdown>
            <Dropdown.Toggle as={Image} src="profile_icon.png" roundedCircle />
            <Dropdown.Menu>
              <Dropdown.Item>Profile</Dropdown.Item>
              <Dropdown.Item>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default LandingPage;
