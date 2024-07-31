import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  handledAPIPatch,
  handledAPIGet,
  handledAPIPost,
  handleAPIDelete,
} from "../services/Api";
import { gasProviders } from "../services/gasProvider.js";
import {
  Navbar,
  Nav,
  Dropdown,
  Image,
  Button,
  Container,
} from "react-bootstrap";
import { isAuthenticated } from "../services/Auth";
import { DateTimePicker } from "./datePicker.jsx";
import CreateBooking from "./CreateBooking.jsx";
import EditBooking from "./EditBooking.jsx";

const DashboardPage = () => {
  let initialStateErrors = {
    email: { required: false },
    password: { required: false },
    name: { required: false },
    phone: { required: false },
    address: { required: false },
    pincode: { required: false },
    custom_error: null,
  };

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: 0o0,
    address: "",
    pincode: 0o0,
  });

  const [userbookingData, setUserBookingData] = useState([
    {
      bookingId: "",
      name: "",
      agencyname: "",
      datetime: "",
      status: "",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [isEditBooking, setIsEditBooking] = useState(false);
  const [errors, setErrors] = useState(initialStateErrors);
  let bookingsArr = [];
  useEffect(() => {
    let name = JSON.parse(localStorage.getItem("userData")).user.name;
    let email = JSON.parse(localStorage.getItem("userData")).user.email;
    setUserData({ name, email });
    handledAPIGet("/booking/" + name)
      .then((response) => {
        if (response.data.booking.length > 0) {
          setUserBookingData(response.data.booking);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleLogout = async () => {
    localStorage.clear();
    isAuthenticated();
    return <Navigate to="/" />;
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    let errors = initialStateErrors;
    let hasError = false;
    if (userData.name == "") {
      errors.name.required = true;
      hasError = true;
    }
    if (userData.email == "") {
      errors.email.required = true;
      hasError = true;
    }
    if (userData.phone == 0) {
      errors.phone.required = true;
      hasError = true;
    }
    if (userData.address == "") {
      errors.address.required = true;
      hasError = true;
    }
    if (userData.pincode == 0) {
      errors.pincode.required = true;
      hasError = true;
    }
    setErrors({ ...errors });
    try {
      if (!hasError) {
        setLoading(true);
        // TODO: Handle Update Profile
        await handledAPIPatch("/profile/update", userData)
          .then((response) => {
            console.log(response);
            alert(response.data.message);
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
          .finally(() => {
            setLoading(false);
          });
      }
    } catch (error) {
      alert(error);
    }
  };

  const handleGetProfile = async () => {
    setLoading(true);
    // TODO: Handle Get Profile
    handledAPIGet(`/profile/get/${userData.email}`)
      .then((response) => {
        console.log(response);
        setUserData({
          name: response.data.user.name,
          email: response.data.user.email,
          phone: response.data.user.phone,
          address: response.data.user.address,
          pincode: response.data.user.pincode,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // const [editBookingData, setEditBookingData] = useState();
  // // {
  // // bookingId: "",
  // // name: "",
  // // agencyname: "",
  // // datetime: "",
  // // status: "",
  // // }

  let editbooking;
  const handleEditBooking = async (bookingValue) => {
    setIsEditBooking(!isEditBooking);
    localStorage.setItem("bookingValue", JSON.stringify(bookingValue));
  };

  const handleDeleteBooking = async (bookingid) => {
    handleAPIDelete("/booking/" + bookingid)
      .then((response) => {
        alert(response.data.message);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        window.location.reload();
        <Navigate to="/dashboard" />;
      });
  };

  if (!isAuthenticated()) {
    return <Navigate to="/Login" />;
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark ">
        <div className="container-sm container-md">
          <div className="col-6">
            <a className="navbar-brand" href="/dashboard">
              Dashboard
            </a>
          </div>
          <div className="dropdown mt-2">
            <button
              className="btn bg-white text-dark dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
            >
              <i
                style={{ fontSize: "1.10rem" }}
                className="bi bi-person-circle"
              ></i>
              <span className="mx-2" style={{ fontSize: "1.10rem" }}>
                {userData.name}
              </span>
            </button>
            <ul className="dropdown-menu">
              <li>
                <button
                  type="button"
                  className="dropdown-item"
                  data-bs-toggle="modal"
                  data-bs-target="#UserProfile"
                  onClick={handleGetProfile}
                >
                  My Profile
                </button>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <Link className="dropdown-item" onClick={handleLogout} to="/">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {isEditBooking ? <EditBooking /> : <CreateBooking />}

      <div className="container mt-5 ">
        <div className="container">
          <div className="col-12">
            <h3>Booking History</h3>
          </div>
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead>
                <tr>
                  <th scope="col">Booking Number</th>
                  <th scope="col">Name</th>
                  <th scope="col">Agency Name</th>
                  <th scope="col">Date Time</th>
                  <th scope="col">Status</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {userbookingData.map((booking, index) => (
                  <tr key={index}>
                    <td>{booking.bookingid}</td>
                    <td>{booking.name}</td>
                    <td>{booking.agencyname}</td>
                    <td>{booking.datetime}</td>
                    <td>{booking.status}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={() => handleEditBooking(booking)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger mx-3"
                        onClick={() => handleDeleteBooking(booking.bookingid)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Profile Model */}
      <div className="modal fade mt-5" id="UserProfile">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center">Profile</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <form action="">
                <div className="mb-3">
                  <label htmlFor="userName" className="form-label">
                    Name
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={userData.name}
                    placeholder="Name"
                    disabled
                  />
                  {errors.name.required && (
                    <span className="text-danger">Name is required.</span>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="userEmail" className="form-label">
                    Email
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={userData.email}
                    placeholder="Email"
                    disabled
                  />
                  {errors.email.required && (
                    <span className="text-danger">Email is required.</span>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="userPhone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    className="form-control"
                    type="number"
                    maxLength={10}
                    name="phone"
                    onChange={handleChange}
                    value={userData.phone}
                    placeholder="Phone Number"
                  />
                  {errors.phone.required && (
                    <span className="text-danger">Phone is required.</span>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="userAddress" className="form-label">
                    Address
                  </label>
                  <input
                    className="form-control"
                    id="taskName"
                    type="text"
                    name="address"
                    onChange={handleChange}
                    maxLength={500}
                    value={userData.address}
                    placeholder="Address"
                  />
                  {errors.address.required && (
                    <span className="text-danger">Address is required.</span>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="userPincode" className="form-label">
                    Pin Code
                  </label>
                  <input
                    className="form-control"
                    id="taskName"
                    type="number"
                    name="pincode"
                    onChange={handleChange}
                    maxLength={6}
                    value={userData.pincode}
                    placeholder="Pin Code"
                  />
                  {errors.pincode.required && (
                    <span className="text-danger">Pin Code is required.</span>
                  )}
                </div>
              </form>
            </div>
            <div className="modal-footer">
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
              <button
                type="submit"
                className="btn btn-outline-primary"
                onClick={handleUpdateProfile}
              >
                Update Profile
              </button>
              <button className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default DashboardPage;
