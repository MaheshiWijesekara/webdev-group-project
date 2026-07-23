import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import Navbar from '../Nav/Nav';
import { toast, ToastContainer } from 'react-toastify';

function Profile() {
    const { user, login } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [newName, setNewName] = useState("");
    const [newPass, setNewPass] = useState("");

    // Update the input field if the user data changes
    useEffect(() => {
        if (user) {
            setNewName(user.name);
        }
    }, [user]);

    const fetchOrders = async () => {
        if (user && user.id) {
            try {
                const res = await axios.get(`http://localhost:5000/api/orders/${user.id}`);
                setOrders(Array.isArray(res.data) ? res.data : []);
            } catch (err) {
                console.error("Fetch Orders Error:", err);
            }
        }
    };

    useEffect(() => {
        fetchOrders();
    }, [user]);

    const handleUpdateName = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:5000/api/user/update', { id: user.id, name: newName });
            const token = localStorage.getItem('token');
            // Update context so Navbar updates immediately
            login({ ...user, name: newName }, token);
            toast.success("Name updated successfully!");
        } catch (err) {
            toast.error("Update failed");
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (!newPass) return toast.error("Please enter a new password");
        try {
            await axios.put('http://localhost:5000/api/user/password', { id: user.id, newPassword: newPass });
            setNewPass("");
            toast.success("Password changed successfully!");
        } catch (err) {
            toast.error("Password update failed");
        }
    };

    if (!user) return (
        <>
            <Navbar />
            <div className="text-center py-5 mt-5">
                <h3>Please login to view your profile.</h3>
            </div>
        </>
    );

    return (
        <>
            <Navbar />
            <div className="container py-5 mt-5">
                <h1 className="display-5 fw-bold mb-5" style={{ fontFamily: 'Playfair Display', color: 'var(--primary-green)' }}>
                    My Account
                </h1>
                
                <div className="row g-5">
                    {/* LEFT: Profile Settings */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
                            <h4 className="fw-bold mb-4">Profile Settings</h4>
                            
                            {/* Update Name Form */}
                            <form onSubmit={handleUpdateName} className="mb-4">
                                <label className="small fw-bold text-muted text-uppercase mb-2">Full Name</label>
                                <input 
                                    type="text" 
                                    className="form-control mb-3 border-0 bg-light py-2" 
                                    value={newName} 
                                    onChange={(e) => setNewName(e.target.value)} 
                                    required 
                                />
                                <button className="btn btn-dark w-100 py-2 fw-bold">UPDATE NAME</button>
                            </form>
                            
                            <hr className="my-4" />
                            
                            {/* Update Password Form */}
                            <form onSubmit={handleUpdatePassword}>
                                <h5 className="fw-bold mb-3">Security</h5>
                                <label className="small fw-bold text-muted text-uppercase mb-2">New Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Enter new password" 
                                    className="form-control mb-3 border-0 bg-light py-2" 
                                    value={newPass}
                                    onChange={(e) => setNewPass(e.target.value)} 
                                />
                                <button className="btn btn-outline-dark w-100 py-2 fw-bold">CHANGE PASSWORD</button>
                            </form>
                        </div>
                    </div>

                    {/* RIGHT: Order History */}
                    <div className="col-lg-8">
                        <h4 className="fw-bold mb-4">Order History</h4>
                        
                        {orders.length === 0 ? (
                            <div className="alert alert-light border text-center py-4 rounded-4">
                                <p className="mb-0 text-muted">You haven't placed any orders yet.</p>
                                <Link to="/Shop" className="btn btn-link text-dark mt-2">Start Shopping</Link>
                            </div>
                        ) : (
                            orders.map(order => (
                                <div key={order.id} className="card border-0 shadow-sm mb-3 p-4 rounded-4 bg-white">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 className="fw-bold m-0">Order #{order.id}</h6>
                                            <small className="text-muted">
                                                {/* FIXED: Uses order_date to match SQL */}
                                                {order.order_date ? new Date(order.order_date).toLocaleDateString() : "Date Pending"}
                                            </small>
                                        </div>
                                        <div className="text-end">
                                            <span className={`badge px-3 py-2 rounded-pill ${order.status === 'Processing' ? 'bg-warning text-dark' : 'bg-success'}`}>
                                                {(order.status || "Processing").toUpperCase()}
                                            </span>
                                            {/* FIXED: Uses total_amount to match SQL */}
                                            <h5 className="mt-2 fw-bold text-dark">
                                                Rs. {order.total_amount ? Number(order.total_amount).toLocaleString(undefined, {minimumFractionDigits: 2}) : "0.00"}
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-right" />
        </>
    );
}

export default Profile;