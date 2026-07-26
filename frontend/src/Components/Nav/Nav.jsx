import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../AuthContext';
import { toast } from 'react-toastify';

const Nav = () => {
    const { user, login, logout } = useContext(AuthContext);
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Form states for login and signup
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const handleLoginChange = (e) => { setLoginData({ ...loginData, [e.target.name]: e.target.value }); };
    const handleSignupChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

    // Switch between login and signup modes with form clearing
    const switchToLogin = () => { setIsLoginMode(true); setFormData({ name: '', email: '', password: '' }); };
    const switchToSignup = () => { setIsLoginMode(false); setLoginData({ email: '', password: '' }); };

    // Handle user login with API call
    const handleLogin = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await axios.post('http://localhost:5000/api/login', loginData);
            login(response.data.user, response.data.token);
            toast.success(`Welcome back, ${response.data.user.name}!`);
            
            const modalElement = document.getElementById('authModal');
            const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) modalInstance.hide();
            
            setLoginData({ email: '', password: '' });
        } catch (error) {
            toast.error(error.response?.data?.error || "Login Failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle user registration with API call
    const handleSignup = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post('http://localhost:5000/api/register', formData);
            toast.success("Account created successfully! Please sign in.");
            setIsLoginMode(true);
            setFormData({ name: '', email: '', password: '' });
        } catch (error) {
            toast.error(error.response?.data?.error || "Signup Failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Update cart and wishlist counts from localStorage or API
    const updateCounts = async () => {
        if (user?.id) {
            try {
                const res = await axios.get(`http://localhost:5000/api/cart/${user.id}`);
                const total = res.data.reduce((acc, item) => acc + (item.quantity || 1), 0);
                setCartCount(total);
            } catch (err) { console.log(err); }
        } else {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const total = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
            setCartCount(total);
        }
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlistCount(wishlist.length);
    };

    // Listen for cart/wishlist updates and update counts
    useEffect(() => {
        updateCounts();
        window.addEventListener('cartUpdated', updateCounts);
        window.addEventListener('wishlistUpdated', updateCounts);
        return () => {
            window.removeEventListener('cartUpdated', updateCounts);
            window.removeEventListener('wishlistUpdated', updateCounts);
        };
    }, [user]);

    return (<>
        {/* Navigation Bar - Fixed top with shadow */}
        <div className="nav w-100 fixed-top bg-white shadow-sm" style={{ zIndex: 1000 }}>
            <nav className="navbar navbar-expand-lg py-3 container justify-content-between align-items-center">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <Link to="/" className="navbar-brand d-lg-none mx-auto fw-bold">VIRELLE</Link>

                {/* Mobile Icons - User, Wishlist, Cart */}
                <ul className="d-lg-none d-flex align-items-center gap-3 list-unstyled m-0">
                    <li className="nav-item">
                        {user ? <span className="fw-bold small">{user.name.split(' ')[0]}</span> : 
                        <a href="#" data-bs-toggle="modal" data-bs-target="#authModal"><i className="bi bi-person fs-5"></i></a>}
                    </li>
                    <li className="nav-item position-relative">
                        <Link to="/Wishlist"><i className="bi bi-heart fs-5 text-dark"></i>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>{wishlistCount}</span>
                        </Link>
                    </li>
                    <li className="nav-item position-relative">
                        <Link to="/Cart"><i className="bi bi-cart3 fs-5 text-dark"></i>
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.6rem' }}>{cartCount}</span>
                        </Link>
                    </li>
                </ul>

                {/* Desktop Navigation - Left links, Center logo, Right icons */}
                <div className="collapse navbar-collapse justify-content-between" id='navbarNav'>
                    <ul className="navbar-nav gap-4">
                        <li><Link to="/" className="nav-link">Home</Link></li>
                        <li><Link to="/About" className="nav-link">About</Link></li>
                        <li><Link to="/Shop" className="nav-link">Shop All</Link></li>
                        <li><Link to="/Stores" className="nav-link">Stores</Link></li>
                        <li><Link to="/Blog" className="nav-link">Blog</Link></li>
                        <li><Link to="/Contact" className="nav-link">Contact</Link></li>
                    </ul>

                    <Link to="/" className="navbar-brand d-none d-lg-flex fw-bold">VIRELLE</Link>

                    {/* Desktop Right Icons - User dropdown, Wishlist, Cart */}
                    <ul className="navbar-nav d-none d-lg-flex align-items-center gap-4">
                        <li className="nav-item">
                            {user ? (
                                <div className="dropdown">
                                    <span className="fw-bold text-uppercase dropdown-toggle" style={{ cursor: 'pointer', color: '#B4975A' }} data-bs-toggle="dropdown">
                                        HELLO, {user.name.split(' ')[0]}
                                    </span>
                                    <ul className="dropdown-menu border-0 shadow-sm">
                                        <li><Link className="dropdown-item" to="/profile">My Account</Link></li>
                                        {user?.role === 'admin' && (
                                            <><li><hr className="dropdown-divider"/></li>
                                            <li><Link className="dropdown-item fw-bold text-danger" to="/admin-virelle-hidden"><i className="bi bi-speedometer2 me-2"></i>ADMIN PANEL</Link></li></>
                                        )}
                                        <li><hr className="dropdown-divider"/></li>
                                        <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
                                    </ul>
                                </div>
                            ) : (
                                <a href="#" data-bs-toggle="modal" data-bs-target="#authModal"><i className="bi bi-person fs-5 text-dark"></i></a>
                            )}
                        </li>
                        <li className="nav-item position-relative">
                            <Link to="/Wishlist"><i className="bi bi-heart fs-5 text-dark"></i>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>{wishlistCount}</span>
                            </Link>
                        </li>
                        <li className="nav-item position-relative">
                            <Link to="/Cart"><i className="bi bi-cart3 fs-5 text-dark"></i>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>{cartCount}</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

        {/* AUTH MODAL - Login/Signup with toggle and loading states */}
        <div className="modal fade" id="authModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '450px' }}>
                <div className="modal-content border-0" style={{ borderRadius: '16px', boxShadow: '0 30px 60px rgba(0,0,0,0.15)', backgroundColor: 'white', padding: '10px' }}>
                    <div className="modal-header border-0 pb-0 pt-3 px-4">
                        <div className="text-center w-100">
                            <h2 className="fw-bold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#2D402E', fontSize: '1.8rem' }}>
                                {isLoginMode ? 'Welcome Back' : 'Create Account'}
                            </h2>
                            <p className="text-muted small" style={{ fontSize: '0.85rem' }}>
                                {isLoginMode ? 'Sign in to continue your skincare journey' : 'Join the Virelle community'}
                            </p>
                        </div>
                        <button type="button" className="btn-close position-absolute top-0 end-0 mt-3 me-3" data-bs-dismiss="modal" style={{ zIndex: 10 }}></button>
                    </div>

                    <div className="modal-body px-4 pt-2 pb-4">
                        {isLoginMode ? (
                            // --- LOGIN FORM ---
                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold" style={{ color: '#666', letterSpacing: '0.5px', fontSize: '0.75rem', textTransform: 'uppercase' }}>Email Address</label>
                                    <input type="email" name="email" className="form-control" placeholder="you@example.com" value={loginData.email} onChange={handleLoginChange} required style={{ border: '1px solid #eee', borderRadius: '10px', padding: '12px 15px', fontSize: '0.95rem', transition: 'all 0.3s ease' }}
                                    onFocus={(e) => { e.target.style.borderColor = '#B4975A'; e.target.style.boxShadow = '0 0 0 3px rgba(180,151,90,0.1)'; }}
                                    onBlur={(e) => { e.target.style.borderColor = '#eee'; e.target.style.boxShadow = 'none'; }} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold" style={{ color: '#666', letterSpacing: '0.5px', fontSize: '0.75rem', textTransform: 'uppercase' }}>Password</label>
                                    <div className="position-relative">
                                        <input type={showPassword ? "text" : "password"} name="password" className="form-control" placeholder="Enter your password" value={loginData.password} onChange={handleLoginChange} required style={{ border: '1px solid #eee', borderRadius: '10px', padding: '12px 45px 12px 15px', fontSize: '0.95rem', transition: 'all 0.3s ease' }}
                                        onFocus={(e) => { e.target.style.borderColor = '#B4975A'; e.target.style.boxShadow = '0 0 0 3px rgba(180,151,90,0.1)'; }}
                                        onBlur={(e) => { e.target.style.borderColor = '#eee'; e.target.style.boxShadow = 'none'; }} />
                                        <button type="button" className="position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent" onClick={() => setShowPassword(!showPassword)} style={{ padding: '0 15px', color: '#999', cursor: 'pointer' }}>
                                            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                        </button>
                                    </div>
                                </div>
                                <button type="submit" className="btn w-100 py-3 fw-bold mt-2" disabled={isSubmitting} style={{ backgroundColor: '#2D402E', color: 'white', border: 'none', borderRadius: '10px', letterSpacing: '1.5px', fontSize: '0.9rem', transition: 'all 0.3s ease', opacity: isSubmitting ? 0.7 : 1 }}
                                onMouseEnter={(e) => { if (!e.target.disabled) { e.target.style.backgroundColor = '#5C4033'; } }}
                                onMouseLeave={(e) => { if (!e.target.disabled) { e.target.style.backgroundColor = '#2D402E'; } }}>
                                    {isSubmitting ? (<><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Signing In...</>) : (<><i className="bi bi-box-arrow-in-right me-2"></i> Sign In</>)}
                                </button>
                                <div className="text-center mt-4">
                                    <p className="small text-muted mb-0">New to Virelle?{' '}
                                        <a href="#" className="fw-bold" style={{ color: '#B4975A', textDecoration: 'none', borderBottom: '2px solid #B4975A', paddingBottom: '2px', transition: 'all 0.3s ease' }}
                                        onMouseEnter={(e) => { e.target.style.color = '#2D402E'; e.target.style.borderBottomColor = '#2D402E'; }}
                                        onMouseLeave={(e) => { e.target.style.color = '#B4975A'; e.target.style.borderBottomColor = '#B4975A'; }}
                                        onClick={(e) => { e.preventDefault(); switchToSignup(); }}>Create Account</a>
                                    </p>
                                </div>
                            </form>
                        ) : (
                            // --- SIGNUP FORM ---
                            <form onSubmit={handleSignup}>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold" style={{ color: '#666', letterSpacing: '0.5px', fontSize: '0.75rem', textTransform: 'uppercase' }}>Full Name</label>
                                    <input type="text" name="name" className="form-control" placeholder="Jane Doe" value={formData.name} onChange={handleSignupChange} required style={{ border: '1px solid #eee', borderRadius: '10px', padding: '12px 15px', fontSize: '0.95rem', transition: 'all 0.3s ease' }}
                                    onFocus={(e) => { e.target.style.borderColor = '#B4975A'; e.target.style.boxShadow = '0 0 0 3px rgba(180,151,90,0.1)'; }}
                                    onBlur={(e) => { e.target.style.borderColor = '#eee'; e.target.style.boxShadow = 'none'; }} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold" style={{ color: '#666', letterSpacing: '0.5px', fontSize: '0.75rem', textTransform: 'uppercase' }}>Email Address</label>
                                    <input type="email" name="email" className="form-control" placeholder="you@example.com" value={formData.email} onChange={handleSignupChange} required style={{ border: '1px solid #eee', borderRadius: '10px', padding: '12px 15px', fontSize: '0.95rem', transition: 'all 0.3s ease' }}
                                    onFocus={(e) => { e.target.style.borderColor = '#B4975A'; e.target.style.boxShadow = '0 0 0 3px rgba(180,151,90,0.1)'; }}
                                    onBlur={(e) => { e.target.style.borderColor = '#eee'; e.target.style.boxShadow = 'none'; }} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label small fw-bold" style={{ color: '#666', letterSpacing: '0.5px', fontSize: '0.75rem', textTransform: 'uppercase' }}>Password</label>
                                    <div className="position-relative">
                                        <input type={showPassword ? "text" : "password"} name="password" className="form-control" placeholder="Min. 6 characters" value={formData.password} onChange={handleSignupChange} required minLength="6" style={{ border: '1px solid #eee', borderRadius: '10px', padding: '12px 45px 12px 15px', fontSize: '0.95rem', transition: 'all 0.3s ease' }}
                                        onFocus={(e) => { e.target.style.borderColor = '#B4975A'; e.target.style.boxShadow = '0 0 0 3px rgba(180,151,90,0.1)'; }}
                                        onBlur={(e) => { e.target.style.borderColor = '#eee'; e.target.style.boxShadow = 'none'; }} />
                                        <button type="button" className="position-absolute top-50 end-0 translate-middle-y border-0 bg-transparent" onClick={() => setShowPassword(!showPassword)} style={{ padding: '0 15px', color: '#999', cursor: 'pointer' }}>
                                            <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                                        </button>
                                    </div>
                                    <small className="text-muted" style={{ fontSize: '0.7rem' }}>Password must be at least 6 characters</small>
                                </div>
                                <button type="submit" className="btn w-100 py-3 fw-bold mt-2" disabled={isSubmitting} style={{ backgroundColor: '#B4975A', color: 'white', border: 'none', borderRadius: '10px', letterSpacing: '1.5px', fontSize: '0.9rem', transition: 'all 0.3s ease', opacity: isSubmitting ? 0.7 : 1 }}
                                onMouseEnter={(e) => { if (!e.target.disabled) { e.target.style.backgroundColor = '#2D402E'; } }}
                                onMouseLeave={(e) => { if (!e.target.disabled) { e.target.style.backgroundColor = '#B4975A'; } }}>
                                    {isSubmitting ? (<><span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Creating Account...</>) : (<><i className="bi bi-person-plus me-2"></i> Create Account</>)}
                                </button>
                                <div className="text-center mt-4">
                                    <p className="small text-muted mb-0">Already have an account?{' '}
                                        <a href="#" className="fw-bold" style={{ color: '#B4975A', textDecoration: 'none', borderBottom: '2px solid #B4975A', paddingBottom: '2px', transition: 'all 0.3s ease' }}
                                        onMouseEnter={(e) => { e.target.style.color = '#2D402E'; e.target.style.borderBottomColor = '#2D402E'; }}
                                        onMouseLeave={(e) => { e.target.style.color = '#B4975A'; e.target.style.borderBottomColor = '#B4975A'; }}
                                        onClick={(e) => { e.preventDefault(); switchToLogin(); }}>Sign In</a>
                                    </p>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </>);
};

export default Nav;