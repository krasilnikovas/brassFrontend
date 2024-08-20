import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import backgroundImage from '../assets/BrassGame_Atmosphere.jpg';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8080/api/auth/login', { username, password })
            .then(response => {
                localStorage.setItem('username', response.data.username);
                navigate('/profile');
            })
            .catch(error => {
                setError('Invalid username or password');
            });
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center login-container"
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <div className="card p-4 login-card">
                <h2 className="card-title text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-danger">{error}</p>}
                    <button type="submit" className="btn btn-primary btn-block mt-3">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
