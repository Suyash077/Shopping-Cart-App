const express=require("express");
const router=express.Router();

const {registerController, testController, forgotPasswordController, updateProfileController, verifyToken}=require("../controllers/authController");
const {loginController}=require("../controllers/authController")
const {requireSignIN, isAdmin}=require("../middlewares/authMiddleware");

//Register
router.post("/register",registerController);
//Login
router.post("/login",loginController);

//Forgot Password
router.post("/forgot-password",forgotPasswordController);

//test-Routes
router.get("/test",requireSignIN,isAdmin,testController);

//protected user-route auth
router.get("/user-auth",requireSignIN,(req,res) => {
    res.status(200).send({ok : true});
});

//protected Admin-route auth
router.get("/admin-auth",requireSignIN,isAdmin,(req,res) => {
    res.status(200).send({ok : true});
});

//update-profile
router.put("/profile",requireSignIN,updateProfileController);
module.exports=router;