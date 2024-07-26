import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./RegistrationPage.css";
import { handledAPIPost } from "../services/Api";

const Registration = () => {
  const initialStateErrors = {
    email: { required: false },
    password: { required: false },
    name: { required: false },
    custom_error: null,
  };
  //For Error message
  const [errors, setErrors] = useState(initialStateErrors);

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
    let errors = initialStateErrors;
    let hasError = false;
    if (formData.name == "") {
      errors.name.required = true;
      hasError = true;
    }
    if (formData.email == "") {
      errors.email.required = true;
      hasError = true;
    }
    if (formData.password == "") {
      errors.password.required = true;
      hasError = true;
    }
    setErrors(errors);
    try {
      if (!hasError) {
        setLoading(true);
      }
      handledAPIPost(formData)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
      // const response = await handledAPIPost("/register", formData);
      // alert(response.msg || "");
    } catch (err) {
      alert(err.message);
    }

    setFormData({
      name: "",
      email: "",
      password: "",
    });
  };

  return (
    <section className="register-block">
      <div className="container">
        <div className="row ">
          <div className="col register-sec">
            <h2 className="text-center">Register Now</h2>
            <form onSubmit={handleSubmit} className="register-form" action="">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-uppercase">
                  Name
                </label>

                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  name="name"
                  value={formData.name}
                  id=""
                />
                {errors.name.required && (
                  <span className="text-danger">Name is required.</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-uppercase">
                  Email
                </label>

                <input
                  type="text"
                  className="form-control"
                  onChange={handleChange}
                  name="email"
                  value={formData.email}
                  id=""
                />
                {errors.email.required && (
                  <span className="text-danger">Email is required.</span>
                )}
              </div>
              <div className="form-group">
                <label
                  htmlFor="exampleInputPassword1"
                  className="text-uppercase"
                >
                  Password
                </label>
                <input
                  className="form-control"
                  type="password"
                  onChange={handleChange}
                  name="password"
                  value={formData.password}
                  id=""
                />
                {errors.password.required && (
                  <span className="text-danger">Password is required.</span>
                )}
              </div>
              <div className="form-group">
                <span className="text-danger">
                  {errors.custom_error && <p>Custom Error Message!</p>}
                </span>
                {loading && (
                  <div className="text-center">
                    <div className="spinner-border text-primary " role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                )}

                <input
                  type="submit"
                  className="btn btn-login float-right"
                  disabled={loading}
                  value="Register"
                />
              </div>
              <div className="clearfix"></div>
              <div className="form-group">
                Already have account ? Please <a href="#">Login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
