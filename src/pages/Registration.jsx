import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    userType: "customer",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      //   const response = await handledAPIPost("/register", formData);
      alert(response.msg || "");
    } catch (err) {
      alert(err.message);
    }

    setFormData({
      name: "",
      mobile: "",
      email: "",
      userType: "customer",
      password: "",
    });
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={6}>
          <h1 className="text-center mb-4">Registration</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Mobile Number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              Submit
            </Button>
          </Form>
          <p className="text-center mt-4">
            Already have an account? <a href="/login">Login</a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
