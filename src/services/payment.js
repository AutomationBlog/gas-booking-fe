import axios from "axios";
import { handledAPIPatch } from "./Api";

export const handlePayment = async (data) => {
  let name = JSON.parse(localStorage.getItem("bookingValue")).name;
  let email = JSON.parse(localStorage.getItem("bookingValue")).email;
  let phone = JSON.parse(localStorage.getItem("bookingValue")).phone;
  let bookingid = JSON.parse(localStorage.getItem("bookingValue")).bookingid;
  axios.defaults.baseURL = import.meta.env.VITE_CLOUD_URL;
  if (import.meta.env.VITE_isLOCAL === "true") {
    axios.defaults.baseURL = import.meta.env.VITE_LOCAL_URL;
  }
  //   console.log(data);
  const response = await axios.post("/payment/orders", data);
  //   console.log(response.data);
  var options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount: response.data.order.amount,
    currency: "INR",
    name: "Gas Booking",
    description: "Gas Booking Payment",
    image: "https://example.com/gas.png",
    order_id: response.data.id,
    handler: function (response) {
      alert(response.razorpay_payment_id);
      //   alert(response.razorpay_order_id);
      //   alert(response.razorpay_signature);
      handledAPIPatch("/booking/" + bookingid, {
        paymentid: response.razorpay_payment_id,
        status: "Paid",
      }).then((response) => {
        console.log(response);
      });
    },
    prefill: {
      name: name,
      email: email,
      contact: phone,
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
  };

  const paymentObject = new window.Razorpay(options);
  paymentObject.on("pament.failed", function (response) {
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });
  paymentObject.open();
};
