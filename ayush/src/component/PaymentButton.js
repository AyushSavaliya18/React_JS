import React from "react";
import axios from "axios";
const PaymentButton = () => {
  const handlePayment = async () => {
    try {
      // Create order on the backend
      const {data} = await axios.post("http://localhost:8000/create-order", {
        amount: 500, // Amount in INR
        currency: "INR",
      });
      const options = {
        key: "YOUR_KEY_ID", // Replace with your Razorpay Key ID
        amount: data.amount,
        currency: data.currency,
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: data.id, // Razorpay Order ID
        handler: (response) => {
          alert(`Payment ID: ${response.razorpay_payment_id}`);
          alert(`Order ID: ${response.razorpay_order_id}`);
          alert(`Signature: ${response.razorpay_signature}`);
        },
        prefill: {
          name: "Your Name",
          email: "your.email@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };
  return <button onClick={handlePayment}>Pay Now</button>;
};
export default PaymentButton;
