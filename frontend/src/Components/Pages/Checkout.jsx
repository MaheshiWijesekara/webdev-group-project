import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import Navbar from "../Nav/Nav";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

function Checkout() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    cardName: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [deliveryOption, setDeliveryOption] = useState("ship");
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, email: user.email, firstName: user.name.split(' ')[0] }));
    }
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- CARD INPUT FORMATTING FUNCTIONS ---

  // Format card number: 1234 5678 9012 3456
  const formatCardNumber = (value) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');
    // Add space after every 4 digits
    const formatted = cleaned.replace(/(.{4})/g, '$1 ').trim();
    return formatted;
  };

  // Handle card number input
  const handleCardNumberChange = (e) => {
    const rawValue = e.target.value.replace(/\s/g, ''); // Remove spaces
    if (rawValue.length <= 16) {
      const formatted = formatCardNumber(rawValue);
      setFormData({ ...formData, cardNumber: formatted });
    }
  };

  // Format expiry: MM/YY
  const formatExpiry = (value) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 0) return '';
    if (cleaned.length <= 2) return cleaned;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
  };

  // Handle expiry input
  const handleExpiryChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    if (rawValue.length <= 4) {
      const formatted = formatExpiry(rawValue);
      setFormData({ ...formData, expiry: formatted });
    }
  };

  // Handle CVV input (max 4 digits)
  const handleCvvChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    if (rawValue.length <= 4) {
      setFormData({ ...formData, cvv: rawValue });
    }
  };

  // Validate card number (must be 16 digits)
  const isValidCardNumber = (number) => {
    const cleaned = number.replace(/\s/g, '');
    return cleaned.length === 16;
  };

  // Validate expiry (must be MM/YY format and not expired)
  const isValidExpiry = (expiry) => {
    if (!expiry || expiry.length !== 5) return false;
    const [month, year] = expiry.split('/');
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;
    const expMonth = parseInt(month);
    const expYear = parseInt(year);
    if (expMonth < 1 || expMonth > 12) return false;
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
      return false;
    }
    return true;
  };

  // Validate CVV (3-4 digits)
  const isValidCvv = (cvv) => {
    return cvv.length >= 3 && cvv.length <= 4;
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const priceStr = item.price.toString().replace("Rs.", "").replace(",", "");
    const price = parseFloat(priceStr) || 0;
    return acc + price * (item.quantity || 1);
  }, 0);

  const estimatedTax = (totalPrice * 0.1);
  const finalTotal = (totalPrice + estimatedTax).toFixed(2);

  const validateForm = () => {
    const { email, address, city, cardName, cardNumber, expiry, cvv } = formData;
    
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      return false;
    }
    
    if (deliveryOption === "ship" && (!address || !city)) {
      toast.error("Shipping address and City are required");
      return false;
    }
    
    if (!cardName.trim()) {
      toast.error("Please enter the name on card");
      return false;
    }
    
    if (!isValidCardNumber(cardNumber)) {
      toast.error("Please enter a valid 16-digit card number");
      return false;
    }
    
    if (!isValidExpiry(expiry)) {
      toast.error("Please enter a valid expiry date (MM/YY)");
      return false;
    }
    
    if (!isValidCvv(cvv)) {
      toast.error("Please enter a valid CVV (3-4 digits)");
      return false;
    }
    
    return true;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (cartItems.length === 0) return toast.error("Your cart is empty!");

    setIsProcessing(true);

    try {
      await axios.post('http://localhost:5000/api/orders', {
        userId: user ? user.id : null,
        email: formData.email,
        total: finalTotal,
        items: cartItems
      });

      localStorage.removeItem('cart');
      if (user) await axios.delete(`http://localhost:5000/api/cart/clear/${user.id}`);

      window.dispatchEvent(new Event("cartUpdated"));
      toast.success("Order successful! Redirecting...");

      setTimeout(() => {
        navigate("/"); 
      }, 3000);
    } catch (err) {
      console.error(err);
      toast.error("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Navbar />
      
      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Checkout Header */}
      <section className="checkout-header py-4" style={{
        backgroundColor: 'var(--soft-beige)',
        paddingTop: '30px',
        paddingBottom: '20px'
      }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <span className="d-inline-block mb-2" style={{
                color: '#B4975A',
                fontSize: '0.7rem',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                fontWeight: '600'
              }}>
                Secure Checkout
              </span>
              <h1 className="display-3 fw-bold mb-2" style={{
                fontFamily: 'Playfair Display, serif',
                color: '#2D402E',
                letterSpacing: '1px'
              }}>
                Complete Your <span style={{ color: '#B4975A' }}>Order</span>
              </h1>
              <p className="lead" style={{
                color: '#666',
                maxWidth: '500px',
                margin: '0 auto',
                fontSize: '1rem',
                lineHeight: '1.8'
              }}>
                Fill in your details to finalize your purchase
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="container py-4">
        <div className="row g-4">
          
          {/* LEFT COLUMN: FORMS */}
          <div className="col-lg-7">
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '30px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
              border: '1px solid rgba(45,64,46,0.06)'
            }}>
              
              {/* Contact Information */}
              <section className="mb-4">
                <h5 className="fw-bold mb-3" style={{
                  fontFamily: 'Playfair Display, serif',
                  color: '#2D402E'
                }}>
                  Contact Information
                </h5>
                <input
                  type="email"
                  name="email"
                  className="form-control py-2"
                  placeholder="Email Address *"
                  value={formData.email}
                  onChange={handleInputChange}
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
                <div className="form-check mt-2">
                  <input className="form-check-input" type="checkbox" id="newsCheck" />
                  <label className="form-check-label text-muted small" htmlFor="newsCheck">
                    <i className="bi bi-envelope me-1"></i> Email me with news and offers
                  </label>
                </div>
              </section>

              {/* Delivery Method */}
              <section className="mb-4">
                <h5 className="fw-bold mb-3" style={{
                  fontFamily: 'Playfair Display, serif',
                  color: '#2D402E'
                }}>
                  Delivery Method
                </h5>
                <div className="d-flex gap-3 mb-3">
                  <button
                    className={`btn flex-grow-1 py-2 ${deliveryOption === "ship" ? 'active' : ''}`}
                    onClick={() => setDeliveryOption("ship")}
                    style={{
                      backgroundColor: deliveryOption === "ship" ? '#2D402E' : 'white',
                      color: deliveryOption === "ship" ? 'white' : '#666',
                      border: deliveryOption === "ship" ? 'none' : '1px solid #eee',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      letterSpacing: '1px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (deliveryOption !== "ship") {
                        e.target.style.backgroundColor = '#f5f5f5';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (deliveryOption !== "ship") {
                        e.target.style.backgroundColor = 'white';
                      }
                    }}
                  >
                    <i className="bi bi-truck me-2"></i> Ship to Address
                  </button>
                  <button
                    className={`btn flex-grow-1 py-2 ${deliveryOption === "pickup" ? 'active' : ''}`}
                    onClick={() => setDeliveryOption("pickup")}
                    style={{
                      backgroundColor: deliveryOption === "pickup" ? '#2D402E' : 'white',
                      color: deliveryOption === "pickup" ? 'white' : '#666',
                      border: deliveryOption === "pickup" ? 'none' : '1px solid #eee',
                      borderRadius: '8px',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      letterSpacing: '1px',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      if (deliveryOption !== "pickup") {
                        e.target.style.backgroundColor = '#f5f5f5';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (deliveryOption !== "pickup") {
                        e.target.style.backgroundColor = 'white';
                      }
                    }}
                  >
                    <i className="bi bi-shop me-2"></i> Pickup in Store
                  </button>
                </div>

                {/* Shipping Address Form */}
                {deliveryOption === "ship" && (
                  <div className="row g-2">
                    <div className="col-md-6">
                      <input 
                        type="text" 
                        name="firstName" 
                        className="form-control py-2" 
                        placeholder="First Name" 
                        value={formData.firstName} 
                        onChange={handleInputChange}
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
                      <input 
                        type="text" 
                        name="lastName" 
                        className="form-control py-2" 
                        placeholder="Last Name *" 
                        value={formData.lastName} 
                        onChange={handleInputChange} 
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
                      <input 
                        type="text" 
                        name="address" 
                        className="form-control py-2" 
                        placeholder="Address *" 
                        value={formData.address} 
                        onChange={handleInputChange} 
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
                      <input 
                        type="text" 
                        name="city" 
                        className="form-control py-2" 
                        placeholder="City *" 
                        value={formData.city} 
                        onChange={handleInputChange} 
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
                      <input 
                        type="text" 
                        name="postalCode" 
                        className="form-control py-2" 
                        placeholder="Postal Code" 
                        value={formData.postalCode} 
                        onChange={handleInputChange}
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
                  </div>
                )}
              </section>

              {/* Payment Section - WITH CARD FORMATTING */}
              <section className="mb-3">
                <h5 className="fw-bold mb-3" style={{
                  fontFamily: 'Playfair Display, serif',
                  color: '#2D402E'
                }}>
                  Payment
                </h5>
                <div style={{
                  backgroundColor: '#F9F7F2',
                  borderRadius: '8px',
                  padding: '20px'
                }}>
                  {/* Name on Card */}
                  <div className="mb-3">
                    <input 
                      type="text" 
                      name="cardName" 
                      className="form-control py-2" 
                      placeholder="Name on card *" 
                      value={formData.cardName} 
                      onChange={handleInputChange} 
                      required
                      style={{
                        border: '1px solid #eee',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        transition: 'all 0.3s ease',
                        backgroundColor: 'white'
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

                  {/* Card Number - WITH FORMATTING */}
                  <div className="mb-3">
                    <div style={{ position: 'relative' }}>
                      <input 
                        type="text" 
                        name="cardNumber" 
                        className="form-control py-2" 
                        placeholder="Card number *" 
                        value={formData.cardNumber} 
                        onChange={handleCardNumberChange}
                        maxLength={19} // 16 digits + 3 spaces
                        required
                        style={{
                          border: '1px solid #eee',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          transition: 'all 0.3s ease',
                          backgroundColor: 'white',
                          paddingRight: '45px',
                          letterSpacing: '0.5px'
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
                      {/* Card type icon (simple indicator) */}
                      {formData.cardNumber && (
                        <div style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.2rem',
                          color: '#B4975A'
                        }}>
                          <i className="bi bi-credit-card"></i>
                        </div>
                      )}
                    </div>
                    <small className="text-muted" style={{ fontSize: '0.7rem' }}>
                      Enter 16-digit card number
                    </small>
                  </div>

                  {/* Expiry & CVV - SIDE BY SIDE */}
                  <div className="row g-2">
                    <div className="col-6">
                      <input 
                        type="text" 
                        name="expiry" 
                        className="form-control py-2" 
                        placeholder="MM / YY *" 
                        value={formData.expiry} 
                        onChange={handleExpiryChange}
                        maxLength={5} // MM/YY
                        required
                        style={{
                          border: '1px solid #eee',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          transition: 'all 0.3s ease',
                          backgroundColor: 'white'
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
                    <div className="col-6">
                      <input 
                        type="text" 
                        name="cvv" 
                        className="form-control py-2" 
                        placeholder="CVV *" 
                        value={formData.cvv} 
                        onChange={handleCvvChange}
                        maxLength={4}
                        required
                        style={{
                          border: '1px solid #eee',
                          borderRadius: '8px',
                          fontSize: '0.9rem',
                          transition: 'all 0.3s ease',
                          backgroundColor: 'white'
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

                  {/* Card icons and security note */}
                  <div className="mt-3 d-flex justify-content-between align-items-center flex-wrap gap-2">
                    <div className="d-flex gap-2">
                      <span style={{ fontSize: '1.2rem', opacity: 0.6 }}>
                        <i className="bi bi-credit-card"></i>
                      </span>
                      <span style={{ fontSize: '1.2rem', opacity: 0.6 }}>
                        <i className="bi bi-paypal"></i>
                      </span>
                      <span style={{ fontSize: '1.2rem', opacity: 0.6 }}>
                        <i className="bi bi-bank"></i>
                      </span>
                    </div>
                    <small className="text-muted">
                      <i className="bi bi-shield-check me-1"></i> Secure payment
                    </small>
                  </div>
                </div>
              </section>

              {/* Pay Now Button */}
              <button 
                className="btn w-100 py-3 fw-bold mt-3"
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                style={{
                  backgroundColor: '#2D402E',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  letterSpacing: '2px',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  if (!e.target.disabled) {
                    e.target.style.backgroundColor = '#5C4033';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!e.target.disabled) {
                    e.target.style.backgroundColor = '#2D402E';
                  }
                }}
              >
                {isProcessing ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Processing...
                  </>
                ) : (
                  <>
                    <i className="bi bi-lock me-2"></i> PAY NOW — RS. {finalTotal}
                  </>
                )}
              </button>

              {/* Back to Cart */}
              <div className="text-center mt-3">
                <Link 
                  to='/Cart' 
                  className="text-decoration-none"
                  style={{
                    color: '#B4975A',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    borderBottom: '2px solid #B4975A',
                    paddingBottom: '2px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#2D402E';
                    e.target.style.borderBottomColor = '#2D402E';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = '#B4975A';
                    e.target.style.borderBottomColor = '#B4975A';
                  }}
                >
                  <i className="bi bi-arrow-left me-2"></i> Return to Cart
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY */}
          <div className="col-lg-5">
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '25px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
              border: '1px solid rgba(45,64,46,0.06)',
              position: 'sticky',
              top: '100px'
            }}>
              <h4 className="fw-bold mb-4" style={{
                fontFamily: 'Playfair Display, serif',
                color: '#2D402E'
              }}>
                Order Summary ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
              </h4>
              
              {/* Cart Items */}
              <div className="cart-items-list mb-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {cartItems.map((item) => (
                  <div key={item.id} className="d-flex align-items-start mb-3 pb-2" style={{
                    borderBottom: '1px solid rgba(45,64,46,0.06)'
                  }}>
                    <div style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      flexShrink: 0,
                      backgroundColor: '#f8f9fa'
                    }}>
                      <img 
                        src={item.image} 
                        className="w-100 h-100" 
                        style={{ objectFit: 'cover' }} 
                        alt="" 
                      />
                    </div>
                    <div className="ms-3 flex-grow-1">
                      <p className="small fw-semibold mb-0" style={{ color: '#2D402E', fontSize: '0.8rem' }}>
                        {item.pname || item.name}
                      </p>
                      <p className="text-muted small mb-0" style={{ fontSize: '0.75rem' }}>
                        {item.price} x {item.quantity}
                      </p>
                    </div>
                    <div className="fw-semibold small" style={{ color: '#2D402E', fontSize: '0.8rem' }}>
                      Rs. {(parseFloat(item.price.toString().replace("Rs.", "")) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-top pt-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Subtotal</span>
                  <span className="fw-bold small" style={{ color: '#2D402E' }}>
                    Rs. {totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Shipping</span>
                  <span className="small" style={{ color: '#666' }}>
                    {deliveryOption === "pickup" ? "Free (Pickup)" : "Calculated at checkout"}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Estimated Tax (10%)</span>
                  <span className="fw-bold small" style={{ color: '#2D402E' }}>
                    Rs. {estimatedTax.toFixed(2)}
                  </span>
                </div>
                
                <div className="d-flex justify-content-between mt-3 pt-3 border-top">
                  <span className="h6 fw-bold m-0" style={{ color: '#2D402E' }}>Total</span>
                  <span className="h6 fw-bold m-0" style={{ color: '#2D402E' }}>
                    Rs. {finalTotal}
                  </span>
                </div>
              </div>

              <div className="mt-3">
                <small className="text-muted d-flex align-items-center gap-1">
                  <i className="bi bi-shield-check"></i> Secure checkout
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
    </>
  );
}

export default Checkout;