const express=require("express");
const router=express.Router();

const {checkout, paymentVerification } = require("../controllers/payments.controller");


router.post("/checkout",checkout);
router.post("/paymentVerification", paymentVerification);

module.exports=router;