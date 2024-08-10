import React, { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ amount, isLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!isLoggedIn) { // Check if user is not logged in
      toast.error('Please log in to complete the payment.');
      navigate('/login'); // Redirect to login page
      return;
    }

    try {
      const { data } = await axios.post("http://localhost:5000/api/checkout", { amount });
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: data.order.amount,
        currency: data.order.currency,
        name: "Ecomzy",
        description: "Test Transaction",
        order_id: data.order.id,
        callback_url: "http://localhost:5000/api/paymentVerification",
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Razorpay Corporate Office"
        },
        theme: {
          color: "#3399cc",
        }
      };

      const razor = new window.Razorpay(options);
      razor.on('payment.success', async (response) => {
        toast.success('Payment successful!');
        window.location.href = `/payment-success?paymentId=${response.razorpay_payment_id}`;
      });
      razor.on('payment.failed', () => {
        toast.error('Payment failed. Please try again.');
      });
      razor.open();
    } catch (error) {
      console.error("Payment error:", error.response ? error.response.data : error.message);
      toast.error("Payment failed. Please try again.");
    }
  };

  const checkoutButtonStyle = {
    backgroundColor: '#38a169',
    color: 'white',
    borderRadius: '0.375rem',
    height: '3rem',
    width: '18rem',
  };

  return (
    <button style={checkoutButtonStyle} onClick={handlePayment}>
      Checkout Now
    </button>
  );
};

export default Checkout;