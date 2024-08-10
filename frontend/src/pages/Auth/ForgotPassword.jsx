import React, { useState } from 'react';
import "./ForgotPassword.css"; // Updated CSS file name
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [answer, setAnswer] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/forgot-password`, {
                email,
                newpassword,
                answer
            });

            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="forgot-password-container">
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <div className="forgot-password-input-box">
                    <label htmlFor="forgotPasswordInputEmail" className="forgot-password-form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="forgot-password-form-control"
                        id="forgotPasswordInputEmail"
                        required
                    />
                </div>
                <div className="forgot-password-input-box">
                    <label htmlFor="forgotPasswordInputNewPassword" className="forgot-password-form-label">
                        New Password
                    </label>
                    <div className="forgot-password-password-container">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            value={newpassword}
                            onChange={(e) => setNewpassword(e.target.value)}
                            className="forgot-password-form-control"
                            id="forgotPasswordInputNewPassword"
                            required
                        />
                        {newpassword && (
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="forgot-password-password-toggle-btn"
                            >
                                <img
                                    src={`/icons/${passwordVisible ? 'eye-crossed.svg' : 'eye.svg'}`}
                                    alt={passwordVisible ? "Hide password" : "Show password"}
                                    className="forgot-password-eye-icon"
                                />
                            </button>
                        )}
                    </div>
                </div>
                <div className="forgot-password-input-box">
                    <label htmlFor="forgotPasswordInputAnswer" className="forgot-password-form-label">
                        Name of your favorite childhood friend?
                    </label>
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="forgot-password-form-control"
                        id="forgotPasswordInputAnswer"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="forgot-password-btn-primary"
                >
                    Reset
                </button>
                <Toaster />
            </form>
        </div>
    );
}

export default ForgotPassword;
