import React from "react";
import { Button } from "react-bootstrap";

const Home = () => {
  return (
    <div className="container">
      <h1 className="text-center mt-5">Gas Booking</h1>
      <div className="container d-flex justify-content-center align-items-center mt-4">
        <Button href="/login" variant="outline-primary">
          Login
        </Button>
        <Button href="/registration" variant="outline-primary" className="ms-3">
          Register
        </Button>
      </div>
    </div>
  );
};

export default Home;
