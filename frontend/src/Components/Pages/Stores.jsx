import React from 'react'
import store1 from './../../assets/store_page/store1.png';
import store2 from './../../assets/store_page/store2.png';
import store3 from './../../assets/store_page/store3.png';
import { Link } from 'react-router-dom'
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

function Stores() {
  return (
    <>
      <Breadcrumbs />

      {/* Store Finder Header - Clean & Simple */}
      <section className="stores-header py-5" style={{
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
                Find Your Nearest Store
              </span>
              <h1 className="display-3 fw-bold mb-3" style={{
                fontFamily: 'Playfair Display, serif',
                color: '#2D402E',
                letterSpacing: '1px'
              }}>
                Visit Our <span style={{ color: '#B4975A' }}>Botanical</span> Stores
              </h1>
              <p className="lead" style={{
                color: '#666',
                maxWidth: '600px',
                margin: '0 auto',
                fontSize: '1.1rem',
                lineHeight: '1.8'
              }}>
                We're talking about clean beauty gift sets, and we've got a bouquet of beauties 
                for yourself or someone you love
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Store Cards */}
      <div className="container py-4">
        <div className="row g-5">
          
          {/* Store 1 - New York */}
          <div className="col-12">
            <div className="store-card" style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
              transition: 'all 0.4s ease',
              border: '1px solid rgba(45,64,46,0.06)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.06)';
            }}>
              <div className="row g-0 align-items-stretch">
                {/* Image - Left */}
                <div className="col-lg-6">
                  <div className="store-image-wrapper" style={{
                    height: '100%',
                    minHeight: '400px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <img 
                      src={store1} 
                      alt="New York Store" 
                      className="img-fluid" 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.03)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      left: '20px',
                      background: '#B4975A',
                      color: 'white',
                      padding: '6px 20px',
                      fontSize: '0.7rem',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      fontWeight: '600'
                    }}>
                      Flagship Store
                    </div>
                  </div>
                </div>

                {/* Info - Right */}
                <div className="col-lg-6">
                  <div className="store-info p-5 d-flex flex-column h-100 justify-content-center" style={{
                    backgroundColor: '#F9F7F2'
                  }}>
                    <span className="text-uppercase small mb-2" style={{
                      color: '#B4975A',
                      letterSpacing: '3px',
                      fontSize: '0.7rem',
                      fontWeight: '600'
                    }}>
                      New York
                    </span>
                    <h2 className="fw-bold mb-4" style={{
                      fontFamily: 'Playfair Display, serif',
                      color: '#2D402E',
                      fontSize: '2.2rem'
                    }}>
                      New York Store
                    </h2>

                    <div className="row g-4">
                      {/* Address */}
                      <div className="col-md-6">
                        <div className="d-flex align-items-start gap-3">
                          <i className="bi bi-geo-alt" style={{ 
                            color: '#B4975A', 
                            fontSize: '1.3rem',
                            marginTop: '3px'
                          }}></i>
                          <div>
                            <h6 className="fw-bold mb-1" style={{ color: '#2D402E', fontSize: '0.85rem' }}>
                              Address
                            </h6>
                            <p className="text-muted mb-0" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                              3242 Abbot Kinney BLVD
                            </p>
                            <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                              PH Venice, CA 124
                            </p>
                            <Link to="/contact#map" className="text-decoration-none" style={{
                              color: '#B4975A',
                              fontSize: '0.85rem',
                              fontWeight: '500',
                              borderBottom: '2px solid #B4975A',
                              paddingBottom: '2px',
                              transition: 'all 0.3s ease',
                              display: 'inline-block'
                            }}
                            onMouseEnter={(e) => e.target.style.color = '#2D402E'}
                            onMouseLeave={(e) => e.target.style.color = '#B4975A'}>
                              Get Direction →
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Hours */}
                      <div className="col-md-6">
                        <div className="d-flex align-items-start gap-3">
                          <i className="bi bi-clock" style={{ 
                            color: '#B4975A', 
                            fontSize: '1.3rem',
                            marginTop: '3px'
                          }}></i>
                          <div>
                            <h6 className="fw-bold mb-1" style={{ color: '#2D402E', fontSize: '0.85rem' }}>
                              Hours of Operation
                            </h6>
                            <div className="d-flex justify-content-between" style={{ fontSize: '0.9rem' }}>
                              <span className="text-muted">Mon - Fri</span>
                              <span className="fw-semibold" style={{ color: '#2D402E' }}>9:00 AM - 8:00 PM</span>
                            </div>
                            <div className="d-flex justify-content-between" style={{ fontSize: '0.9rem' }}>
                              <span className="text-muted">Sat - Sun</span>
                              <span className="fw-semibold" style={{ color: '#2D402E' }}>10:00 AM - 6:00 PM</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="col-md-6">
                        <div className="d-flex align-items-start gap-3">
                          <i className="bi bi-telephone" style={{ 
                            color: '#B4975A', 
                            fontSize: '1.3rem',
                            marginTop: '3px'
                          }}></i>
                          <div>
                            <h6 className="fw-bold mb-1" style={{ color: '#2D402E', fontSize: '0.85rem' }}>
                              Contact
                            </h6>
                            <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                              Mobile: <span className="fw-semibold" style={{ color: '#2D402E' }}>087 1234 5678</span>
                            </p>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                              Email: <span className="fw-semibold" style={{ color: '#2D402E' }}>hello@virelle.com</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Social */}
                      <div className="col-md-6">
                        <div className="d-flex align-items-start gap-3">
                          <i className="bi bi-share" style={{ 
                            color: '#B4975A', 
                            fontSize: '1.3rem',
                            marginTop: '3px'
                          }}></i>
                          <div>
                            <h6 className="fw-bold mb-2" style={{ color: '#2D402E', fontSize: '0.85rem' }}>
                              Social Media
                            </h6>
                            <div className="d-flex gap-3">
                              <a href="#" className="text-decoration-none" style={{
                                color: '#666',
                                transition: 'all 0.3s ease',
                                fontSize: '1.2rem'
                              }}
                              onMouseEnter={(e) => e.target.style.color = '#B4975A'}
                              onMouseLeave={(e) => e.target.style.color = '#666'}>
                                <i className="fa-brands fa-facebook-f"></i>
                              </a>
                              <a href="#" className="text-decoration-none" style={{
                                color: '#666',
                                transition: 'all 0.3s ease',
                                fontSize: '1.2rem'
                              }}
                              onMouseEnter={(e) => e.target.style.color = '#B4975A'}
                              onMouseLeave={(e) => e.target.style.color = '#666'}>
                                <i className="fa-brands fa-twitter"></i>
                              </a>
                              <a href="#" className="text-decoration-none" style={{
                                color: '#666',
                                transition: 'all 0.3s ease',
                                fontSize: '1.2rem'
                              }}
                              onMouseEnter={(e) => e.target.style.color = '#B4975A'}
                              onMouseLeave={(e) => e.target.style.color = '#666'}>
                                <i className="fa-brands fa-instagram"></i>
                              </a>
                              <a href="#" className="text-decoration-none" style={{
                                color: '#666',
                                transition: 'all 0.3s ease',
                                fontSize: '1.2rem'
                              }}
                              onMouseEnter={(e) => e.target.style.color = '#B4975A'}
                              onMouseLeave={(e) => e.target.style.color = '#666'}>
                                <i className="fa-brands fa-youtube"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Store 2 - California (Image on Right) */}
          <div className="col-12">
            <div className="store-card" style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
              transition: 'all 0.4s ease',
              border: '1px solid rgba(45,64,46,0.06)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.06)';
            }}>
              <div className="row g-0 align-items-stretch flex-row-reverse">
                {/* Image - Right */}
                <div className="col-lg-6">
                  <div className="store-image-wrapper" style={{
                    height: '100%',
                    minHeight: '400px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <img 
                      src={store2} 
                      alt="California Store" 
                      className="img-fluid" 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.03)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      right: '20px',
                      background: '#2D402E',
                      color: 'white',
                      padding: '6px 20px',
                      fontSize: '0.7rem',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      fontWeight: '600'
                    }}>
                      West Coast
                    </div>
                  </div>
                </div>

                {/* Info - Left */}
                <div className="col-lg-6">
                  <div className="store-info p-5 d-flex flex-column h-100 justify-content-center" style={{
                    backgroundColor: '#F9F7F2'
                  }}>
                    <span className="text-uppercase small mb-2" style={{
                      color: '#B4975A',
                      letterSpacing: '3px',
                      fontSize: '0.7rem',
                      fontWeight: '600'
                    }}>
                      California
                    </span>
                    <h2 className="fw-bold mb-4" style={{
                      fontFamily: 'Playfair Display, serif',
                      color: '#2D402E',
                      fontSize: '2.2rem'
                    }}>
                      California Store
                    </h2>

                    <div className="row g-4">
                      {/* Address */}
                      <div className="col-md-6">
                        <div className="d-flex align-items-start gap-3">
                          <i className="bi bi-geo-alt" style={{ 
                            color: '#B4975A', 
                            fontSize: '1.3rem',
                            marginTop: '3px'
                          }}></i>
                          <div>
                            <h6 className="fw-bold mb-1" style={{ color: '#2D402E', fontSize: '0.85rem' }}>
                              Address
                            </h6>
                            <p className="text-muted mb-0" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                              3422 Abbot Kinney BLVD
                            </p>
                            <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                              PH Venice, CA 124
                            </p>
                            <Link to="/contact#map" className="text-decoration-none" style={{
                              color: '#B4975A',
                              fontSize: '0.85rem',
                              fontWeight: '500',
                              borderBottom: '2px solid #B4975A',
                              paddingBottom: '2px',
                              transition: 'all 0.3s ease',
                              display: 'inline-block'
                            }}
                            onMouseEnter={(e) => e.target.style.color = '#2D402E'}
                            onMouseLeave={(e) => e.target.style.color = '#B4975A'}>
                              Get Direction →
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Hours */}
                      <div className="col-md-6">
                        <div className="d-flex align-items-start gap-3">
                          <i className="bi bi-clock" style={{ 
                            color: '#B4975A', 
                            fontSize: '1.3rem',
                            marginTop: '3px'
                          }}></i>
                          <div>
                            <h6 className="fw-bold mb-1" style={{ color: '#2D402E', fontSize: '0.85rem' }}>
                              Hours of Operation
                            </h6>
                            <div className="d-flex justify-content-between" style={{ fontSize: '0.9rem' }}>
                              <span className="text-muted">Mon - Fri</span>
                              <span className="fw-semibold" style={{ color: '#2D402E' }}>9:00 AM - 8:00 PM</span>
                            </div>
                            <div className="d-flex justify-content-between" style={{ fontSize: '0.9rem' }}>
                              <span className="text-muted">Sat - Sun</span>
                              <span className="fw-semibold" style={{ color: '#2D402E' }}>10:00 AM - 6:00 PM</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="col-md-6">
                        <div className="d-flex align-items-start gap-3">
                          <i className="bi bi-telephone" style={{ 
                            color: '#B4975A', 
                            fontSize: '1.3rem',
                            marginTop: '3px'
                          }}></i>
                          <div>
                            <h6 className="fw-bold mb-1" style={{ color: '#2D402E', fontSize: '0.85rem' }}>
                              Contact
                            </h6>
                            <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                              Mobile: <span className="fw-semibold" style={{ color: '#2D402E' }}>087 1234 5678</span>
                            </p>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                              Email: <span className="fw-semibold" style={{ color: '#2D402E' }}>hello@virelle.com</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Social */}
                      <div className="col-md-6">
                        <div className="d-flex align-items-start gap-3">
                          <i className="bi bi-share" style={{ 
                            color: '#B4975A', 
                            fontSize: '1.3rem',
                            marginTop: '3px'
                          }}></i>
                          <div>
                            <h6 className="fw-bold mb-2" style={{ color: '#2D402E', fontSize: '0.85rem' }}>
                              Social Media
                            </h6>
                            <div className="d-flex gap-3">
                              <a href="#" className="text-decoration-none" style={{
                                color: '#666',
                                transition: 'all 0.3s ease',
                                fontSize: '1.2rem'
                              }}
                              onMouseEnter={(e) => e.target.style.color = '#B4975A'}
                              onMouseLeave={(e) => e.target.style.color = '#666'}>
                                <i className="fa-brands fa-facebook-f"></i>
                              </a>
                              <a href="#" className="text-decoration-none" style={{
                                color: '#666',
                                transition: 'all 0.3s ease',
                                fontSize: '1.2rem'
                              }}
                              onMouseEnter={(e) => e.target.style.color = '#B4975A'}
                              onMouseLeave={(e) => e.target.style.color = '#666'}>
                                <i className="fa-brands fa-twitter"></i>
                              </a>
                              <a href="#" className="text-decoration-none" style={{
                                color: '#666',
                                transition: 'all 0.3s ease',
                                fontSize: '1.2rem'
                              }}
                              onMouseEnter={(e) => e.target.style.color = '#B4975A'}
                              onMouseLeave={(e) => e.target.style.color = '#666'}>
                                <i className="fa-brands fa-instagram"></i>
                              </a>
                              <a href="#" className="text-decoration-none" style={{
                                color: '#666',
                                transition: 'all 0.3s ease',
                                fontSize: '1.2rem'
                              }}
                              onMouseEnter={(e) => e.target.style.color = '#B4975A'}
                              onMouseLeave={(e) => e.target.style.color = '#666'}>
                                <i className="fa-brands fa-youtube"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Store 3 - Texas (Image on Left again) */}
          <div className="col-12">
            <div className="store-card" style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
              transition: 'all 0.4s ease',
              border: '1px solid rgba(45,64,46,0.06)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.06)';
            }}>
              <div className="row g-0 align-items-stretch">
                {/* Image - Left */}
                <div className="col-lg-6">
                  <div className="store-image-wrapper" style={{
                    height: '100%',
                    minHeight: '400px',
                    overflow: 'hidden',
                    position: 'relative'
                  }}>
                    <img 
                      src={store3} 
                      alt="Texas Store" 
                      className="img-fluid" 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.03)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                    <div style={{
                      position: 'absolute',
                      top: '20px',
                      left: '20px',
                      background: '#B4975A',
                      color: 'white',
                      padding: '6px 20px',
                      fontSize: '0.7rem',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      fontWeight: '600'
                    }}>
                      Southern Charm
                    </div>
                  </div>
                </div>

                {/* Info - Right */}
                <div className="col-lg-6">
                  <div className="store-info p-5 d-flex flex-column h-100 justify-content-center" style={{
                    backgroundColor: '#F9F7F2'
                  }}>
                    <span className="text-uppercase small mb-2" style={{
                      color: '#B4975A',
                      letterSpacing: '3px',
                      fontSize: '0.7rem',
                      fontWeight: '600'
                    }}>
                      Texas
                    </span>
                    <h2 className="fw-bold mb-4" style={{
                      fontFamily: 'Playfair Display, serif',
                      color: '#2D402E',
                      fontSize: '2.2rem'
                    }}>
                      Texas Store
                    </h2>

                    <div className="row g-4">
                      {/* Address */}
                      <div className="col-md-6">
                        <div className="d-flex align-items-start gap-3">
                          <i className="bi bi-geo-alt" style={{ 
                            color: '#B4975A', 
                            fontSize: '1.3rem',
                            marginTop: '3px'
                          }}></i>
                          <div>
                            <h6 className="fw-bold mb-1" style={{ color: '#2D402E', fontSize: '0.85rem' }}>
                              Address
                            </h6>
                            <p className="text-muted mb-0" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                              3242 Abbot Kinney BLVD
                            </p>
                            <p className="text-muted" style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
                              PH Venice, CA 124
                            </p>
                            <Link to="/contact#map" className="text-decoration-none" style={{
                              color: '#B4975A',
                              fontSize: '0.85rem',
                              fontWeight: '500',
                              borderBottom: '2px solid #B4975A',
                              paddingBottom: '2px',
                              transition: 'all 0.3s ease',
                              display: 'inline-block'
                            }}
                            onMouseEnter={(e) => e.target.style.color = '#2D402E'}
                            onMouseLeave={(e) => e.target.style.color = '#B4975A'}>
                              Get Direction →
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/* Hours */}
                      <div className="col-md-6">
                        <div className="d-flex align-items-start gap-3">
                          <i className="bi bi-clock" style={{ 
                            color: '#B4975A', 
                            fontSize: '1.3rem',
                            marginTop: '3px'
                          }}></i>
                          <div>
                            <h6 className="fw-bold mb-1" style={{ color: '#2D402E', fontSize: '0.85rem' }}>
                              Hours of Operation
                            </h6>
                            <div className="d-flex justify-content-between" style={{ fontSize: '0.9rem' }}>
                              <span className="text-muted">Mon - Fri</span>
                              <span className="fw-semibold" style={{ color: '#2D402E' }}>9:00 AM - 8:00 PM</span>
                            </div>
                            <div className="d-flex justify-content-between" style={{ fontSize: '0.9rem' }}>
                              <span className="text-muted">Sat - Sun</span>
                              <span className="fw-semibold" style={{ color: '#2D402E' }}>10:00 AM - 6:00 PM</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Contact */}
                      <div className="col-md-6">
                        <div className="d-flex align-items-start gap-3">
                          <i className="bi bi-telephone" style={{ 
                            color: '#B4975A', 
                            fontSize: '1.3rem',
                            marginTop: '3px'
                          }}></i>
                          <div>
                            <h6 className="fw-bold mb-1" style={{ color: '#2D402E', fontSize: '0.85rem' }}>
                              Contact
                            </h6>
                            <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
                              Mobile: <span className="fw-semibold" style={{ color: '#2D402E' }}>087 1234 5678</span>
                            </p>
                            <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                              Email: <span className="fw-semibold" style={{ color: '#2D402E' }}>hello@virelle.com</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Social */}
                      <div className="col-md-6">
                        <div className="d-flex align-items-start gap-3">
                          <i className="bi bi-share" style={{ 
                            color: '#B4975A', 
                            fontSize: '1.3rem',
                            marginTop: '3px'
                          }}></i>
                          <div>
                            <h6 className="fw-bold mb-2" style={{ color: '#2D402E', fontSize: '0.85rem' }}>
                              Social Media
                            </h6>
                            <div className="d-flex gap-3">
                              <a href="#" className="text-decoration-none" style={{
                                color: '#666',
                                transition: 'all 0.3s ease',
                                fontSize: '1.2rem'
                              }}
                              onMouseEnter={(e) => e.target.style.color = '#B4975A'}
                              onMouseLeave={(e) => e.target.style.color = '#666'}>
                                <i className="fa-brands fa-facebook-f"></i>
                              </a>
                              <a href="#" className="text-decoration-none" style={{
                                color: '#666',
                                transition: 'all 0.3s ease',
                                fontSize: '1.2rem'
                              }}
                              onMouseEnter={(e) => e.target.style.color = '#B4975A'}
                              onMouseLeave={(e) => e.target.style.color = '#666'}>
                                <i className="fa-brands fa-twitter"></i>
                              </a>
                              <a href="#" className="text-decoration-none" style={{
                                color: '#666',
                                transition: 'all 0.3s ease',
                                fontSize: '1.2rem'
                              }}
                              onMouseEnter={(e) => e.target.style.color = '#B4975A'}
                              onMouseLeave={(e) => e.target.style.color = '#666'}>
                                <i className="fa-brands fa-instagram"></i>
                              </a>
                              <a href="#" className="text-decoration-none" style={{
                                color: '#666',
                                transition: 'all 0.3s ease',
                                fontSize: '1.2rem'
                              }}
                              onMouseEnter={(e) => e.target.style.color = '#B4975A'}
                              onMouseLeave={(e) => e.target.style.color = '#666'}>
                                <i className="fa-brands fa-youtube"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Stores;