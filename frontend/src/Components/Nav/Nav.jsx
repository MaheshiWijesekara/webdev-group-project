import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Nav = () => {
    // --- Existing Cart/Wishlist State ---
    const [cartCount, setCartCount] = useState(0);
    const [wishlistCount, setWishlistCount] = useState(0);

    // --- New Signup Form State ---
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    // Handle Input Changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Handle Form Submission to Backend
    const handleSignup = async (e) => {
        e.preventDefault(); // Stop page from refreshing
        try {
            // Adjust the URL if your server is running on a different port
            const response = await axios.post('http://localhost:5000/api/signup', formData);
            
            alert(response.data.message || "Signup Successful!");
            
            // Reset form fields
            setFormData({ name: '', email: '', password: '' });
            
            // Optional: Close modal manually or redirect user
        } catch (error) {
            console.error("Signup Error:", error);
            alert(error.response?.data?.message || "An error occurred during signup");
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
                            <a href="#" data-bs-toggle="modal" data-bs-target="#signupModal">
                                <i className="bi bi-person fs-5 text-dark"></i>
                            </a>
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
                            <li className="nav-item">
                                <a href="#" data-bs-toggle="modal" data-bs-target="#signupModal">
                                    <i className="bi bi-person fs-5 text-dark"></i>
                                </a>
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

            {/* Signup Modal */}
            <div className="modal fade" id="signupModal" tabIndex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content p-4">
                        <div className="modal-header border-0">
                            <h5 className="modal-title fw-bold" id="signupModalLabel">Sign Up</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* Attach the handleSignup function to the form */}
                            <form onSubmit={handleSignup}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input 
                                        type="text" 
                                        name="name" 
                                        className="form-control" 
                                        placeholder="Enter your name" 
                                        value={formData.name} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email Address</label>
                                    <input 
                                        type="email" 
                                        name="email" 
                                        className="form-control" 
                                        placeholder="Enter email address" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input 
                                        type="password" 
                                        name="password" 
                                        className="form-control" 
                                        placeholder="Enter password" 
                                        value={formData.password} 
                                        onChange={handleChange} 
                                        required 
                                    />
                                </div>
                                <p className='text-muted'>
                                    By signing up, you agree to our <a href="#" className='text-success text-decoration-none'>Terms of Service</a> and <a href="#" className='text-success text-decoration-none'>Privacy Policy</a>.
                                </p>
                                {/* Submit button inside the form */}
                                <button type='submit' className="btn btn-dark w-100">Sign Up</button>
                            </form>
                            <div className="text-center mt-3">
                                <p>Already have an account? <a href="#" className='text-success fw-bold'>Sign In</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Nav;