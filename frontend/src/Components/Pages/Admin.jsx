import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import Navbar from '../Nav/Nav';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { toast, ToastContainer } from 'react-toastify';

function Admin() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [stats, setStats] = useState({ totalUsers: 0, totalSales: 0 });
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [showProductForm, setShowProductForm] = useState(false);
    const [newProduct, setNewProduct] = useState({
        pname: '', pdescription: '', price: '', tag: 'New', 
        category: 'Skin', subcategory: 'Cleanser', rating: 5
    });
    const [mainFile, setMainFile] = useState(null);
    const [secondFile, setSecondFile] = useState(null);

    // --- SECURITY CHECK ---
    useEffect(() => {
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
            const s = await axios.get('http://localhost:5000/api/admin/stats');
            setStats(s.data);

            const o = await axios.get('http://localhost:5000/api/admin/orders');
            setOrders(Array.isArray(o.data) ? o.data : []);

            const p = await axios.get('http://localhost:5000/api/products?limit=100');
            if (p.data && p.data.products) {
                setProducts(p.data.products);
            }
        } catch (err) { 
            console.error("Admin Fetch Error:", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/orders/${orderId}`, { status: newStatus });
            toast.success(`Order #${orderId} updated to ${newStatus}`);
            fetchData();
        } catch (err) { toast.error("Failed to update status"); }
    };

    const handleDeleteProduct = async (id) => {
        if(window.confirm("Are you sure you want to delete this product from the database?")) {
            try {
                await axios.delete(`http://localhost:5000/api/products/${id}`);
                toast.error("Product permanently deleted");
                fetchData();
            } catch (err) { toast.error("Delete failed"); }
        }
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(newProduct).forEach(key => formData.append(key, newProduct[key]));
        formData.append('image', mainFile);
        formData.append('secondImage', secondFile);

        try {
            await axios.post('http://localhost:5000/api/products', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success("Product Added!");
            setShowProductForm(false);
            fetchData();
        } catch (err) { toast.error("Failed to add product"); }
    };

    const getStatusBadgeStyle = (status) => {
        const styles = {
            'Processing': { backgroundColor: '#B4975A', color: 'white' },
            'Shipped': { backgroundColor: '#2D402E', color: 'white' },
            'Delivered': { backgroundColor: '#28a745', color: 'white' }
        };
        return styles[status] || styles['Processing'];
    };

    const filteredProducts = products.filter(product =>
        product.pname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!user || user.role !== 'admin') return null;

    return (
        <>
            <Navbar />
            
            {/* Breadcrumbs */}
            <Breadcrumbs customTitle="Admin Panel" />

            {/* Admin Header */}
            <section className="admin-header py-4" style={{
                backgroundColor: 'var(--soft-beige)',
                paddingTop: '30px',
                paddingBottom: '20px'
            }}>
                <div className="container">
                    <div className="row justify-content-between align-items-center">
                        <div className="col-lg-8">
                            <span className="d-inline-block mb-2" style={{
                                color: '#B4975A',
                                fontSize: '0.7rem',
                                letterSpacing: '4px',
                                textTransform: 'uppercase',
                                fontWeight: '600'
                            }}>
                                Management Dashboard
                            </span>
                            <h1 className="display-3 fw-bold mb-0" style={{
                                fontFamily: 'Playfair Display, serif',
                                color: '#2D402E',
                                letterSpacing: '1px'
                            }}>
                                Admin <span style={{ color: '#B4975A' }}>Panel</span>
                            </h1>
                        </div>
                        <div className="col-lg-4 text-lg-end mt-3 mt-lg-0">
                            <span className="badge me-2" style={{
                                backgroundColor: '#dc3545',
                                color: 'white',
                                padding: '6px 15px',
                                borderRadius: '20px',
                                fontSize: '0.7rem',
                                letterSpacing: '1px'
                            }}>
                                ADMIN ACCESS
                            </span>
                            <button 
                                className="btn px-4 py-2"
                                onClick={() => setShowProductForm(true)}
                                style={{
                                    backgroundColor: '#B4975A',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '8px',
                                    fontSize: '0.8rem',
                                    fontWeight: '600',
                                    letterSpacing: '1px',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#5C4033'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#B4975A'}
                            >
                                <i className="bi bi-plus-lg me-2"></i> Add Product
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container py-4">
                {/* STATS CARDS */}
                <div className="row g-4 mb-4">
                    <div className="col-md-6">
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: '20px 25px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                            border: '1px solid rgba(45,64,46,0.06)',
                            borderLeft: '4px solid #B4975A'
                        }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-muted small fw-bold text-uppercase m-0" style={{ letterSpacing: '1px', fontSize: '0.7rem' }}>
                                        Total Revenue
                                    </p>
                                    <h2 className="fw-bold m-0" style={{ color: '#2D402E' }}>
                                        Rs. {Number(stats.totalSales).toLocaleString()}
                                    </h2>
                                </div>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    backgroundColor: '#F9F7F2',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <i className="bi bi-currency-rupee" style={{ color: '#B4975A', fontSize: '1.5rem' }}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            padding: '20px 25px',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                            border: '1px solid rgba(45,64,46,0.06)',
                            borderLeft: '4px solid #2D402E'
                        }}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="text-muted small fw-bold text-uppercase m-0" style={{ letterSpacing: '1px', fontSize: '0.7rem' }}>
                                        Registered Users
                                    </p>
                                    <h2 className="fw-bold m-0" style={{ color: '#2D402E' }}>
                                        {stats.totalUsers}
                                    </h2>
                                </div>
                                <div style={{
                                    width: '50px',
                                    height: '50px',
                                    borderRadius: '50%',
                                    backgroundColor: '#F9F7F2',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <i className="bi bi-people" style={{ color: '#2D402E', fontSize: '1.5rem' }}></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ORDER MANAGEMENT */}
                <div className="mb-4" style={{
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
                            <i className="bi bi-box-seam me-2" style={{ color: '#B4975A' }}></i>
                            Incoming Orders
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
                            <i className="bi bi-inbox" style={{ fontSize: '2rem', color: '#B4975A', opacity: 0.5 }}></i>
                            <p className="text-muted mt-2 mb-0">No orders yet.</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover align-middle mb-0">
                                <thead style={{ backgroundColor: '#F9F7F2' }}>
                                    <tr>
                                        <th style={{ fontSize: '0.75rem', fontWeight: '600', color: '#666', letterSpacing: '0.5px' }}>Order</th>
                                        <th style={{ fontSize: '0.75rem', fontWeight: '600', color: '#666', letterSpacing: '0.5px' }}>Customer Email</th>
                                        <th style={{ fontSize: '0.75rem', fontWeight: '600', color: '#666', letterSpacing: '0.5px' }}>Amount</th>
                                        <th style={{ fontSize: '0.75rem', fontWeight: '600', color: '#666', letterSpacing: '0.5px' }}>Status</th>
                                        <th style={{ fontSize: '0.75rem', fontWeight: '600', color: '#666', letterSpacing: '0.5px' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map(order => (
                                        <tr key={order.id}>
                                            <td>
                                                <span className="fw-bold" style={{ color: '#2D402E', fontSize: '0.9rem' }}>
                                                    #{order.id}
                                                </span>
                                            </td>
                                            <td style={{ color: '#666', fontSize: '0.9rem' }}>
                                                {order.customer_email}
                                            </td>
                                            <td style={{ color: '#2D402E', fontWeight: '600', fontSize: '0.9rem' }}>
                                                Rs. {order.total_amount}
                                            </td>
                                            <td>
                                                <span className="badge" style={{
                                                    backgroundColor: getStatusBadgeStyle(order.status).backgroundColor,
                                                    color: getStatusBadgeStyle(order.status).color,
                                                    padding: '4px 12px',
                                                    borderRadius: '20px',
                                                    fontSize: '0.65rem',
                                                    letterSpacing: '0.5px',
                                                    textTransform: 'uppercase'
                                                }}>
                                                    {order.status || 'Processing'}
                                                </span>
                                            </td>
                                            <td>
                                                <select 
                                                    className="form-select form-select-sm"
                                                    style={{
                                                        border: '1px solid #eee',
                                                        borderRadius: '8px',
                                                        fontSize: '0.75rem',
                                                        padding: '4px 25px 4px 10px',
                                                        minWidth: '130px',
                                                        backgroundColor: 'white',
                                                        transition: 'all 0.3s ease'
                                                    }}
                                                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                                    defaultValue=""
                                                    onFocus={(e) => {
                                                        e.target.style.borderColor = '#B4975A';
                                                        e.target.style.boxShadow = '0 0 0 3px rgba(180,151,90,0.1)';
                                                    }}
                                                    onBlur={(e) => {
                                                        e.target.style.borderColor = '#eee';
                                                        e.target.style.boxShadow = 'none';
                                                    }}
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
                    )}
                </div>

                {/* PRODUCT INVENTORY */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '25px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                    border: '1px solid rgba(45,64,46,0.06)'
                }}>
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">
                        <div>
                            <h4 className="fw-bold m-0" style={{
                                fontFamily: 'Playfair Display, serif',
                                color: '#2D402E'
                            }}>
                                <i className="bi bi-grid-3x3-gap-fill me-2" style={{ color: '#B4975A' }}></i>
                                Inventory Control
                            </h4>
                            <p className="text-muted small m-0">Total Stock: {products.length} Products</p>
                        </div>
                        
                        {/* Search Bar */}
                        <div className="position-relative" style={{ maxWidth: '300px', width: '100%' }}>
                            <input 
                                type="text" 
                                className="form-control py-2 ps-4"
                                placeholder="Find a product..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                style={{
                                    border: '1px solid #eee',
                                    borderRadius: '8px',
                                    fontSize: '0.85rem',
                                    paddingLeft: '35px',
                                    transition: 'all 0.3s ease'
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#B4975A';
                                    e.target.style.boxShadow = '0 0 0 3px rgba(180,151,90,0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#eee';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                            <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-2 text-muted" style={{ fontSize: '0.9rem' }}></i>
                        </div>
                    </div>

                    {/* Product Grid */}
                    {filteredProducts.length === 0 ? (
                        <div className="text-center py-4" style={{
                            backgroundColor: '#F9F7F2',
                            borderRadius: '8px'
                        }}>
                            <i className="bi bi-box-seam" style={{ fontSize: '2rem', color: '#B4975A', opacity: 0.5 }}></i>
                            <p className="text-muted mt-2 mb-0">No products found.</p>
                        </div>
                    ) : (
                        <div className="row g-3">
                            {filteredProducts.map(p => (
                                <div key={p.id} className="col-xl-3 col-lg-4 col-sm-6">
                                    <div style={{
                                        backgroundColor: '#F9F7F2',
                                        borderRadius: '8px',
                                        padding: '15px',
                                        transition: 'all 0.3s ease',
                                        height: '100%',
                                        border: '1px solid transparent'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.borderColor = '#B4975A';
                                        e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.borderColor = 'transparent';
                                        e.currentTarget.style.boxShadow = 'none';
                                    }}>
                                        {/* Image */}
                                        <div style={{
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            height: '120px',
                                            backgroundColor: 'white',
                                            marginBottom: '10px'
                                        }}>
                                            <img 
                                                src={p.image} 
                                                className="w-100 h-100" 
                                                style={{ objectFit: 'cover' }} 
                                                alt={p.pname}
                                                loading="lazy"
                                            />
                                        </div>

                                        {/* Info */}
                                        <p className="fw-bold small mb-1 text-truncate" style={{ color: '#2D402E' }} title={p.pname}>
                                            {p.pname}
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center mb-2">
                                            <span className="text-muted" style={{ fontSize: '0.7rem' }}>
                                                ID: {p.id}
                                            </span>
                                            <span className="fw-bold" style={{ color: '#2D402E', fontSize: '0.85rem' }}>
                                                Rs.{p.price}
                                            </span>
                                        </div>

                                        {/* Delete Button */}
                                        <button 
                                            className="btn w-100 py-1"
                                            onClick={() => handleDeleteProduct(p.id)}
                                            style={{
                                                backgroundColor: 'white',
                                                color: '#dc3545',
                                                border: '1px solid #dc3545',
                                                borderRadius: '8px',
                                                fontSize: '0.7rem',
                                                fontWeight: '600',
                                                letterSpacing: '1px',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.backgroundColor = '#dc3545';
                                                e.target.style.color = 'white';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.backgroundColor = 'white';
                                                e.target.style.color = '#dc3545';
                                            }}
                                        >
                                            <i className="bi bi-trash3 me-1"></i> Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <ToastContainer position="bottom-right" />

            {/* --- ADD PRODUCT MODAL --- */}
            {showProductForm && (
                <div className="modal show d-block" style={{
                    backgroundColor: 'rgba(45,64,46,0.8)',
                    backdropFilter: 'blur(5px)',
                    zIndex: 1060
                }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered" style={{ maxWidth: '700px' }}>
                        <div className="modal-content p-4 border-0" style={{
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
                            maxHeight: '90vh',
                            overflowY: 'auto'
                        }}>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h3 className="fw-bold m-0" style={{
                                    fontFamily: 'Playfair Display, serif',
                                    color: '#2D402E'
                                }}>
                                    <i className="bi bi-plus-circle me-2" style={{ color: '#B4975A' }}></i>
                                    Add New Product
                                </h3>
                                <button 
                                    type="button" 
                                    className="btn-close" 
                                    onClick={() => setShowProductForm(false)}
                                ></button>
                            </div>
                            
                            <form onSubmit={handleAddProduct} className="row g-3">
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold" style={{ color: '#666', letterSpacing: '1px', fontSize: '0.7rem' }}>
                                        Product Name
                                    </label>
                                    <input 
                                        type="text" 
                                        className="form-control py-2"
                                        placeholder="e.g. Lotus & Almond Milk Cleanser"
                                        onChange={(e) => setNewProduct({...newProduct, pname: e.target.value})}
                                        required
                                        style={{
                                            border: '1px solid #eee',
                                            borderRadius: '8px',
                                            fontSize: '0.9rem',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#B4975A';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(180,151,90,0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#eee';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold" style={{ color: '#666', letterSpacing: '1px', fontSize: '0.7rem' }}>
                                        Price (Numeric)
                                    </label>
                                    <input 
                                        type="number" 
                                        className="form-control py-2"
                                        placeholder="e.g. 2500"
                                        onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                                        required
                                        style={{
                                            border: '1px solid #eee',
                                            borderRadius: '8px',
                                            fontSize: '0.9rem',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#B4975A';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(180,151,90,0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#eee';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>
                                <div className="col-12">
                                    <label className="form-label small fw-bold" style={{ color: '#666', letterSpacing: '1px', fontSize: '0.7rem' }}>
                                        Description
                                    </label>
                                    <textarea 
                                        className="form-control py-2" 
                                        rows="3"
                                        placeholder="Describe your product..."
                                        onChange={(e) => setNewProduct({...newProduct, pdescription: e.target.value})}
                                        required
                                        style={{
                                            border: '1px solid #eee',
                                            borderRadius: '8px',
                                            fontSize: '0.9rem',
                                            transition: 'all 0.3s ease',
                                            resize: 'vertical'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#B4975A';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(180,151,90,0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#eee';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label small fw-bold" style={{ color: '#666', letterSpacing: '1px', fontSize: '0.7rem' }}>
                                        Category
                                    </label>
                                    <select 
                                        className="form-select py-2"
                                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                                        style={{
                                            border: '1px solid #eee',
                                            borderRadius: '8px',
                                            fontSize: '0.9rem',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#B4975A';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(180,151,90,0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#eee';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    >
                                        <option value="Skin">Skin Care</option>
                                        <option value="Lip">Lip Care</option>
                                        <option value="Body">Body Care</option>
                                    </select>
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label small fw-bold" style={{ color: '#666', letterSpacing: '1px', fontSize: '0.7rem' }}>
                                        Subcategory
                                    </label>
                                    <input 
                                        type="text" 
                                        className="form-control py-2"
                                        placeholder="e.g. Cleanser"
                                        onChange={(e) => setNewProduct({...newProduct, subcategory: e.target.value})}
                                        style={{
                                            border: '1px solid #eee',
                                            borderRadius: '8px',
                                            fontSize: '0.9rem',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#B4975A';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(180,151,90,0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#eee';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>
                                <div className="col-md-4">
                                    <label className="form-label small fw-bold" style={{ color: '#666', letterSpacing: '1px', fontSize: '0.7rem' }}>
                                        Tag
                                    </label>
                                    <select 
                                        className="form-select py-2"
                                        onChange={(e) => setNewProduct({...newProduct, tag: e.target.value})}
                                        style={{
                                            border: '1px solid #eee',
                                            borderRadius: '8px',
                                            fontSize: '0.9rem',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#B4975A';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(180,151,90,0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#eee';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    >
                                        <option value="New">New</option>
                                        <option value="Sale">Sale</option>
                                        <option value="Best">Best Seller</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold" style={{ color: '#666', letterSpacing: '1px', fontSize: '0.7rem' }}>
                                        Main Image
                                    </label>
                                    <input 
                                        type="file" 
                                        className="form-control py-2" 
                                        onChange={(e) => setMainFile(e.target.files[0])} 
                                        required
                                        style={{
                                            border: '1px solid #eee',
                                            borderRadius: '8px',
                                            fontSize: '0.9rem',
                                            padding: '8px 12px'
                                        }}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <label className="form-label small fw-bold" style={{ color: '#666', letterSpacing: '1px', fontSize: '0.7rem' }}>
                                        Hover Image
                                    </label>
                                    <input 
                                        type="file" 
                                        className="form-control py-2" 
                                        onChange={(e) => setSecondFile(e.target.files[0])} 
                                        required
                                        style={{
                                            border: '1px solid #eee',
                                            borderRadius: '8px',
                                            fontSize: '0.9rem',
                                            padding: '8px 12px'
                                        }}
                                    />
                                </div>
                                
                                <div className="col-12 mt-3">
                                    <button 
                                        type="submit" 
                                        className="btn w-100 py-3 fw-bold"
                                        style={{
                                            backgroundColor: '#2D402E',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '8px',
                                            letterSpacing: '2px',
                                            fontSize: '0.85rem',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => e.target.style.backgroundColor = '#5C4033'}
                                        onMouseLeave={(e) => e.target.style.backgroundColor = '#2D402E'}
                                    >
                                        <i className="bi bi-plus-circle me-2"></i> Publish to Store
                                    </button>
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