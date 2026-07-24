import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import Navbar from '../Nav/Nav';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { toast, ToastContainer } from 'react-toastify';

function Profile() {
    const { user, login } = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const [newName, setNewName] = useState("");
    const [newPass, setNewPass] = useState("");
    const [showPassword, setShowPassword] = useState(false);

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
            login({ ...user, name: newName }, token);
            toast.success("Name updated successfully!");
        } catch (err) {
            toast.error("Update failed");
        }
    };

    const handleUpdatePassword = async (e) => {
        e.preventDefault();
        if (!newPass) return toast.error("Please enter a new password");
        if (newPass.length < 6) return toast.error("Password must be at least 6 characters");
        try {
            await axios.put('http://localhost:5000/api/user/password', { id: user.id, newPassword: newPass });
            setNewPass("");
            setShowPassword(false);
            toast.success("Password changed successfully!");
        } catch (err) {
            toast.error("Password update failed");
        }
    };

    const getStatusBadgeStyle = (status) => {
        const styles = {
            'Processing': { backgroundColor: '#B4975A', color: 'white' },
            'Shipped': { backgroundColor: '#2D402E', color: 'white' },
            'Delivered': { backgroundColor: '#28a745', color: 'white' }
        };
        return styles[status] || styles['Processing'];
    };

    if (!user) return (
        <>
            <Navbar />
            <Breadcrumbs />
            <div className="container py-5">
                <div className="text-center py-5" style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '60px 20px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                    border: '1px solid rgba(45,64,46,0.06)'
                }}>
                    <i className="bi bi-box-arrow-in-right" style={{ fontSize: '4rem', color: '#B4975A', opacity: 0.5 }}></i>
                    <h3 className="mt-3" style={{ fontFamily: 'Playfair Display, serif', color: '#2D402E' }}>
                        Please Login
                    </h3>
                    <p className="text-muted mb-4">You need to be logged in to view your profile.</p>
                    <button 
                        className="btn px-4 py-2"
                        data-bs-toggle="modal" 
                        data-bs-target="#authModal"
                        style={{
                            backgroundColor: '#2D402E',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '0.85rem',
                            letterSpacing: '1px',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#5C4033'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#2D402E'}
                    >
                        <i className="bi bi-box-arrow-in-right me-2"></i> Sign In
                    </button>
                </div>
            </div>
            <ToastContainer position="bottom-right" />
        </>
    );

    return (
        <>
            <Navbar />
            
            {/* Breadcrumbs */}
            <Breadcrumbs />

            {/* Profile Header */}
            <section className="profile-header py-4" style={{
                backgroundColor: 'var(--soft-beige)',
                paddingTop: '30px',
                paddingBottom: '20px'
            }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <span className="d-inline-block mb-2" style={{
                                color: '#B4975A',
                                fontSize: '0.7rem',
                                letterSpacing: '4px',
                                textTransform: 'uppercase',
                                fontWeight: '600'
                            }}>
                                Welcome Back
                            </span>
                            <h1 className="display-3 fw-bold mb-2" style={{
                                fontFamily: 'Playfair Display, serif',
                                color: '#2D402E',
                                letterSpacing: '1px'
                            }}>
                                My <span style={{ color: '#B4975A' }}>Account</span>
                            </h1>
                            <p className="lead" style={{
                                color: '#666',
                                maxWidth: '500px',
                                margin: '0 auto',
                                fontSize: '1rem',
                                lineHeight: '1.8'
                            }}>
                                Manage your profile and view your order history
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container py-4">
                <div className="row g-4">
                    
                    {/* LEFT: Profile Settings */}
                    <div className="col-lg-4">
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: '25px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                            border: '1px solid rgba(45,64,46,0.06)'
                        }}>
                            <h4 className="fw-bold mb-4" style={{
                                fontFamily: 'Playfair Display, serif',
                                color: '#2D402E'
                            }}>
                                Profile Settings
                            </h4>
                            
                            {/* User Avatar/Name Display */}
                            <div className="text-center mb-4">
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    borderRadius: '50%',
                                    backgroundColor: '#F9F7F2',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 10px',
                                    border: '2px solid #B4975A'
                                }}>
                                    <span style={{
                                        fontSize: '2rem',
                                        fontWeight: '600',
                                        color: '#2D402E'
                                    }}>
                                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                                    </span>
                                </div>
                                <h6 className="fw-bold mb-0" style={{ color: '#2D402E' }}>
                                    {user?.name}
                                </h6>
                                <small className="text-muted">{user?.email}</small>
                            </div>

                            {/* Update Name Form */}
                            <form onSubmit={handleUpdateName} className="mb-4">
                                <label className="small fw-bold mb-2 d-block" style={{ 
                                    color: '#666',
                                    letterSpacing: '1px',
                                    fontSize: '0.7rem',
                                    textTransform: 'uppercase'
                                }}>
                                    Full Name
                                </label>
                                <div className="d-flex gap-2">
                                    <input 
                                        type="text" 
                                        className="form-control py-2"
                                        style={{
                                            border: '1px solid #eee',
                                            borderRadius: '8px',
                                            fontSize: '0.9rem',
                                            transition: 'all 0.3s ease'
                                        }}
                                        value={newName} 
                                        onChange={(e) => setNewName(e.target.value)} 
                                        required 
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#B4975A';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(180,151,90,0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#eee';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                    <button 
                                        type="submit"
                                        className="btn px-3"
                                        style={{
                                            backgroundColor: '#2D402E',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            fontSize: '0.75rem',
                                            fontWeight: '600',
                                            letterSpacing: '1px',
                                            whiteSpace: 'nowrap',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = '#5C4033'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = '#2D402E'}
                                    >
                                        Update
                                    </button>
                                </div>
                            </form>
                            
                            <hr style={{ borderColor: 'rgba(45,64,46,0.06)' }} />
                            
                            {/* Update Password Form */}
                            <form onSubmit={handleUpdatePassword}>
                                <h5 className="fw-bold mb-3" style={{
                                    color: '#2D402E',
                                    fontSize: '0.95rem'
                                }}>
                                    <i className="bi bi-shield-lock me-2" style={{ color: '#B4975A' }}></i>
                                    Security
                                </h5>
                                <label className="small fw-bold mb-2 d-block" style={{ 
                                    color: '#666',
                                    letterSpacing: '1px',
                                    fontSize: '0.7rem',
                                    textTransform: 'uppercase'
                                }}>
                                    New Password
                                </label>
                                <div className="position-relative">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="Enter new password" 
                                        className="form-control py-2"
                                        style={{
                                            border: '1px solid #eee',
                                            borderRadius: '8px',
                                            fontSize: '0.9rem',
                                            paddingRight: '45px',
                                            transition: 'all 0.3s ease'
                                        }}
                                        value={newPass}
                                        onChange={(e) => setNewPass(e.target.value)}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#B4975A';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(180,151,90,0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#eee';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                    <button
                                        type="button"
                                        className="position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent"
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            padding: '0 15px',
                                            color: '#999',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                    </button>
                                </div>
                                <small className="text-muted d-block mt-1" style={{ fontSize: '0.7rem' }}>
                                    Password must be at least 6 characters
                                </small>
                                <button 
                                    type="submit"
                                    className="btn w-100 mt-3 py-2 fw-bold"
                                    style={{
                                        backgroundColor: '#B4975A',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '8px',
                                        fontSize: '0.8rem',
                                        letterSpacing: '1px',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#5C4033'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#B4975A'}
                                >
                                    <i className="bi bi-key me-2"></i> Change Password
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* RIGHT: Order History */}
                    <div className="col-lg-8">
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: '25px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                            border: '1px solid rgba(45,64,46,0.06)'
                        }}>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="fw-bold m-0" style={{
                                    fontFamily: 'Playfair Display, serif',
                                    color: '#2D402E'
                                }}>
                                    <i className="bi bi-clock-history me-2" style={{ color: '#B4975A' }}></i>
                                    Order History
                                </h4>
                                <span className="badge" style={{
                                    backgroundColor: '#F9F7F2',
                                    color: '#666',
                                    padding: '5px 15px',
                                    borderRadius: '20px',
                                    fontSize: '0.75rem'
                                }}>
                                    {orders.length} {orders.length === 1 ? 'order' : 'orders'}
                                </span>
                            </div>
                            
                            {orders.length === 0 ? (
                                <div className="text-center py-4" style={{
                                    backgroundColor: '#F9F7F2',
                                    borderRadius: '8px'
                                }}>
                                    <i className="bi bi-box-seam" style={{ fontSize: '2rem', color: '#B4975A', opacity: 0.5 }}></i>
                                    <p className="text-muted mt-2 mb-3">You haven't placed any orders yet.</p>
                                    <Link 
                                        to="/Shop" 
                                        className="text-decoration-none"
                                        style={{
                                            color: '#B4975A',
                                            fontSize: '0.85rem',
                                            fontWeight: '500',
                                            borderBottom: '2px solid #B4975A',
                                            paddingBottom: '2px',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.target.style.color = '#2D402E';
                                            e.target.style.borderBottomColor = '#2D402E';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.target.style.color = '#B4975A';
                                            e.target.style.borderBottomColor = '#B4975A';
                                        }}
                                    >
                                        Start Shopping →
                                    </Link>
                                </div>
                            ) : (
                                <div className="orders-list">
                                    {orders.map((order, index) => (
                                        <div 
                                            key={order.id} 
                                            className="mb-3 p-3"
                                            style={{
                                                backgroundColor: index % 2 === 0 ? '#F9F7F2' : 'white',
                                                borderRadius: '8px',
                                                border: '1px solid rgba(45,64,46,0.06)',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.borderColor = '#B4975A';
                                                e.currentTarget.style.boxShadow = '0 2px 15px rgba(0,0,0,0.05)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.borderColor = 'rgba(45,64,46,0.06)';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}
                                        >
                                            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                                                <div>
                                                    <div className="d-flex align-items-center gap-3">
                                                        <h6 className="fw-bold m-0" style={{ color: '#2D402E' }}>
                                                            Order #{order.id}
                                                        </h6>
                                                        <span 
                                                            className="badge"
                                                            style={{
                                                                backgroundColor: getStatusBadgeStyle(order.status).backgroundColor,
                                                                color: getStatusBadgeStyle(order.status).color,
                                                                padding: '3px 12px',
                                                                borderRadius: '20px',
                                                                fontSize: '0.65rem',
                                                                letterSpacing: '0.5px',
                                                                textTransform: 'uppercase'
                                                            }}
                                                        >
                                                            {order.status || 'Processing'}
                                                        </span>
                                                    </div>
                                                    <small className="text-muted">
                                                        <i className="bi bi-calendar3 me-1"></i>
                                                        {order.order_date ? new Date(order.order_date).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        }) : "Date Pending"}
                                                    </small>
                                                </div>
                                                <div className="text-end">
                                                    <span className="fw-bold" style={{ 
                                                        color: '#2D402E',
                                                        fontSize: '1.1rem'
                                                    }}>
                                                        Rs. {order.total_amount ? Number(order.total_amount).toLocaleString(undefined, {
                                                            minimumFractionDigits: 2
                                                        }) : "0.00"}
                                                    </span>
                                                    <div>
                                                        <small className="text-muted">
                                                            <i className="bi bi-box me-1"></i>
                                                            {order.status === 'Processing' ? 'Being prepared' : 
                                                             order.status === 'Shipped' ? 'On the way' : 
                                                             'Delivered'}
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer position="bottom-right" />
        </>
    );
}

export default Profile;