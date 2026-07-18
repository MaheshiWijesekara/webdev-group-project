import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../AuthContext'; // Import the AuthContext

const Nav = () => {
    // --- Auth Context Consumption ---
    const { user, login, logout } = useContext(AuthContext);

    // --- Existing Cart/Wishlist State ---
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);

    // --- Modal View Toggle State ---
    const [isLoginMode, setIsLoginMode] = useState(true); // Toggle between Login and Signup

    // --- Signup Form State ---
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    // --- Login Form State ---
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    // Handle Input Changes for Signup
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle Input Changes for Login
    const handleLoginChange = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    // Handle Signup Submission
    const handleSignup = async (e) => {
        e.preventDefault(); 
        try {
            const response = await axios.post('http://localhost:5000/api/register', formData);
            alert(response.data.message || "Signup Successful! Now please Sign In.");
            setFormData({ name: '', email: '', password: '' });
            setIsLoginMode(true); // Switch to login view after successful signup
        } catch (error) {
            console.error("Signup Error:", error);
            alert(error.response?.data?.error || "An error occurred during signup");
        }
    };

    // --- Handle Login Submission ---
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', loginData);
            
            // Call the login function from AuthContext
            login(response.data.user, response.data.token);
            
            alert("Welcome back, " + response.data.user.name);
            
            // Clear form and close modal (via Bootstrap attribute or state)
            setLoginData({ email: '', password: '' });
            
            // To close modal automatically in Bootstrap 5 without jQuery:
            const modalElement = document.getElementById('authModal');
            const modalInstance = bootstrap.Modal.getInstance(modalElement);
            if (modalInstance) modalInstance.hide();

        } catch (error) {
            console.error("Login Error:", error);
            alert(error.response?.data?.error || "Incorrect email or password");
        }
    };

    // --- Existing Cart/Wishlist Logic ---
    const updateCounts = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const totalCartItems = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
        setCartCount(totalCartItems);
        setWishlistCount(wishlist.length);
    };

    useEffect(() => {
        updateCounts();
        const handleCartUpdate = () => updateCounts();
        const handleWishlistUpdate = () => updateCounts();

        window.addEventListener('cartUpdated', handleCartUpdate);
        window.addEventListener('wishlistUpdated', handleWishlistUpdate);

        const onStorageChange = (e) => {
            if (e.key === 'cart' || e.key === 'wishlist') {
                updateCounts();
            }
        };

        window.addEventListener('storage', onStorageChange);

        return () => {
            window.removeEventListener('cartUpdated', handleCartUpdate);
            window.removeEventListener('wishlistUpdated', handleWishlistUpdate);
            window.removeEventListener('storage', onStorageChange);
        };
    }, []);

    return (
        <>
            {/* Navbar */}
            <div className="nav w-100 fixed-top bg-white shadow-sm">
                <nav className="navbar navbar-expand-lg py-3 justify-content-between align-items-center w-100 nav-wrapper">
                    {/* Toggle button */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Mobile Logo */}
                    <Link to="/" className="navbar-brand d-lg-none mx-auto order-0 d-flex">
                        <h2 className="m-0 fw-bold" style={{ letterSpacing: '2px' }}>VIRELLE</h2>
                    </Link>

                    {/* Mobile Icons */}
                    <ul className="d-lg-none d-flex align-items-center gap-3 list-unstyled m-0">
                        <li className="nav-item"><a href="#"><i className="bi bi-search fs-5 text-dark"></i></a></li>
                        <li className="nav-item">
                            {user ? (
                                <span className="fw-bold small">{user.name.split(' ')[0]}</span>
                            ) : (
                                <a href="#" data-bs-toggle="modal" data-bs-target="#authModal">
                                    <i className="bi bi-person fs-5 text-dark"></i>
                                </a>
                            )}
                        </li>
                        <li className="nav-item position-relative">
                            <Link to="/Wishlist">
                                <i className="bi bi-heart fs-5 text-dark"></i>
                                <span className="position-absolute top-0 start-100 translate-middle cart-quont rounded-pill">{wishlistCount}</span>
                            </Link>
                        </li>
                        <li className="nav-item position-relative">
                            <Link to="/Cart">
                                <i className="bi bi-cart fs-5 text-dark"></i>
                                <span className="position-absolute top-0 start-100 translate-middle cart-quont rounded-pill">{cartCount}</span>
                            </Link>
                        </li>
                    </ul>

                    {/* Main Nav */}
                    <div className="collapse navbar-collapse justify-content-between" id='navbarNav'>
                        <ul className="navbar-nav nav-menu align-items-center gap-4">
                            <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
                            <li className="nav-item"><Link to="/About" className="nav-link">About</Link></li>
                            <li className="nav-item"><Link to="/Shop" className="nav-link">Shop All</Link></li>
                            <li className="nav-item"><Link to="/Stores" className="nav-link">Store</Link></li>
                            <li className="nav-item"><Link to="/Blog" className="nav-link">Blog</Link></li>
                            <li className="nav-item"><Link to="/Contact" className="nav-link">Contact</Link></li>
                        </ul>

                        {/* Desktop Logo */}
                        <Link to="/" className="navbar-brand order-0 d-none d-lg-flex">
                            <h2 className="m-0 fw-bold" style={{ letterSpacing: '2px' }}>VIRELLE</h2>
                        </Link>

                        {/* Desktop Icons */}
                        <ul className="navbar-nav d-none d-lg-flex align-items-center gap-4">
                            <li className="nav-item"><a href="#"><i className="bi bi-search fs-5 text-dark"></i></a></li>
                            
                            {/* Conditional Rendering for User Greeting */}
                            <li className="nav-item d-flex align-items-center gap-3">
                                {user ? (
                                    <div className="dropdown">
                                        <span className="fw-bold text-uppercase dropdown-toggle" style={{cursor: 'pointer'}} data-bs-toggle="dropdown">
                                            HELLO, {user.name.split(' ')[0]}
                                        </span>
                                        <ul className="dropdown-menu border-0 shadow-sm">
                                            <li><Link className="dropdown-item" to="/profile">My Profile</Link></li>
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

                            <li className="nav-item position-relative">
                                <Link to="/Wishlist">
                                    <i className="bi bi-heart fs-5 text-dark"></i>
                                    <span className="position-absolute top-0 start-100 translate-middle cart-quont rounded-pill">{wishlistCount}</span>
                                </Link>
                            </li>
                            <li className="nav-item position-relative">
                                <Link to="/Cart">
                                    <i className="bi bi-bag fs-5 text-dark"></i>
                                    <span className="position-absolute top-0 start-100 translate-middle cart-quont rounded-pill">{cartCount}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

            {/* Authentication Modal (Combined Login/Signup) */}
            <div className="modal fade" id="authModal" tabIndex="-1" aria-labelledby="authModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-4 border-0 rounded-4">
                        <div className="modal-header border-0 pb-0">
                            <h5 className="modal-title fw-bold fs-3" id="authModalLabel">
                                {isLoginMode ? "Sign In" : "Create Account"}
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            
                            {isLoginMode ? (
                                // --- LOGIN FORM ---
                                <form onSubmit={handleLogin}>
                                    <div className="mb-3">
                                        <label className="form-label small text-muted">Email Address</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            className="form-control py-2" 
                                            placeholder="name@example.com" 
                                            value={loginData.email} 
                                            onChange={handleLoginChange} 
                                            required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small text-muted">Password</label>
                                        <input 
                                            type="password" 
                                            name="password" 
                                            className="form-control py-2" 
                                            placeholder="Enter password" 
                                            value={loginData.password} 
                                            onChange={handleLoginChange} 
                                            required 
                                        />
                                    </div>
                                    <button type='submit' className="btn btn-dark w-100 py-2 fw-bold mt-2">Sign In</button>
                                    <div className="text-center mt-4">
                                        <p className="small">New to Virelle? <a href="#" className='text-dark fw-bold' onClick={() => setIsLoginMode(false)}>Create Account</a></p>
                                    </div>
                                </form>
                            ) : (
                                // --- SIGNUP FORM ---
                                <form onSubmit={handleSignup}>
                                    <div className="mb-3">
                                        <label className="form-label small text-muted">Full Name</label>
                                        <input 
                                            type="text" 
                                            name="name" 
                                            className="form-control py-2" 
                                            placeholder="Enter your name" 
                                            value={formData.name} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small text-muted">Email Address</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            className="form-control py-2" 
                                            placeholder="Enter email address" 
                                            value={formData.email} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label small text-muted">Password</label>
                                        <input 
                                            type="password" 
                                            name="password" 
                                            className="form-control py-2" 
                                            placeholder="Create a password" 
                                            value={formData.password} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                    <p className='text-muted' style={{fontSize: '0.75rem'}}>
                                        By signing up, you agree to our <a href="#" className='text-dark text-decoration-underline'>Terms of Service</a> and <a href="#" className='text-dark text-decoration-underline'>Privacy Policy</a>.
                                    </p>
                                    <button type='submit' className="btn btn-dark w-100 py-2 fw-bold">Create Account</button>
                                    <div className="text-center mt-4">
                                        <p className="small">Already have an account? <a href="#" className='text-dark fw-bold' onClick={() => setIsLoginMode(true)}>Sign In</a></p>
                                    </div>
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