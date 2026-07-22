import React, { useState } from 'react';
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
        e.preventDefault(); // Prevents page reload

        if (!email) return toast.error("Please enter an email address");

        try {
            const response = await axios.post('http://localhost:5000/api/subscribe', { email });
            toast.success(response.data.message);
            setEmail(""); // Clear the input box after success
        } catch (err) {
            // Shows the "Already Subscribed" or "Database Error" message from backend
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
                        <div className="col-md-4">
                            <h3 className="mb-3">Company</h3>
                            <p className="mb-0">Find a store near you</p>
                            <p className="mb-4">you. See <strong>Our Stores</strong></p>
                            <p className="mb-0"><strong>+1 234 567 890</strong></p>
                            <p>hello@example.com</p>
                        </div>

                        <div className="col-md-4">
                            <h3 className="mb-3">Useful Links</h3>
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <a href="#" className="text-decoration-none">- New Arrivals</a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-decoration-none">- Best Sellers</a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-decoration-none">- Bundle & Save</a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-decoration-none">- Online Gift Cards</a>
                                </li>
                            </ul>
                        </div>

                        <div className="col-md-4">
                            <h3 className="mb-3">Information</h3>
                            <ul className="list-unstyled">
                                <li className="mb-2">
                                    <a href="#" className="text-decoration-none">- Start a Return</a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-decoration-none">- Contact Us</a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-decoration-none">- Shipping FAQ</a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-decoration-none">- Terms & Conditions</a>
                                </li>
                                <li className="mb-2">
                                    <a href="#" className="text-decoration-none">- Privacy Policy</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="col-lg-4">
                    <h3 className="mb-4">Subscribe to our newsletter</h3>
                    <p className="mb-5">Enter your email to get the latest news, updates and special offers delivered directly in your inbox</p>
                    {/* Wrapped in a form to trigger handleSubscribe on Enter key or button click */}
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
                                <i className="bi bi-instagram"></i>
                                <i className="bi bi-twitter-x"></i>
                                <i className="bi bi-facebook"></i>
                                <i className="bi bi-youtube"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="footer-logo text-center">
                            <a href="#" className="navbar-brand mx-auto order-0">
                                <h2 className="m-0 fw-bold" style={{letterSpacing: "2px"}}>VIRELLE</h2>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="payment-img mt-4 mt-xl-0 gap-2 d-flex justify-content-center justify-content-lg-end">
                            <img src={payment1} alt="" className="img-fluid"/>
                            <img src={payment2} alt="" className='img-fluid'/>
                            <img src={payment3} alt="" className='img-fluid'/>
                            <img src={payment4} alt="" className='img-fluid'/>
                            <img src={payment5} alt="" className='img-fluid'/>
                            <img src={payment7} alt="" className='img-fluid'/>
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