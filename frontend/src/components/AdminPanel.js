import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminPanel = () => {
    const [coupons, setCoupons] = useState([]);
    const [newCoupon, setNewCoupon] = useState({ code: ''});
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchCoupons();
    }, []);

    const fetchCoupons = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/view');
            setCoupons(response.data);
        } catch (error) {
            console.error("Error fetching coupons:", error);
        }
    };

    const addCoupon = async () => {
        try {
            await axios.post('http://localhost:5000/api/admin/add', newCoupon);
            setMessage('✅ Coupon added successfully!');
            setNewCoupon({ code: '' });
            fetchCoupons();
        } catch (error) {
            console.error("Error adding coupon:", error);
            setMessage('❌ Failed to add coupon!');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center text-primary">📌 Admin Panel</h1>
            <div className="card p-4 shadow-lg">
                <h4>Add New Coupon</h4>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Coupon Code" value={newCoupon.code} onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })} />
                </div>
                <button onClick={addCoupon} className="btn btn-success w-100">➕ Add Coupon</button>
                {message && <p className="text-success mt-2">{message}</p>}
            </div>
            <h3 className="mt-4 text-center">📜 Coupons List</h3>
            <ul className="list-group">
                {coupons.map((coupon) => (
                    <li key={coupon._id} className="list-group-item d-flex justify-content-between align-items-center">
                        <strong>{coupon.code}</strong>
                        <span className={`badge ${coupon.isClaimed ? "bg-danger" : "bg-success"}`}>
                            {coupon.isClaimed ? "Claimed" : "Available"}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminPanel;
