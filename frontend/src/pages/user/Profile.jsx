import React, { useEffect, useState } from 'react';
import UserMenu from '../../components/UserMenu';
import { useAuth } from '../../components/context/auth';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import './Profile.css';

function Profile() {
    const [auth, setAuth] = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    useEffect(() => {
        const { email, name, phone, address } = auth?.user || {};
        setEmail(email);
        setName(name);
        setPhone(phone);
        setAddress(address);
    }, [auth?.user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `${process.env.REACT_APP_API}/api/v1/profile`,
                { name, email, password, phone, address },
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                }
            );

            const { data } = response;

            if (data?.error) {
                toast.error(data.error);
            } else {
                setAuth({ ...auth, user: data.updatedUser });
                let ls = localStorage.getItem('auth');
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem('auth', JSON.stringify(ls));
                toast.success('Profile Updated Successfully');
            }
        } catch (error) {
            console.error('Profile update error:', error);
            toast.error('Something went wrong');
        }
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="profile-container">
            <div className="col-md-3">
                <UserMenu />
            </div>
            <div className="profile-content">
                <div className="profile-form">
                    <h1>User Profile</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <label htmlFor="profileInputName" className="form-label">
                                Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="form-control"
                                id="profileInputName"
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor="profileInputEmail" className="form-label">
                                Email address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-control"
                                id="profileInputEmail"
                                disabled
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor="profileInputPassword" className="form-label">
                                Password
                            </label>
                            <div className="password-container">
                                <input
                                    type={passwordVisible ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="form-control"
                                    id="profileInputPassword"
                                />
                                {password && (
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="password-toggle-btn"
                                    >
                                        <img
                                            src={`/icons/${passwordVisible ? 'eye-crossed.svg' : 'eye.svg'}`}
                                            alt={passwordVisible ? 'Hide password' : 'Show password'}
                                            className="eye-icon"
                                        />
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className="input-box">
                            <label htmlFor="profileInputPhone" className="form-label">
                                Phone
                            </label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="form-control"
                                id="profileInputPhone"
                            />
                        </div>
                        <div className="input-box">
                            <label htmlFor="profileInputAddress" className="form-label">
                                Address
                            </label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="form-control"
                                id="profileInputAddress"
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                        <Toaster />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Profile;
