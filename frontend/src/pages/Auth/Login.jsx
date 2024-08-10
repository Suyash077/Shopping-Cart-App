import React, { useState } from 'react';
import "./Login.css";
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from '../../components/context/auth';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/login`, { email, password });
            if (res && res.data.success) {
                toast.success(res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("token", res.data.token); 
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state || "/");
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
        <div className="login-container">
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit}>
                <div className="login-input-box">
                    <label htmlFor="loginInputEmail" className="login-form-label">
                        Email address
                    </label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="login-form-control" 
                        id="loginInputEmail" 
                        required 
                    />
                </div>
                <div className="login-input-box">
                    <label htmlFor="loginInputPassword" className="login-form-label">
                        Password
                    </label>
                    <div className="login-password-container">
                        <input 
                            type={passwordVisible ? "text" : "password"} 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="login-form-control" 
                            id="loginInputPassword" 
                            required 
                        />
                        {password && (
                            <button 
                                type="button" 
                                onClick={togglePasswordVisibility} 
                                className="login-password-toggle-btn"
                            >
                                <img 
                                    src={`/icons/${passwordVisible ? 'eye-crossed.svg' : 'eye.svg'}`} 
                                    alt={passwordVisible ? "Hide password" : "Show password"} 
                                    className="login-eye-icon" 
                                />
                            </button>
                        )}
                    </div>
                </div>
                <a href="/forgot-password" className="login-forgot-password">
                    Forgot Password?
                </a>
                <button type="submit" className="login-submit-btn">
                    Login
                </button>
                <Toaster />
            </form>
        </div>
    );
}

export default Login;
