const jwt=require("jsonwebtoken");
const userModel = require("../models/userModel");
require("dotenv").config();

exports.requireSignIN = async (req, res, next) => {
    console.log('Request Headers:', req.headers); // Log headers for debugging
        const token = req.header("Authorization")?.replace("Bearer ", "");
    
        if (!token) {
            return res.status(401).json({
                success: false,
                message: `Token missing`
            });
        }   
    console.log('Token:', token);
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Payload:', payload);
        // req.user = payload; // Attach payload to request
        req.user = await userModel.findById(payload.id);//************** */
        next();
    } catch (error) {
        console.log('Token verification error:', error);
        return res.status(401).json({
            success: false,
            message: `Token is Invalid`,
        });
    }
};


exports.isAdmin = async (req,res,next) => {
    try{
        const user=await userModel.findById(req.user.id);
        if(req.user.role !== 1)
        {
           return res.status(401).json({
                success:false,
                message:`This is a protected route for Admin`,
            });
        }
        next();
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:`User Role is not matching`,
        })
    }
}


