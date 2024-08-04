## GAS Booking APP

GAS Booking APP

## Gas Booking APP

First start the backend API and then start the frontend app.

[Gas Booking Backend API](https://gas-booking-api.onrender.com/)

[Gas Booking Frondend APP](https://gas-booking-app.netlify.app/)

## NPM Package Dependencies

- @reduxjs/toolkit
- axios
- jwt-decode
- react
- react-bootstrap
- react-datepicker
- react-dom
- react-redux
- react-router-dom
- validator

npm install @reduxjs/toolkit axios jwt-decode react react-bootstrap react-datepicker react-dom react-redux react-router-dom validator

## Testing

npm run dev

## .env

    VITE_LOCAL_URL=http://localhost:3000
    VITE_CLOUD_URL=https://gas-booking-api.onrender.com
    VITE_isLOCAL="false"
    VITE_RAZORPAY_KEY_ID=KEY_ID

## Page URLs

- "/" - Home
- "/login" - Login
- "/register" - Registration
- "/dashboard" - User Dashboard
- "/admin" - Admin Dashboard

## Functionality

- Login - with email and password
- Registration - with name, email and password
- User Dahsboard
  - Profile - name, email, phone, address, pincode
    - Update Profile
  - Logout
    - Logout and Redirect to Home
  - Booking
    - Add
      - Add with agency name and delivery date
    - View
      - Booking Id, Name, Agency Name, Delivery Date, Status
    - Edit
      - Edit Agency Name and Delivery Date of booking
    - Payment
      - Payment of booking using Razorpay
    - Delete
      - Delete booking from DB
- Admin Dashboard
  - Profile - name, email, phone, address, pincode
    - Update Profile
  - Logout
    - Logout and Redirect to Home
  - Bookings
    - View all user bookings
      - Booking Id, Name, Agency Name, Delivery Date, Status
    - Edit all user bookings
      - Edit Agency Name, Delivery Date and Status of booking
    - Delete all user bookings
      - Delete booking from DB

## Admin Login

    Username: admin@gmail.com
    Password: admin

## Git Repository

[Backend Repository](https://github.com/automationblog/gas-booking-be)

[Frontend Repository](https://github.com/automationblog/gas-booking-fe)
