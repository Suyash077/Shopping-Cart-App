import React, { useState } from 'react';
import "./Register.css"; // Updated CSS file name
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [answer, setAnswer] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const navigate = useNavigate();

    // Form function
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/register`, {
                name,
                email,
                password,
                phone,
                address,
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

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="register-container">
            <h1>Register Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="register-input-box">
                    <label htmlFor="registerInputName" className="register-form-label">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="register-form-control"
                        id="registerInputName"
                        required
                    />
                </div>
                <div className="register-input-box">
                    <label htmlFor="registerInputEmail" className="register-form-label">Email address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="register-form-control"
                        id="registerInputEmail"
                        required
                    />
                </div>
                <div className="register-input-box">
                    <label htmlFor="registerInputPassword" className="register-form-label">Password</label>
                    <div className="register-password-container">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="register-form-control"
                            id="registerInputPassword"
                            required
                        />
                        {password && (
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="register-password-toggle-btn"
                            >
                                <img
                                    src={`/icons/${passwordVisible ? 'eye-crossed.svg' : 'eye.svg'}`}
                                    alt={passwordVisible ? "Hide password" : "Show password"}
                                    className="register-eye-icon"
                                />
                            </button>
                        )}
                    </div>
                </div>
                <div className="register-input-box">
                    <label htmlFor="registerInputPhone" className="register-form-label">Phone</label>
                    <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="register-form-control"
                        id="registerInputPhone"
                        required
                    />
                </div>
                <div className="register-input-box">
                    <label htmlFor="registerInputAddress" className="register-form-label">Address</label>
                    <input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="register-form-control"
                        id="registerInputAddress"
                        required
                    />
                </div>
                <div className="register-input-box">
                    <label htmlFor="registerInputAnswer" className="register-form-label">
                        Name of your favorite childhood friend?
                    </label>
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="register-form-control"
                        id="registerInputAnswer"
                        required
                    />
                </div>
                <button type="submit" className="register-btn-primary">Register</button>
                <Toaster />
            </form>
        </div>
    );
}

export default Register;
