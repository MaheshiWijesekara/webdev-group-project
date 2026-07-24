import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

import payment1 from './../../assets/payment-1.svg';
import payment2 from './../../assets/payment-2.svg';
import payment3 from './../../assets/payment-3.svg';
import payment4 from './../../assets/payment-4.svg';
import payment5 from './../../assets/payment-5.svg';
import payment7 from './../../assets/payment-6.svg';

function Footer() {

    const [email, setEmail] = useState("");

    const handleSubscribe = async (e) => {
        e.preventDefault();

        if (!email) return toast.error("Please enter an email address");

        try {
            const response = await axios.post('http://localhost:5000/api/subscribe', { email });
            toast.success(response.data.message);
            setEmail("");
        } catch (err) {
            toast.error(err.response?.data?.error || "Subscription failed");
        }
    };

    return (
        <>
            <div className="footer mt-5 py-5">
                <div className="container">
                    <div className="row gy-4">
                        <div className="col-lg-8">
                            <div className="row">
                                {/* Company */}
                                <div className="col-md-4">
                                    <h3 className="mb-3">Company</h3>
                                    <p className="mb-0">Find a store near you</p>
                                    <p className="mb-4">
                                        <Link to="/stores" className="text-decoration-none" style={{ color: '#d0d0d0' }}>
                                            See Our Stores
                                        </Link>
                                    </p>
                                    <p className="mb-0"><strong>+1 234 567 890</strong></p>
                                    <p>hello@virelle.com</p>
                                </div>

                                {/* Useful Links */}
                                <div className="col-md-4">
                                    <h3 className="mb-3">Useful Links</h3>
                                    <ul className="list-unstyled">
                                        <li className="mb-2">
                                            <Link to="/shop?sortBy=New" className="text-decoration-none">
                                                - New Arrivals
                                            </Link>
                                        </li>
                                        <li className="mb-2">
                                            <Link to="/shop?sortBy=best" className="text-decoration-none">
                                                - Best Sellers
                                            </Link>
                                        </li>
                                        <li className="mb-2">
                                            <Link to="/shop?tag=Sale" className="text-decoration-none">
                                                - Bundle & Save
                                            </Link>
                                        </li>
                                        <li className="mb-2">
                                            <Link to="/shop" className="text-decoration-none">
                                                - Online Gift Cards
                                            </Link>
                                        </li>
                                    </ul>
                                </div>

                                {/* Information */}
                                <div className="col-md-4">
                                    <h3 className="mb-3">Information</h3>
                                    <ul className="list-unstyled">
                                        <li className="mb-2">
                                            <Link to="/contact#returns" className="text-decoration-none">
                                                - Start a Return
                                            </Link>
                                        </li>
                                        <li className="mb-2">
                                            <Link to="/contact" className="text-decoration-none">
                                                - Contact Us
                                            </Link>
                                        </li>
                                        <li className="mb-2">
                                            <Link to="/contact#faq" className="text-decoration-none">
                                                - Shipping FAQ
                                            </Link>
                                        </li>
                                        <li className="mb-2">
                                            <Link to="/contact#privacy" className="text-decoration-none">
                                                - Privacy Policy
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="col-lg-4">
                            <h3 className="mb-4">Subscribe to our newsletter</h3>
                            <p className="mb-5">Enter your email to get the latest news, updates and special offers delivered directly in your inbox</p>
                            <form className="subscribe-box d-flex" onSubmit={handleSubscribe}>
                                <input 
                                    type="email" 
                                    className="form-control" 
                                    placeholder='Enter your email address' 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button type="submit" className="btn">Subscribe</button>
                            </form>
                        </div>
                    </div>

                    <div className="footer-bottom mt-5">
                        <div className="row align-items-start">
                            <div className="col-lg-4">
                                <div className="footer-icon-text d-flex gap-3 justify-content-center justify-content-lg-end">
                                    <p>Copyright © 2026, All Rights Reserved</p>
                                    <div className="footer-icons d-flex gap-2">
                                        <a href="#" className="text-decoration-none" style={{ color: '#d0d0d0' }}>
                                            <i className="bi bi-instagram"></i>
                                        </a>
                                        <a href="#" className="text-decoration-none" style={{ color: '#d0d0d0' }}>
                                            <i className="bi bi-twitter-x"></i>
                                        </a>
                                        <a href="#" className="text-decoration-none" style={{ color: '#d0d0d0' }}>
                                            <i className="bi bi-facebook"></i>
                                        </a>
                                        <a href="#" className="text-decoration-none" style={{ color: '#d0d0d0' }}>
                                            <i className="bi bi-youtube"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="footer-logo text-center">
                                    <Link to="/" className="navbar-brand mx-auto order-0">
                                        <h2 className="m-0 fw-bold" style={{ letterSpacing: "2px", color: '#B4975A' }}>VIRELLE</h2>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="payment-img mt-4 mt-xl-0 gap-2 d-flex justify-content-center justify-content-lg-end">
                                    <img src={payment1} alt="Visa" className="img-fluid" style={{ height: '30px' }}/>
                                    <img src={payment2} alt="Mastercard" className='img-fluid' style={{ height: '30px' }}/>
                                    <img src={payment3} alt="Amex" className='img-fluid' style={{ height: '30px' }}/>
                                    <img src={payment4} alt="Discover" className='img-fluid' style={{ height: '30px' }}/>
                                    <img src={payment5} alt="PayPal" className='img-fluid' style={{ height: '30px' }}/>
                                    <img src={payment7} alt="Payment" className='img-fluid' style={{ height: '30px' }}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;