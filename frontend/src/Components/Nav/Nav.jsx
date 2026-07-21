import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../AuthContext'; // Ensure path is correct

const Nav = () => {
    // --- Auth Context ---
    const { user, login, logout } = useContext(AuthContext);

    // --- Counts ---
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);

    // --- UI State ---
    const [isLoginMode, setIsLoginMode] = useState(true);

    // --- 1. LOGIN STATE ---
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    // --- 2. SIGNUP STATE ---
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    // --- 3. INPUT HANDLERS ---
    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const handleSignupChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // --- 4. SUBMIT HANDLERS ---
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', loginData);
            login(response.data.user, response.data.token);
            alert("Welcome back, " + response.data.user.name);
            
            // This part closes the Bootstrap modal
            const modalElement = document.getElementById('authModal');
            const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) modalInstance.hide();
            
            setLoginData({ email: '', password: '' });
        } catch (error) {
            alert(error.response?.data?.error || "Login Failed");
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/register', formData);
            alert("Signup Successful! Now please Sign In.");
            setIsLoginMode(true);
            setFormData({ name: '', email: '', password: '' });
        } catch (error) {
            alert(error.response?.data?.error || "Signup Failed");
        }
    };

    // --- 5. COUNT SYNC (CART & WISHLIST) ---
    const updateCounts = async () => {
        // CART SYNC
        if (user && user.id) {
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

        // WISHLIST SYNC (Currently using LocalStorage as per previous steps)
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlistCount(wishlist.length);
    };

    useEffect(() => {
        updateCounts();
        window.addEventListener('cartUpdated', updateCounts);
        window.addEventListener('wishlistUpdated', updateCounts);
        return () => {
            window.removeEventListener('cartUpdated', updateCounts);
            window.removeEventListener('wishlistUpdated', updateCounts);
        };
    }, [user]);

    return (
        <>
            <div className="nav w-100 fixed-top bg-white shadow-sm" style={{ zIndex: 1000 }}>
                <nav className="navbar navbar-expand-lg py-3 container justify-content-between align-items-center">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <Link to="/" className="navbar-brand d-lg-none mx-auto fw-bold">VIRELLE</Link>

                    {/* --- MOBILE ICONS --- */}
                    <ul className="d-lg-none d-flex align-items-center gap-3 list-unstyled m-0">
                        <li className="nav-item">
                            {user ? <span className="fw-bold small">{user.name.split(' ')[0]}</span> : 
                            <a href="#" data-bs-toggle="modal" data-bs-target="#authModal"><i className="bi bi-person fs-5"></i></a>}
                        </li>
                        {/* Mobile Wishlist */}
                        <li className="nav-item position-relative">
                            <Link to="/Wishlist">
                                <i className="bi bi-heart fs-5 text-dark"></i>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.6rem'}}>
                                    {wishlistCount}
                                </span>
                            </Link>
                        </li>
                        {/* Mobile Cart */}
                        <li className="nav-item position-relative">
                            <Link to="/Cart">
                                <i className="bi bi-cart3 fs-5 text-dark"></i>
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.6rem'}}>
                                    {cartCount}
                                </span>
                            </Link>
                        </li>
                    </ul>

                    <div className="collapse navbar-collapse justify-content-between" id='navbarNav'>
                        <ul className="navbar-nav gap-4">
                            <li><Link to="/" className="nav-link">Home</Link></li>
                            <li><Link to="/About" className="nav-link">About</Link></li>
                            <li><Link to="/Shop" className="nav-link">Shop All</Link></li>
                            <li><Link to="/Blog" className="nav-link">Blog</Link></li>
                            <li><Link to="/Contact" className="nav-link">Contact</Link></li>
                        </ul>

                        <Link to="/" className="navbar-brand d-none d-lg-flex fw-bold">VIRELLE</Link>

                        {/* --- DESKTOP ICONS --- */}
                        <ul className="navbar-nav d-none d-lg-flex align-items-center gap-4">
                            {/* User Menu */}
                            <li className="nav-item">
                                {user ? (
                                    <div className="dropdown">
                                        <span className="fw-bold text-uppercase dropdown-toggle" style={{cursor:'pointer', color: '#B4975A'}} data-bs-toggle="dropdown">
                                            HELLO, {user.name.split(' ')[0]}
                                        </span>
                                        <ul className="dropdown-menu border-0 shadow-sm">
                                            <li><Link className="dropdown-item" to="/profile">My Account</Link></li>
                                            {user && user.role === 'admin' && (
        <>
            <li><hr className="dropdown-divider"/></li>
            <li>
                <Link className="dropdown-item fw-bold text-danger" to="/admin-virelle-hidden">
                    <i className="bi bi-speedometer2 me-2"></i>ADMIN PANEL
                </Link>
            </li>
        </>
    )}
                                            <li><hr className="dropdown-divider"/></li>
                                            <li><button className="dropdown-item" onClick={logout}>Logout</button></li>
                                        </ul>
                                    </div>
                                ) : (
                                    <a href="#" data-bs-toggle="modal" data-bs-target="#authModal">
                                        <i className="bi bi-person fs-5 text-dark"></i>
                                    </a>
                                )}
                            </li>

                            {/* Desktop Wishlist */}
                            <li className="nav-item position-relative">
                                <Link to="/Wishlist">
                                    <i className="bi bi-heart fs-5 text-dark"></i>
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.65rem'}}>
                                        {wishlistCount}
                                    </span>
                                </Link>
                            </li>

                            {/* Desktop Cart */}
                            <li className="nav-item position-relative">
                                <Link to="/Cart">
                                    <i className="bi bi-cart3 fs-5 text-dark"></i>
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.65rem'}}>
                                        {cartCount}
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            {/* --- AUTH MODAL --- */}
            <div className="modal fade" id="authModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-4 border-0 rounded-4 shadow-lg">
                        <div className="modal-header border-0 pb-0">
                            <h5 className="modal-title fw-bold fs-3">{isLoginMode ? "Sign In" : "Create Account"}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div className="modal-body pt-4">
                            {isLoginMode ? (
                                <form onSubmit={handleLogin}>
                                    <div className="mb-3">
                                        <input type="email" name="email" className="form-control py-2" placeholder="Email" value={loginData.email} onChange={handleLoginChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" name="password" className="form-control py-2" placeholder="Password" value={loginData.password} onChange={handleLoginChange} required />
                                    </div>
                                    <button type="submit" className="btn btn-dark w-100 py-2 fw-bold mt-2">Sign In</button>
                                    <p className="text-center mt-4 small">New? <a href="#" className="fw-bold text-dark" onClick={(e) => { e.preventDefault(); setIsLoginMode(false); }}>Create Account</a></p>
                                </form>
                            ) : (
                                <form onSubmit={handleSignup}>
                                    <div className="mb-3">
                                        <input type="text" name="name" className="form-control py-2" placeholder="Full Name" value={formData.name} onChange={handleSignupChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <input type="email" name="email" className="form-control py-2" placeholder="Email" value={formData.email} onChange={handleSignupChange} required />
                                    </div>
                                    <div className="mb-3">
                                        <input type="password" name="password" className="form-control py-2" placeholder="Password" value={formData.password} onChange={handleSignupChange} required />
                                    </div>
                                    <button type="submit" className="btn btn-dark w-100 py-2 fw-bold mt-2">Create Account</button>
                                    <p className="text-center mt-4 small">Already have an account? <a href="#" className="fw-bold text-dark" onClick={(e) => { e.preventDefault(); setIsLoginMode(true); }}>Sign In</a></p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Nav;