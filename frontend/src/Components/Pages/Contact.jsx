import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from '../Nav/Nav';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';
import { toast, ToastContainer } from 'react-toastify';

function Contact() {
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

      {/* Contact Header - Clean & Simple */}
      <section className="contact-header py-5" style={{
        backgroundColor: 'var(--soft-beige)',
        paddingTop: '40px',
        paddingBottom: '40px'
      }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <span className="d-inline-block mb-3" style={{
                color: '#B4975A',
                fontSize: '0.75rem',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                fontWeight: '600'
              }}>
                Get In Touch
              </span>
              <h1 className="display-3 fw-bold mb-3" style={{
                fontFamily: 'Playfair Display, serif',
                color: '#2D402E',
                letterSpacing: '1px'
              }}>
                Keep in <span style={{ color: '#B4975A' }}>Touch</span> with Us
              </h1>
              <p className="lead" style={{
                color: '#666',
                maxWidth: '600px',
                margin: '0 auto',
                fontSize: '1.1rem',
                lineHeight: '1.8'
              }}>
                Be the first to know about our latest news, special offers, and expert beauty 
                tips for radiant, healthy skin.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="contact-cards py-4" style={{ backgroundColor: 'var(--soft-beige)' }}>
        <div className="container">
          <div className="row g-4 justify-content-center">
            
            {/* Address Card */}
            <div className="col-lg-4 col-md-6">
              <div className="contact-card p-4" style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                transition: 'all 0.4s ease',
                border: '1px solid rgba(45,64,46,0.06)',
                height: '100%',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.06)';
              }}>
                <div className="icon-wrapper mb-3" style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#F9F7F2',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <i className="bi bi-geo-alt" style={{ 
                    color: '#B4975A', 
                    fontSize: '1.5rem'
                  }}></i>
                </div>
                <h4 className="fw-bold mb-3" style={{
                  fontFamily: 'Playfair Display, serif',
                  color: '#2D402E'
                }}>
                  Address
                </h4>
                <p className="text-muted mb-0" style={{ fontSize: '0.95rem', lineHeight: '1.8' }}>
                  123 Botanical Avenue,
                </p>
                <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.8' }}>
                  Colombo 07, Sri Lanka
                </p>
                <a 
                  href="https://www.google.com/maps" 
                  className="text-decoration-none" 
                  target='_blank' 
                  rel='noopener noreferrer'
                  style={{
                    color: '#B4975A',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    borderBottom: '2px solid #B4975A',
                    paddingBottom: '2px',
                    transition: 'all 0.3s ease',
                    display: 'inline-block',
                    marginTop: '10px'
                  }}
                  onMouseEnter={(e) => e.target.style.color = '#2D402E'}
                  onMouseLeave={(e) => e.target.style.color = '#B4975A'}>
                  Get Directions →
                </a>
              </div>
            </div>

            {/* Contact Card */}
            <div className="col-lg-4 col-md-6">
              <div className="contact-card p-4" style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                transition: 'all 0.4s ease',
                border: '1px solid rgba(45,64,46,0.06)',
                height: '100%',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.06)';
              }}>
                <div className="icon-wrapper mb-3" style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#F9F7F2',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <i className="bi bi-telephone" style={{ 
                    color: '#B4975A', 
                    fontSize: '1.5rem'
                  }}></i>
                </div>
                <h4 className="fw-bold mb-3" style={{
                  fontFamily: 'Playfair Display, serif',
                  color: '#2D402E'
                }}>
                  Contact
                </h4>
                <p className="text-muted mb-1" style={{ fontSize: '0.95rem' }}>
                  Mobile: <span className="fw-semibold" style={{ color: '#2D402E' }}>+94 123 456 789</span>
                </p>
                <p className="text-muted mb-1" style={{ fontSize: '0.95rem' }}>
                  Hotline: <span className="fw-semibold" style={{ color: '#2D402E' }}>1800 123 456</span>
                </p>
                <p className="text-muted" style={{ fontSize: '0.95rem' }}>
                  Email: <span className="fw-semibold" style={{ color: '#2D402E' }}>hello@virelle.com</span>
                </p>
              </div>
            </div>

            {/* Hours Card */}
            <div className="col-lg-4 col-md-6">
              <div className="contact-card p-4" style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                padding: '30px',
                boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                transition: 'all 0.4s ease',
                border: '1px solid rgba(45,64,46,0.06)',
                height: '100%',
                textAlign: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.06)';
              }}>
                <div className="icon-wrapper mb-3" style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: '#F9F7F2',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }}>
                  <i className="bi bi-clock" style={{ 
                    color: '#B4975A', 
                    fontSize: '1.5rem'
                  }}></i>
                </div>
                <h4 className="fw-bold mb-3" style={{
                  fontFamily: 'Playfair Display, serif',
                  color: '#2D402E'
                }}>
                  Opening Hours
                </h4>
                <div className="d-flex justify-content-between" style={{ fontSize: '0.95rem' }}>
                  <span className="text-muted">Mon - Fri</span>
                  <span className="fw-semibold" style={{ color: '#2D402E' }}>9:00 AM - 6:00 PM</span>
                </div>
                <div className="d-flex justify-content-between" style={{ fontSize: '0.95rem' }}>
                  <span className="text-muted">Sat - Sun</span>
                  <span className="fw-semibold" style={{ color: '#2D402E' }}>9:30 AM - 5:30 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Information Sections (Returns & FAQ) */}
      <section className="container py-5">
        <div className="row g-4">
          {/* Returns Section */}
          <div className="col-md-6" id="returns">
            <div className="p-4" style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
              border: '1px solid rgba(45,64,46,0.06)',
              height: '100%'
            }}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#EDF1EE',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <i className="bi bi-arrow-return-left" style={{ 
                    color: '#2D402E', 
                    fontSize: '1.3rem'
                  }}></i>
                </div>
                <h3 className="fw-bold mb-0" style={{
                  fontFamily: 'Playfair Display, serif',
                  color: '#2D402E',
                  fontSize: '1.5rem'
                }}>
                  Start a Return
                </h3>
              </div>
              <p className="text-muted" style={{ fontSize: '0.95rem', lineHeight: '1.8' }}>
                We want you to love your glow. If you are not 100% satisfied, you can return your products within 30 days of purchase.
              </p>
              <button className="btn" style={{
                backgroundColor: '#2D402E',
                color: 'white',
                border: 'none',
                padding: '10px 25px',
                fontSize: '0.8rem',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#5C4033'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2D402E'}>
                Initiate Return
              </button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="col-md-6" id="faq">
            <div className="p-4" style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
              border: '1px solid rgba(45,64,46,0.06)',
              height: '100%'
            }}>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div style={{
                  width: '50px',
                  height: '50px',
                  backgroundColor: '#F4EFE6',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <i className="bi bi-question-circle" style={{ 
                    color: '#B4975A', 
                    fontSize: '1.3rem'
                  }}></i>
                </div>
                <h3 className="fw-bold mb-0" style={{
                  fontFamily: 'Playfair Display, serif',
                  color: '#2D402E',
                  fontSize: '1.5rem'
                }}>
                  Shipping FAQ
                </h3>
              </div>
              <div className="mb-3">
                <p className="fw-bold mb-1" style={{ color: '#2D402E', fontSize: '0.9rem' }}>
                  How long does shipping take?
                </p>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                  Usually 2-4 business days within Sri Lanka.
                </p>
              </div>
              <div>
                <p className="fw-bold mb-1" style={{ color: '#2D402E', fontSize: '0.9rem' }}>
                  Do you ship internationally?
                </p>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                  Yes, we ship to over 20 countries worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="container mb-5">
        <div className="rounded-3 overflow-hidden" style={{
          boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
          border: '1px solid rgba(45,64,46,0.06)'
        }}>
          <iframe 
            title="Our Location"
            style={{ width: '100%', height: '450px', border: 0 }}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798511756215!2d79.8504!3d6.9271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2593d65604169%3A0xe54331d2797e8412!2sColombo!5e0!3m2!1sen!2slk!4v171457860542"  
            allowFullScreen>
          </iframe>
        </div>
      </section>

      {/* Message Section */}
      <section className="container py-4 mb-5" style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
        border: '1px solid rgba(45,64,46,0.06)',
        maxWidth: '900px',
        padding: '40px'
      }}>
        <div className="text-center mb-4">
          <span className="d-inline-block mb-2" style={{
            color: '#B4975A',
            fontSize: '0.7rem',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            Send Us a Message
          </span>
          <h2 className="fw-bold mb-0" style={{
            fontFamily: 'Playfair Display, serif',
            color: '#2D402E'
          }}>
            We'd Love to Hear From You
          </h2>
        </div>

        <form className="contact-form">
          <div className="row g-3 mb-3">
            <div className="col-md-6">
              <input 
                type="text" 
                className="form-control" 
                placeholder="Your Name" 
                required
                style={{
                  padding: '12px 15px',
                  border: '1px solid #eee',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
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
              <input 
                type="email" 
                className="form-control" 
                placeholder="Your Email" 
                required
                style={{
                  padding: '12px 15px',
                  border: '1px solid #eee',
                  borderRadius: '8px',
                  fontSize: '0.95rem',
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
          </div>
          <div className="mb-4">
            <textarea 
              placeholder="How can we help you?" 
              className="form-control" 
              rows="5"
              required
              style={{
                padding: '12px 15px',
                border: '1px solid #eee',
                borderRadius: '8px',
                fontSize: '0.95rem',
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
          <div className="text-center">
            <button 
              type='submit' 
              className="btn px-5 py-3 fw-bold"
              style={{
                backgroundColor: '#2D402E',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                fontSize: '0.85rem',
                transition: 'all 0.3s ease',
                padding: '12px 40px'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#5C4033'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2D402E'}>
              Send Message
            </button>
          </div>
        </form>
      </section>

      <ToastContainer position="bottom-right" />
    </>
  )
}

export default Contact;