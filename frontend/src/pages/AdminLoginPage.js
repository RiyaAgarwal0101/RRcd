import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminLoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post('https://rrcd.onrender.com/api/admin/login', { username, password });
            localStorage.setItem('adminToken', response.data.token);
            setMessage('✅ Login successful! Redirecting...');
            setTimeout(() => navigate('/admin/dashboard'), 1000);
        } catch (error) {
            setMessage('❌ Invalid username or password!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card shadow p-4" style={{ width: '400px' }}>
                <h2 className="text-center text-primary">🔑 Admin Login</h2>

                <form onSubmit={handleLogin}>
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3" disabled={loading}>
                        {loading ? '🔄 Logging in...' : '🚀 Login'}
                    </button>
                </form>

                {message && <p className="text-center mt-3" style={{ color: loading ? 'blue' : 'red' }}>{message}</p>}
            </div>
        </div>
    );
};

export default AdminLoginPage;
