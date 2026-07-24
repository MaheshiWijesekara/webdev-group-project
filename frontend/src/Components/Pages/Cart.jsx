import React, { useState, useEffect, useContext } from "react"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from 'axios'; 
import { AuthContext } from "../../AuthContext"; 
import Navbar from "../Nav/Nav";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useContext(AuthContext);

  const getPrice = (price) => {
    if (!price) return 0;
    return parseFloat(price.toString().replace("Rs.", "").replace(",", "")) || 0;
  };

  useEffect(() => {
    const loadCart = async () => {
        if (user && user.id) {
            try {
                const response = await axios.get(`http://localhost:5000/api/cart/${user.id}`);
                const normalized = response.data.map(item => ({
                    ...item,
                    name: item.pname || item.name 
                }));
                setCartItems(normalized);
                localStorage.setItem("cart", JSON.stringify(normalized));
            } catch (err) { console.error(err); }
        } else {
            const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
            setCartItems(savedCart);
        }
    };
    loadCart();
  }, [user]);

  const updateQuantity = (id, type) => {
    const updated = cartItems.map((item) => {
      if (item.id === id) {
        let newQty = type === "increase" ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(1, newQty) };
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
    toast.error("Item removed from cart");
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + (getPrice(item.price) * item.quantity), 0);

  return (
    <>
      <Navbar />
      
      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Cart Header - Clean & Simple */}
      <section className="cart-header py-4" style={{
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
                Your Shopping
              </span>
              <h1 className="display-3 fw-bold mb-2" style={{
                fontFamily: 'Playfair Display, serif',
                color: '#2D402E',
                letterSpacing: '1px'
              }}>
                Shopping <span style={{ color: '#B4975A' }}>Cart</span>
              </h1>
              <p className="lead" style={{
                color: '#666',
                maxWidth: '500px',
                margin: '0 auto',
                fontSize: '1rem',
                lineHeight: '1.8'
              }}>
                Review your items before checking out
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <div className="container py-4">
        {cartItems.length === 0 ? (
          <div className="text-center py-5" style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '60px 20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
            border: '1px solid rgba(45,64,46,0.06)'
          }}>
            <i className="bi bi-cart-x" style={{ fontSize: '4rem', color: '#B4975A', opacity: 0.5 }}></i>
            <h3 className="mt-3" style={{ fontFamily: 'Playfair Display, serif', color: '#2D402E' }}>
              Your cart is empty
            </h3>
            <p className="text-muted mb-4">Looks like you haven't added any products yet.</p>
            <Link 
              to="/Shop" 
              className="btn px-4 py-2"
              style={{
                backgroundColor: '#2D402E',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.85rem',
                letterSpacing: '1px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#5C4033'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2D402E'}
            >
              <i className="bi bi-arrow-left me-2"></i> Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {/* Cart Items - Left Column */}
            <div className="col-lg-8">
              <div style={{
                backgroundColor: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                border: '1px solid rgba(45,64,46,0.06)'
              }}>
                {cartItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    style={{
                      padding: '20px',
                      borderBottom: index < cartItems.length - 1 ? '1px solid rgba(45,64,46,0.06)' : 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#F9F7F2'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  >
                    <div className="row align-items-center g-3">
                      {/* Product Image */}
                      <div className="col-3 col-md-2">
                        <div style={{
                          borderRadius: '8px',
                          overflow: 'hidden',
                          backgroundColor: '#f8f9fa',
                          aspectRatio: '1/1'
                        }}>
                          <img 
                            src={item.image} 
                            className="w-100 h-100" 
                            style={{ objectFit: 'cover' }} 
                            alt={item.pname} 
                          />
                        </div>
                      </div>
                      
                      {/* Product Info */}
                      <div className="col-9 col-md-6">
                        <h6 className="fw-bold mb-1" style={{
                          color: '#2D402E',
                          fontSize: '0.95rem',
                          fontFamily: 'Playfair Display, serif'
                        }}>
                          {item.pname}
                        </h6>
                        <p className="text-muted small mb-0" style={{ fontSize: '0.85rem' }}>
                          Rs. {item.price}
                        </p>
                      </div>
                      
                      {/* Quantity & Remove */}
                      <div className="col-12 col-md-4">
                        <div className="d-flex align-items-center justify-content-between justify-content-md-end gap-3">
                          {/* Quantity Controls */}
                          <div className="d-flex align-items-center" style={{
                            border: '1px solid #eee',
                            borderRadius: '8px',
                            overflow: 'hidden'
                          }}>
                            <button 
                              className="border-0 bg-transparent px-3 py-2"
                              onClick={() => updateQuantity(item.id, "decrease")}
                              style={{
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                              }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                              −
                            </button>
                            <span className="px-3 py-2 fw-semibold" style={{ minWidth: '30px', textAlign: 'center' }}>
                              {item.quantity}
                            </span>
                            <button 
                              className="border-0 bg-transparent px-3 py-2"
                              onClick={() => updateQuantity(item.id, "increase")}
                              style={{
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                cursor: 'pointer'
                              }}
                              onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                            >
                              +
                            </button>
                          </div>
                          
                          {/* Remove Button */}
                          <button 
                            className="border-0 bg-transparent text-danger"
                            onClick={() => removeItem(item.id)}
                            style={{
                              fontSize: '1.2rem',
                              transition: 'all 0.3s ease',
                              cursor: 'pointer',
                              padding: '5px'
                            }}
                            onMouseEnter={(e) => e.target.style.color = '#c0392b'}
                            onMouseLeave={(e) => e.target.style.color = '#dc3545'}
                          >
                            <i className="bi bi-trash3"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping Link */}
              <div className="mt-3">
                <Link 
                  to="/Shop" 
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
                  <i className="bi bi-arrow-left me-2"></i> Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary - Right Column */}
            <div className="col-lg-4">
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
                  Order Summary
                </h4>
                
                {/* Items Count */}
                <div className="d-flex justify-content-between mb-3 pb-2" style={{
                  borderBottom: '1px solid rgba(45,64,46,0.06)'
                }}>
                  <span className="text-muted">Items ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</span>
                  <span className="fw-semibold" style={{ color: '#2D402E' }}>
                    Rs. {totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Subtotal */}
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Subtotal</span>
                  <span className="fw-semibold" style={{ color: '#2D402E' }}>
                    Rs. {totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Shipping */}
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted">Shipping</span>
                  <span className="fw-semibold" style={{ color: '#2D402E' }}>
                    {totalPrice > 0 ? 'Calculated at checkout' : '—'}
                  </span>
                </div>

                {/* Divider */}
                <div style={{
                  borderTop: '1px solid rgba(45,64,46,0.08)',
                  margin: '15px 0'
                }}></div>

                {/* Total */}
                <div className="d-flex justify-content-between mb-4">
                  <span className="fw-bold" style={{ fontSize: '1.1rem', color: '#2D402E' }}>Total</span>
                  <span className="fw-bold" style={{ fontSize: '1.2rem', color: '#2D402E' }}>
                    Rs. {totalPrice.toFixed(2)}
                  </span>
                </div>

                {/* Checkout Button */}
                <Link 
                  to="/checkout" 
                  className="btn w-100 py-3 fw-bold"
                  style={{
                    backgroundColor: '#2D402E',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    letterSpacing: '2px',
                    fontSize: '0.85rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#5C4033'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#2D402E'}
                >
                  <i className="bi bi-lock me-2"></i> Proceed to Checkout
                </Link>

                {/* Secure Checkout Note */}
                <p className="text-center text-muted small mt-3 mb-0" style={{ fontSize: '0.7rem' }}>
                  <i className="bi bi-shield-check me-1"></i> Secure checkout
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <ToastContainer position="bottom-right" />
    </>
  );
}

export default Cart;