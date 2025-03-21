// // frontend/src/pages/HomePage.js
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomePage = () => {
    const [message, setMessage] = useState('');

    const claimCoupon = async () => {
        try {
            const ipResponse = await axios.get('https://api64.ipify.org?format=json');
        const ipAddress = ipResponse.data.ip;
        const browserSession = localStorage.getItem("sessionID") || Date.now().toString();
           

            const response = await axios.post('https://rrcd.onrender.com/api/coupons/claim', { ipAddress, browserSession });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
        <div className="card shadow p-4 text-center">
            <h1 className="text-primary">🎉 Claim Your Coupon! 🎉</h1>
            <p className="text-muted">Click the button below to claim a coupon.</p>
            <button onClick={claimCoupon} className="btn btn-success btn-lg">Claim Coupon</button>
            {message && <div className="alert alert-info mt-3">{message}</div>}
        </div>
    </div>
    );
};

export default HomePage;
