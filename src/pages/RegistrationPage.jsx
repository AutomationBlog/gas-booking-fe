import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./RegistrationPage.css";
import { handledAPIPost } from "../services/Api";
import { storeUserData } from "../services/Storage";
import { isAuthenticated } from "../services/Auth";
import { Link, Navigate } from "react-router-dom";
import validator from "validator";

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

  const handleSubmit = async (e) => {
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
    if (validator.isEmail(formData.email) == false) {
      errors.custom_error = "Email is not valid";
      hasError = true;
    }
    if (
      validator.isStrongPassword(formData.password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false,
        pointsPerUnique: 1,
        pointsPerRepeat: 0.5,
        pointsForContainingLower: 10,
        pointsForContainingUpper: 10,
        pointsForContainingNumber: 10,
        pointsForContainingSymbol: 10,
      }) == false
    ) {
      errors.custom_error =
        "Password is not strong" +
        "\n" +
        "Password must contain at least 8 characters, 1 lowercase, 1 uppercase, 1 number, 1 symbol";
      hasError = true;
    }
    setErrors({ ...errors });
    try {
      if (!hasError) {
        setLoading(true);

        await handledAPIPost("/api/auth/register", formData)
          .then((response) => {
            storeUserData(response.data);
          })
          .catch((err) => {
            console.log(err);
            if (err.response.status == 400) {
              setErrors((prevData) => ({
                ...prevData,
                custom_error: String(err.response.data.message),
              }));
            }
          })
          .finally(() => setLoading(false));
      }
    } catch (err) {
      alert(err.message);
    }

    // setFormData({
    //   name: "",
    //   email: "",
    //   password: "",
    // });
  };

  if (isAuthenticated()) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <section className="container-fluid mt-5">
      <div className="container-lg col-sm col-md-6 col-lg-6">
        <div className="row justify-content-center">
          <div className="container-sm-md col-lg-6 p-4 bg-dark-subtle rounded-3 register-sec">
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
              <div className="form-group  mt-2">
                <span className="text-danger text-center">
                  {errors.custom_error && <p>{errors.custom_error}</p>}
                </span>
                {loading && (
                  <div className="text-center">
                    <div className="spinner-border text-primary " role="status">
                      {/* <span className="sr-only">Loading...</span> */}
                    </div>
                  </div>
                )}
                <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn btn-outline-primary"
                    disabled={loading}
                    value="Register"
                  >
                    Register
                  </button>
                </div>
              </div>
              <div className="clearfix"></div>
              <div className="form-group text-center">
                Already have account ? Please <Link to={"/login"}>Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
