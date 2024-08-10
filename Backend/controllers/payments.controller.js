const { createRazorpayInstance } = require("../config/razorpay.config");
const crypto=require("crypto");
const paymentModel = require("../models/paymentModel");
require("dotenv").config();

const razorpayInstance=createRazorpayInstance()

exports.checkout = async (req, res) => {
    try {
        const amountInDollars = Number(req.body.amount); // Amount in dollars
        const amountInCents = Math.round(amountInDollars * 100); // Convert to cents and round to nearest integer

      const options = {
        amount: amountInCents, // Amount in cents
        currency: "USD", // Change currency to USD
        receipt: `receipt_order_${Date.now()}`, // Adding a receipt
      };
      const order = await razorpayInstance.orders.create(options);
      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      console.error("Error in checkout:", error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  };

  exports.paymentVerification =async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest('hex');
  
    const isAuthentic = (expectedSignature === razorpay_signature);
  
    if (isAuthentic) {

      //Create the Entry in the Database
      await paymentModel.create({
        razorpay_order_id, 
        razorpay_payment_id, 
        razorpay_signature
      })
      // Redirect to client-side success page with payment details
      const successUrl = `http://localhost:3000/payment-success?paymentId=${razorpay_payment_id}`;
      res.redirect(successUrl);
    } else {
      res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  };