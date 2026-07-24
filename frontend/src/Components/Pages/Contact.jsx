import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../Nav/Nav';
import { toast, ToastContainer } from 'react-toastify';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

function Contact() {
  // Logic to handle scrolling to specific sections (Returns/FAQ) if clicked from footer
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  }, [hash]);

  return (
    <>
      <Navbar />
      
      {/* Breadcrumbs */}
        <Breadcrumbs />

      <section className="contact-section py-5" style={{ backgroundColor: 'var(--soft-beige)' }}>
        <div className="container text-center">
            <h1 className="display-4 fw-bold mb-3" style={{ fontFamily: 'Playfair Display', color: 'var(--primary-green)' }}>Keep in Touch with Us</h1>
            <p className="text-muted mb-5 mx-auto" style={{ maxWidth: '600px', lineHeight: '1.8' }}>
                Be the first to know about our latest news, special offers, and expert beauty tips for radiant, healthy skin.
            </p>

            <div className="row g-4 justify-content-center">
                {/* Address Card */}
                <div className="col-lg-4 col-md-6">
                    <div className="contact-box p-5 h-100 bg-white shadow-sm rounded-4 border-0 transition-hover">
                        <i className="bi bi-geo-alt fs-2 mb-3 d-block" style={{ color: '#B4975A' }}></i>
                        <h4 className="fw-bold mb-3" style={{ fontFamily: 'Playfair Display' }}>Address</h4>
                        <p className="text-muted small">123 Botanical Avenue,<br/>Colombo 07, Sri Lanka</p>
                        <a href="https://www.google.com/maps" className="btn btn-link text-dark fw-bold text-decoration-none border-bottom border-dark p-0 mt-3" target='_blank' rel='noopener noreferrer'>Get Directions</a>
                    </div>
                </div>

                {/* Contact Card */}
                <div className="col-lg-4 col-md-6">
                    <div className="contact-box p-5 h-100 bg-white shadow-sm rounded-4 border-0 transition-hover">
                        <i className="bi bi-telephone fs-2 mb-3 d-block" style={{ color: '#B4975A' }}></i>
                        <h4 className="fw-bold mb-3" style={{ fontFamily: 'Playfair Display' }}>Contact</h4>
                        <p className="mb-1 text-muted"><strong>Mobile: </strong>+94 123 456 789</p>
                        <p className="mb-1 text-muted"><strong>Hotline: </strong>1800 123 456</p>
                        <p className="text-muted"><strong>Email: </strong>hello@virelle.com</p>
                    </div>
                </div>

                {/* Hours Card */}
                <div className="col-lg-4 col-md-6">
                    <div className="contact-box p-5 h-100 bg-white shadow-sm rounded-4 border-0 transition-hover">
                        <i className="bi bi-clock fs-2 mb-3 d-block" style={{ color: '#B4975A' }}></i>
                        <h4 className="fw-bold mb-3" style={{ fontFamily: 'Playfair Display' }}>Opening Hours</h4>
                        <p className="mb-1 text-muted"><strong>Mon - Fri: </strong>9:00 AM - 6:00 PM</p>
                        <p className="text-muted"><strong>Sat - Sun: </strong>9.30 AM - 5.30 PM</p>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* --- INFORMATION SECTIONS (Linked from Footer) --- */}
      <section className="container py-5">
          <div className="row g-5">
              {/* Returns Section */}
              <div className="col-md-6" id="returns">
                  <div className="p-4 rounded-4" style={{ backgroundColor: '#EDF1EE' }}>
                      <h3 className="fw-bold mb-3" style={{ fontFamily: 'Playfair Display', color: 'var(--primary-green)' }}>Start a Return</h3>
                      <p className="text-muted small mb-4">We want you to love your glow. If you are not 100% satisfied, you can return your products within 30 days of purchase.</p>
                      <button className="btn btn-dark px-4 py-2 small fw-bold">INITIATE RETURN</button>
                  </div>
              </div>

              {/* FAQ Section */}
              <div className="col-md-6" id="faq">
                  <div className="p-4 rounded-4" style={{ backgroundColor: '#F4EFE6' }}>
                      <h3 className="fw-bold mb-3" style={{ fontFamily: 'Playfair Display', color: 'var(--earth-brown)' }}>Shipping FAQ</h3>
                      <ul className="list-unstyled text-muted small">
                          <li className="mb-2"><strong>How long does shipping take?</strong><br/>Usually 2-4 business days within Sri Lanka.</li>
                          <li><strong>Do you ship internationally?</strong><br/>Yes, we ship to over 20 countries worldwide.</li>
                      </ul>
                  </div>
              </div>
          </div>
      </section>

      <div className="contact-page bg-white py-5">
        {/* Map Section */}
        <section id="map" className='container mb-5'>
            <div className="rounded-4 overflow-hidden shadow-sm border">
                <iframe 
                    title="Our Location"
                    style={{ width: '100%', height: '450px', border: 0 }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798511756215!2d79.8504!3d6.9271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593d65604169%3A0xe54331d2797e8412!2sColombo!5e0!3m2!1sen!2slk!4v171457860542"  
                    allowFullScreen>
                </iframe>
            </div>
        </section>

        {/* Message Section */}
        <section className="container py-5 rounded-4 mb-5 shadow-sm" style={{ border: '1px solid #eee', maxWidth: '900px' }}>
            <h2 className="text-center fw-bold mb-4" style={{ fontFamily: 'Playfair Display' }}>Send A Message</h2>
            <form className="contact-form px-lg-5">
                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <input type="text" className="form-control py-3 border-0 bg-light" placeholder='Your Name' required/>
                    </div>
                    <div className="col-md-6">
                        <input type="email" className="form-control py-3 border-0 bg-light" placeholder='Your Email' required/>
                    </div>
                </div>
                <div className="mb-4">
                    <textarea placeholder='How can we help you?' className="form-control border-0 bg-light" style={{ minHeight: '180px' }} required></textarea>
                </div>
                <div className="text-center">
                    <button className="btn btn-dark px-5 py-3 fw-bold rounded-0" type='submit' style={{ letterSpacing: '2px' }}>
                        SEND MESSAGE
                    </button>
                </div>
            </form>
        </section>
      </div>

      <ToastContainer position="bottom-right" />
    </>
  )
}

export default Contact;