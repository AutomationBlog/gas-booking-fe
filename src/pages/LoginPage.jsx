import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./LoginPage.css";
import { isAuthenticated } from "../services/Auth";
import { handledAPIPost } from "../services/Api";
import { storeUserData } from "../services/Storage";

const Login = () => {
  let initialStateErrors = {
    email: { required: false },
    password: { required: false },
    custom_error: null,
  };

  const [loginform, setLoginform] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(initialStateErrors);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginform((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = initialStateErrors;
    let hasError = false;
    if (loginform.email == "") {
      errors.email.required = true;
      hasError = true;
    }
    if (loginform.password == "") {
      errors.password.required = true;
      hasError = true;
    }
    setErrors({ ...errors });
    try {
      if (!hasError) {
        setLoading(true);

        // TODO: Handle login submission
        await handledAPIPost("/api/auth/login", loginform)
          .then((response) => {
            storeUserData(response.data);
          })
          .catch((err) => {
            console.log(err);
            if (
              err.response.status == 400 ||
              err.response.status == 401 ||
              err.response.status == 403 ||
              err.response.status == 404
            ) {
              setErrors((prevData) => ({
                ...prevData,
                custom_error: String(err.response.data.message),
              }));
            }
          })
          .finally(() => setLoading(false));
      }
    } catch (error) {
      alert(error);
    }

    setLoginform({
      email: "",
      password: "",
    });
  };

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <section className="container-fluid mt-5">
      <div className="container-lg col-sm col-md-6 col-lg-6">
        <div className="row justify-content-center">
          <div className="container-sm-md col-lg-6 p-4 bg-dark-subtle rounded-3 login-sec">
            <h2 className="text-center">Login Now</h2>
            <form onSubmit={handleSubmit} className="login-form" action="">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1" className="text-uppercase">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  onChange={handleChange}
                  name="email"
                  value={loginform.email}
                  id=""
                  placeholder="email"
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
                  value={loginform.password}
                  placeholder="password"
                  id=""
                />
                {errors.password.required && (
                  <span className="text-danger">Password is required.</span>
                )}
              </div>
              <div className="form-group mt-2">
                <div className="text-center">
                  {loading && (
                    <div className="spinner-border text-primary " role="status">
                      {/* <span className="sr-only">Loading...</span> */}
                    </div>
                  )}
                </div>
                <span className="text-danger text-center">
                  {errors.custom_error && <p>{errors.custom_error}</p>}
                </span>
                <div className="d-grid justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-outline-primary"
                    disabled={loading}
                  >
                    Login
                  </button>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="form-group text-center">
                Create new account ? Please{" "}
                <Link to="/registration">Register</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
