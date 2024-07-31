import React, { useEffect, useState } from "react";
import { gasProviders } from "../services/gasProvider";
import { handledAPIPost } from "../services/Api";
import { Navigate } from "react-router-dom";

export default function CreateBooking() {
  let initalBookingErrors = {
    agencyname: { required: false },
    datetime: { required: false },
    custom_error: null,
  };
  const [bookingData, setBookingData] = useState({
    name: "",
    agencyname: "",
    datetime: "",
  });

  const [bookingErrors, setBookingErrors] = useState(initalBookingErrors);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChangeBooking = (event) => {
    const { name, value } = event.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    let name = JSON.parse(localStorage.getItem("userData")).user.name;
    setBookingData({ name: name });
  }, []);

  const handleCreateBooking = async (event) => {
    event.preventDefault();
    let errors = initalBookingErrors;
    let hasError = false;
    if (bookingData.agencyname == "") {
      bookingErrors.agencyname.required = true;
      hasError = true;
    }
    if (bookingData.datetime == "") {
      bookingErrors.datetime.required = true;
      hasError = true;
    }
    setBookingErrors({ ...errors });

    try {
      if (!hasError) {
        setLoading(true);
        handledAPIPost("/booking/create", bookingData)
          .then((response) => {
            //   alert(response.data.message);
            setSuccess(response.data.message);
          })
          .catch((err) => {
            console.log(err);
            setBookingErrors((prevData) => ({
              ...prevData,
              custom_error: String(err.response.data.message),
            }));
          })
          .finally(() => {
            setLoading(false);
            <Navigate to="/dashboard" />;
          });
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container">
      <div className="container mt-5 ">
        <div className="col-12">
          <h3>Create Booking</h3>
          <div className="row">
            <form className="col-5" onSubmit={handleCreateBooking}>
              <div className="mb-3">
                <label htmlFor="Agency" className="form-label">
                  Select Agency
                </label>
                <select
                  className="form-select"
                  name="agencyname"
                  onChange={handleChangeBooking}
                  value={bookingData.agencyname}
                >
                  {gasProviders.map((provider, index) => (
                    <option key={index} value={provider.label}>
                      {provider.label}
                    </option>
                  ))}
                </select>
                {bookingErrors.agencyname.required && (
                  <span className="text-danger">Agency Name is required.</span>
                )}
              </div>
              <div className="mb-3 mr-2">
                <label htmlFor="Time Slot" className="form-label">
                  Select Date and Time Slot (Format : 12/03/2024 10:30 AM)
                </label>
                {/* <DateTimePicker /> */}
                <input
                  className="form-control"
                  type="text"
                  name="datetime"
                  onChange={handleChangeBooking}
                  value={bookingData.datetime}
                  placeholder="DD/MM/YYYY HH:MM AM/PM"
                />
                {bookingErrors.datetime.required && (
                  <span className="text-danger">
                    Date and Time is required.
                  </span>
                )}
              </div>
              <div className="text-center">
                {loading && (
                  <div className="spinner-border text-primary " role="status">
                    {/* <span className="sr-only">Loading...</span> */}
                  </div>
                )}
              </div>
              <span className="text-danger text-center">
                {bookingErrors.custom_error && (
                  <p>{bookingErrors.custom_error}</p>
                )}
              </span>
              <span className="text-success text-center">
                {success && <p>{success}</p>}
              </span>
              <button
                type="button"
                className="btn btn-outline-success mt-3"
                onClick={handleCreateBooking}
              >
                Create Booking
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
