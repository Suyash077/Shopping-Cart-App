const { hashPassword, comparePassword } = require("../helpers/authhelper");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[1-9]\d{1,14}$/;

exports.registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;

    // Validations
    if (!name) {
        return res.send({ message: 'Name is required' });
    }
    if (!email) {
        return res.send({ message: 'Email is required' });
    }
    if (!emailRegex.test(email)) {
        return res.send({ message: 'Invalid email address' });
    }
    if (!password) {
        return res.send({ message: 'Password is required' });
    }
    if (!phone) {
        return res.send({ message: 'Phone is required' });
    }
    if (!phoneRegex.test(phone)) {
        return res.send({ message: 'Invalid phone number' });
    }
    if (!address) {
        return res.send({ message: 'Address is required' });
    }
    if (!answer) {
        return res.send({ message: 'Answer is required' });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
        return res.status(200).json({
            success: false,
            message: "Already Registered Please Login",
        });
    }

    // Register user
    const hashedPassword = await hashPassword(password);
    // Save
    const user = await userModel.create({ name, email, password: hashedPassword, phone, address, answer });
    return res.status(201).json({
        success: true,
        message: "User Registered Successfully",
        user,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
        success: false,
        message: `Error in Registration`,
        error
    });
  }
}

exports.loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(404).json({
                success: false,
                message: `Invalid Email or Password`
            });
        }
        if (!emailRegex.test(email)) {
            return res.status(404).json({
                success: false,
                message: `Invalid Email format`
            });
        }

        // Check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not registered`,
            });
        }

        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).json({
                success: false,
                message: `Invalid Password`,
            });
        }

        const payload = {
            id: user._id,
        };
        // Token
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "3d",
        });
        return res.status(200).json({
            success: true,
            message: `Logged in successfully`,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `Error in login`,
            error,
        });
    }
}

exports.forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newpassword } = req.body;

        if (!email) {
            return res.status(400).send({ message: 'Email is required' });
        }
        if (!emailRegex.test(email)) {
            return res.status(400).send({ message: 'Invalid email address' });
        }
        if (!answer) {
            return res.status(400).send({ message: 'Answer is required' });
        }
        if (!newpassword) {
            return res.status(400).send({ message: 'New Password is required' });
        }

        // Check if the user exists and answer matches
        const user = await userModel.findOne({ email, answer });

        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Wrong Email or Answer'
            });
        }

        // Encrypt the new password
        const hashed = await hashPassword(newpassword);

        // Update the new password in DB
        await userModel.findByIdAndUpdate(user._id, { password: hashed });

        return res.status(200).send({
            success: true,
            message: 'Password Reset Successfully'
        });

    } catch (error) {
        console.error("Error in forgotPasswordController: ", error);
        return res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error: error.message // Include the error message in the response
        });
    }
};

exports.updateProfileController = async (req, res) => {
    try {
        console.log('Received request to update profile');

        // Ensure req.user exists
        if (!req.user || !req.user._id) {
            console.log('User authentication failed');
            return res.status(400).json({ error: 'User authentication failed' });
        }
        console.log('User authenticated:', req.user);

        const { name, email, password, address, phone } = req.body;
        console.log('Received update data:', { name, email, password, address, phone });

        const user = await userModel.findById(req.user._id);
        if (!user) {
            console.log('User not found');
            return res.status(404).json({ error: 'User not found' });
        }
        console.log('User found:', user);

        // Password validation
        if (password && password.length < 6) {
            console.log('Password validation failed');
            return res.json({ error: 'Password is required and must be at least 6 characters long' });
        }

        let hashedPassword;
        if (password) {
            console.log('Hashing password');
            hashedPassword = await hashPassword(password);
            console.log('Password hashed');
        }

        console.log('Updating user profile');
        const updatedUser = await userModel.findByIdAndUpdate(
            req.user._id,
            {
                name: name || user.name,
                password: hashedPassword || user.password,
                phone: phone || user.phone,
                address: address || user.address,
            },
            { new: true }
        );
        console.log('User profile updated:', updatedUser);

        res.status(200).send({
            success: true,
            message: 'Profile Updated Successfully',
            updatedUser,
        });
    } catch (error) {
        console.log('Error while updating profile:', error);
        res.status(400).send({
            success: false,
            message: 'Error while Updating Profile',
            error,
        });
    }
};

exports.testController = (req, res) => {
    res.send("Protected Route for test");
}

