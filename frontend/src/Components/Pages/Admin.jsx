import React, { useState, useEffect, useContext } from 'react'; // FIXED: Added missing imports
import { useNavigate } from 'react-router-dom'; // FIXED: Added missing import
import axios from 'axios';
import { AuthContext } from '../../AuthContext'; // Ensure this path is correct
import Navbar from '../Nav/Nav';
import { toast, ToastContainer } from 'react-toastify';

function Admin() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [stats, setStats] = useState({ totalUsers: 0, totalSales: 0 });
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);

    // --- SECURITY CHECK ---
    useEffect(() => {
        // If user is not logged in OR is not an admin, kick them to home
        // We use a small timeout to let the AuthContext load first
        const checkAuth = () => {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (!storedUser || storedUser.role !== 'admin') {
                navigate('/');
            }
        };
        checkAuth();
    }, [user, navigate]);

    const fetchData = async () => {
        try {
            // 1. Fetch Stats
            const s = await axios.get('http://localhost:5000/api/admin/stats');
            setStats(s.data);

            // 2. Fetch Orders
            const o = await axios.get('http://localhost:5000/api/admin/orders');
            setOrders(Array.isArray(o.data) ? o.data : []);

            // 3. Fetch Products (Handling the new {products: [], totalPages: X} format)
            const p = await axios.get('http://localhost:5000/api/products?limit=100');
            if (p.data && p.data.products) {
                setProducts(p.data.products);
            }
        } catch (err) { 
            console.error("Admin Fetch Error:", err);
            // Don't toast here to avoid loop, just log
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/orders/${orderId}`, { status: newStatus });
            toast.success("Order Updated to " + newStatus);
            fetchData();
        } catch (err) { toast.error("Failed to update status"); }
    };

    const handleDeleteProduct = async (id) => {
        if(window.confirm("Are you sure you want to delete this product from the database?")) {
            try {
                await axios.delete(`http://localhost:5000/api/products/${id}`);
                toast.error("Product Permanentally Deleted");
                fetchData();
            } catch (err) { toast.error("Delete failed"); }
        }
    };

    if (!user || user.role !== 'admin') return null; // Prevent flicker before redirect

    return (
        <>
            <Navbar />
            <div className="container py-5 mt-5">
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <h1 className="fw-bold m-0" style={{fontFamily: 'Playfair Display', color: 'var(--primary-green)'}}>Management Dashboard</h1>
                    <span className="badge bg-danger px-3 py-2">ADMIN ACCESS</span>
                </div>

                {/* STATS CARDS */}
                <div className="row g-4 mb-5">
                    <div className="col-md-6">
                        <div className="card border-0 shadow-sm p-4 rounded-4 bg-white border-start border-5" style={{borderColor: '#B4975A'}}>
                            <h6 className="text-muted small fw-bold text-uppercase">Total Revenue</h6>
                            <h2 className="fw-bold">Rs. {Number(stats.totalSales).toLocaleString()}</h2>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card border-0 shadow-sm p-4 rounded-4 bg-white border-start border-5" style={{borderColor: 'var(--primary-green)'}}>
                            <h6 className="text-muted small fw-bold text-uppercase">Registered Users</h6>
                            <h2 className="fw-bold">{stats.totalUsers}</h2>
                        </div>
                    </div>
                </div>

                {/* ORDER MANAGEMENT */}
                <div className="card border-0 shadow-sm rounded-4 p-4 mb-5 bg-white">
                    <h4 className="fw-bold mb-4" style={{color: 'var(--primary-green)'}}>Incoming Orders</h4>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>Order</th>
                                    <th>Customer Email</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order.id}>
                                        <td>#{order.id}</td>
                                        <td>{order.customer_email}</td>
                                        <td className="fw-bold">Rs. {order.total_amount}</td>
                                        <td>
                                            <span className={`badge ${order.status === 'Processing' ? 'bg-warning text-dark' : 'bg-success'}`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td>
                                            <select 
                                                className="form-select form-select-sm w-auto" 
                                                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                value=""
                                            >
                                                <option value="" disabled>Change Status</option>
                                                <option value="Processing">Processing</option>
                                                <option value="Shipped">Shipped</option>
                                                <option value="Delivered">Delivered</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* PRODUCT INVENTORY */}
                <div className="card border-0 shadow-sm rounded-4 p-4 bg-white">
                    <h4 className="fw-bold mb-4" style={{color: 'var(--primary-green)'}}>Inventory Control</h4>
                    <div className="list-group list-group-flush">
                        {products.map(p => (
                            <div key={p.id} className="list-group-item d-flex justify-content-between align-items-center py-3 border-bottom-0">
                                <div className="d-flex align-items-center">
                                    <img src={p.image} width="60" height="60" className="rounded-3 me-3 border" style={{objectFit: 'cover'}} alt=""/>
                                    <div>
                                        <h6 className="fw-bold mb-0">{p.pname}</h6>
                                        <small className="text-muted">ID: {p.id} | Rs. {p.price}</small>
                                    </div>
                                </div>
                                <button className="btn btn-outline-danger btn-sm rounded-pill px-3" onClick={() => handleDeleteProduct(p.id)}>
                                    <i className="bi bi-trash me-1"></i> Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <ToastContainer position="bottom-right" />
        </>
    );
}

export default Admin;