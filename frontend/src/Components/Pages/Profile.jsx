import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import Navbar from '../Nav/Nav';
import { toast, ToastContainer } from 'react-toastify';

function Profile() {
    const { user, login } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [newName, setNewName] = useState(user?.name || "");
    const [newPass, setNewPass] = useState("");

    useEffect(() => {
        if (user) {
            axios.get(`http://localhost:5000/api/orders/${user.id}`)
                .then(res => setOrders(res.data))
                .catch(err => console.log(err));
        }
    }, [user]);

    const handleUpdateName = async (e) => {
        e.preventDefault();
        try {
            await axios.put('http://localhost:5000/api/user/update', { id: user.id, name: newName });
            // Update the global context so the Navbar name changes too!
            login({ ...user, name: newName }, localStorage.getItem('token'));
            toast.success("Name updated!");
        } catch (err) { toast.error("Update failed"); }
    };

    if (!user) return <div className="text-center py-5 mt-5">Please login to view your profile.</div>;

    return (
        <>
            <Navbar />
            <div className="container py-5 mt-5">
                <h1 className="display-5 fw-bold mb-5" style={{fontFamily: 'Playfair Display'}}>My Account</h1>
                
                <div className="row g-5">
                    {/* LEFT: Profile Settings */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm p-4 rounded-4 bg-white">
                            <h4 className="fw-bold mb-4" style={{color: '#2D402E'}}>Profile Settings</h4>
                            <form onSubmit={handleUpdateName}>
                                <label className="small fw-bold text-muted">FULL NAME</label>
                                <input type="text" className="form-control mb-3 border-0 bg-light" value={newName} onChange={(e)=>setNewName(e.target.value)} />
                                <button className="btn btn-dark w-100 py-2">Update Name</button>
                            </form>
                            
                            <hr className="my-4" />
                            
                            <h5 className="fw-bold mb-3">Security</h5>
                            <input type="password" placeholder="New Password" className="form-control mb-3 border-0 bg-light" onChange={(e)=>setNewPass(e.target.value)} />
                            <button className="btn btn-outline-dark w-100 py-2">Change Password</button>
                        </div>
                    </div>

                    {/* RIGHT: Order History */}
                    <div className="col-lg-8">
                        <h4 className="fw-bold mb-4" style={{color: '#2D402E'}}>Order History</h4>
                        {orders.length === 0 ? (
                            <div className="alert alert-light border">You haven't placed any orders yet.</div>
                        ) : (
                            orders.map(order => (
                                <div key={order.id} className="card border-0 shadow-sm mb-3 p-4 rounded-4 bg-white transition-hover">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h6 className="fw-bold m-0">Order #{order.id}</h6>
                                            <small className="text-muted">{new Date(order.order_date).toLocaleDateString()}</small>
                                        </div>
                                        <div className="text-end">
                                            <span className={`badge px-3 py-2 rounded-pill ${order.status === 'Processing' ? 'bg-warning text-dark' : 'bg-success'}`}>
                                                {order.status.toUpperCase()}
                                            </span>
                                            <h5 className="mt-2 fw-bold text-dark">Rs. {order.total_amount}</h5>
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