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

    const [showProductForm, setShowProductForm] = useState(false);
    const [newProduct, setNewProduct] = useState({
    pname: '', pdescription: '', price: '', tag: 'New', 
    category: 'Skin', subcategory: 'Cleanser', rating: 5
});
    const [mainFile, setMainFile] = useState(null);
    const [secondFile, setSecondFile] = useState(null);

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

    const handleAddProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // Append text fields
    Object.keys(newProduct).forEach(key => formData.append(key, newProduct[key]));
    // Append files
    formData.append('image', mainFile);
    formData.append('secondImage', secondFile);

    try {
        await axios.post('http://localhost:5000/api/products', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success("Product Added!");
        setShowProductForm(false);
        fetchData(); // Refresh grid
    } catch (err) { toast.error("Failed to add product"); }
};

    if (!user || user.role !== 'admin') return null; // Prevent flicker before redirect

    return (
        <>
            <Navbar />
            <div className="container py-5 mt-5">
                <div className="d-flex justify-content-between align-items-center mb-5">
                    <h1 className="fw-bold m-0" style={{fontFamily: 'Playfair Display', color: 'var(--primary-green)'}}>Management Dashboard</h1>
                    <span className="badge bg-danger px-3 py-2">ADMIN ACCESS</span>
                    <button className="btn btn-dark px-4 py-2" onClick={() => setShowProductForm(true)}>
    + Add New Product
</button>
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

                
                
{/* PRODUCT INVENTORY SECTION */}
<div className="card border-0 shadow-sm rounded-4 p-4">
    <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-4 gap-3">
        <div>
            <h4 className="fw-bold m-0" style={{color: 'var(--primary-green)'}}>Inventory Control</h4>
            <p className="text-muted small m-0">Total Stock: {products.length} Products</p>
        </div>
        
        {/* Admin Search (Optional but very helpful for 42 items) */}
        <div className="position-relative" style={{maxWidth: '300px'}}>
            <input 
                type="text" 
                className="form-control form-control-sm ps-4 rounded-pill" 
                placeholder="Find a product..." 
                onChange={(e) => {
                    const term = e.target.value.toLowerCase();
                    // Basic local search logic
                    setProducts(products.filter(p => p.pname.toLowerCase().includes(term)));
                }}
            />
            <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-2 text-muted small"></i>
        </div>
    </div>

    {/* THE GRID: 4 Items per row (col-lg-3) */}
    <div className="row g-3">
        {products.map(p => (
            <div key={p.id} className="col-xl-3 col-lg-4 col-sm-6">
                <div className="card h-100 border-0 bg-light p-2 transition-hover text-center" style={{borderRadius: '15px'}}>
                    {/* Compact Image */}
                    <div className="rounded-3 overflow-hidden mb-2" style={{height: '120px'}}>
                        <img 
                            src={p.image} 
                            className="w-100 h-100 object-fit-cover" 
                            alt="" 
                            loading="lazy"
                        />
                    </div>

                    {/* Compact Info */}
                    <p className="fw-bold small mb-1 text-truncate px-2" title={p.pname}>
                        {p.pname}
                    </p>
                    <p className="text-muted extra-small mb-2" style={{fontSize: '0.75rem'}}>
                        ID: {p.id} | <span className="text-success fw-bold">Rs.{p.price}</span>
                    </p>

                    {/* Small Delete Button */}
                    <div className="px-2 pb-1 mt-auto">
                        <button 
                            className="btn btn-danger btn-sm w-100 rounded-pill py-1" 
                            style={{fontSize: '0.75rem'}}
                            onClick={() => handleDeleteProduct(p.id)}
                        >
                            <i className="bi bi-trash3 me-1"></i> REMOVE
                        </button>
                    </div>
                </div>
            </div>
        ))}
    </div>
</div>
            </div>
            <ToastContainer position="bottom-right" />
            {showProductForm && (
    <div className="modal show d-block" style={{backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1060}}>
        <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content p-4 border-0 rounded-4 shadow-lg" style={{maxHeight: '90vh', overflowY: 'auto'}}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-bold m-0">Add Botanical Product</h3>
                    <button className="btn-close" onClick={() => setShowProductForm(false)}></button>
                </div>
                
                <form onSubmit={handleAddProduct} className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label small fw-bold">Product Name</label>
                        <input type="text" className="form-control" onChange={(e)=>setNewProduct({...newProduct, pname: e.target.value})} required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label small fw-bold">Price (Numeric)</label>
                        <input type="number" className="form-control" onChange={(e)=>setNewProduct({...newProduct, price: e.target.value})} required />
                    </div>
                    <div className="col-12">
                        <label className="form-label small fw-bold">Description</label>
                        <textarea className="form-control" rows="3" onChange={(e)=>setNewProduct({...newProduct, pdescription: e.target.value})} required></textarea>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label small fw-bold">Category</label>
                        <select className="form-select" onChange={(e)=>setNewProduct({...newProduct, category: e.target.value})}>
                            <option value="Skin">Skin Care</option>
                            <option value="Lip">Lip Care</option>
                            <option value="Body">Body Care</option>
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label className="form-label small fw-bold">Subcategory</label>
                        <input type="text" className="form-control" placeholder="e.g. Cleanser" onChange={(e)=>setNewProduct({...newProduct, subcategory: e.target.value})} />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label small fw-bold">Tag</label>
                        <select className="form-select" onChange={(e)=>setNewProduct({...newProduct, tag: e.target.value})}>
                            <option value="New">New</option>
                            <option value="Sale">Sale</option>
                            <option value="Best">Best Seller</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label className="form-label small fw-bold">Main Image</label>
                        <input type="file" className="form-control" onChange={(e)=>setMainFile(e.target.files[0])} required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label small fw-bold">Hover Image</label>
                        <input type="file" className="form-control" onChange={(e)=>setSecondFile(e.target.files[0])} required />
                    </div>
                    
                    <div className="col-12 mt-4">
                        <button type="submit" className="btn btn-dark w-100 py-3 fw-bold">PUBLISH TO STORE</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
)}
        </>
    );
}

export default Admin;