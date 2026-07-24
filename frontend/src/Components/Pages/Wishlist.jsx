import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Nav/Nav";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";
import { Link } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setWishlist(storedWishlist);
    setCart(storedCart);
  }, []);

  const removeFromWishlist = (productId) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    window.dispatchEvent(new Event("wishlistUpdated"));
    toast.error("Item removed from wishlist");
  };

  const addtoCart = (product) => {
    const existingProduct = cart.find(item => item.id === product.id);
    let updatedCart; 

    if (existingProduct) {
        updatedCart = cart.map(item =>
            item.id === product.id ? {...item, quantity: item.quantity + 1} : item
        );
    }
    else {
        updatedCart = [...cart, {...product, quantity: 1}]
    }

    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));

    toast.success(`${product.pname} added to cart!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
  }

  return (
    <>
      <Navbar />
      
      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Wishlist Header - Clean & Simple */}
      <section className="wishlist-header py-4" style={{
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
                Your Collection
              </span>
              <h1 className="display-3 fw-bold mb-2" style={{
                fontFamily: 'Playfair Display, serif',
                color: '#2D402E',
                letterSpacing: '1px'
              }}>
                My <span style={{ color: '#B4975A' }}>Wishlist</span>
              </h1>
              <p className="lead" style={{
                color: '#666',
                maxWidth: '500px',
                margin: '0 auto',
                fontSize: '1rem',
                lineHeight: '1.8'
              }}>
                Your curated collection of favorite products
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Wishlist Content */}
      <div className="container py-4">
        {wishlist.length === 0 ? (
          <div className="text-center py-5" style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '60px 20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
            border: '1px solid rgba(45,64,46,0.06)'
          }}>
            <i className="bi bi-heart" style={{ fontSize: '4rem', color: '#B4975A', opacity: 0.5 }}></i>
            <h3 className="mt-3" style={{ fontFamily: 'Playfair Display, serif', color: '#2D402E' }}>
              Your wishlist is empty
            </h3>
            <p className="text-muted mb-4">Start saving your favorite products!</p>
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
              <i className="bi bi-arrow-left me-2"></i> Browse Products
            </Link>
          </div>
        ) : (
          <div className="row g-4">
            {wishlist.map((product) => (
              <div className="col-xl-3 col-lg-4 col-md-6" key={product.id}>
                <div className="wishlist-card" style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                  transition: 'all 0.4s ease',
                  border: '1px solid rgba(45,64,46,0.06)',
                  height: '100%'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.06)';
                }}>
                  {/* Product Image */}
                  <div className="position-relative overflow-hidden" style={{
                    height: '240px',
                    backgroundColor: '#f8f9fa'
                  }}>
                    <img 
                      src={product.image} 
                      className="w-100 h-100" 
                      style={{ 
                        objectFit: 'cover',
                        transition: 'transform 0.6s ease'
                      }}
                      alt={product.pname}
                      onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                    {/* Tag Badge */}
                    {product.tag && (
                      <span style={{
                        position: 'absolute',
                        top: '15px',
                        left: '15px',
                        backgroundColor: product.tag === "New" ? '#B4975A' : '#2D402E',
                        color: 'white',
                        padding: '4px 15px',
                        fontSize: '0.65rem',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        fontWeight: '600',
                        borderRadius: '20px'
                      }}>
                        {product.tag}
                      </span>
                    )}
                    {/* Wishlist Remove Button (on image) */}
                    <button
                      className="position-absolute border-0 bg-white rounded-circle"
                      onClick={() => removeFromWishlist(product.id)}
                      style={{
                        top: '15px',
                        right: '15px',
                        width: '35px',
                        height: '35px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        zIndex: 2
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#dc3545';
                        e.target.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.color = '#dc3545';
                      }}
                    >
                      <i className="bi bi-heart-fill" style={{ color: '#dc3545', fontSize: '0.9rem' }}></i>
                    </button>
                  </div>

                  {/* Product Info */}
                  <div className="p-3 text-center d-flex flex-column">
                    <p className="fw-bold mb-1" style={{
                      color: '#2D402E',
                      fontSize: '0.9rem'
                    }}>
                      Rs. {product.price}
                    </p>
                    <h6 className="fw-bold mb-2" style={{
                      color: '#2D402E',
                      fontSize: '0.85rem',
                      fontFamily: 'Playfair Display, serif',
                      minHeight: '2.5rem'
                    }}>
                      {product.pname}
                    </h6>
                    
                    {/* Action Buttons */}
                    <div className="d-flex gap-2 mt-auto">
                      <button 
                        className="btn flex-grow-1 py-2"
                        onClick={() => addtoCart(product)}
                        style={{
                          backgroundColor: '#2D402E',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '0.7rem',
                          fontWeight: '600',
                          letterSpacing: '1px',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#5C4033'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#2D402E'}
                      >
                        <i className="bi bi-cart me-1"></i> Add to Cart
                      </button>
                      <button 
                        className="btn py-2 px-3"
                        onClick={() => removeFromWishlist(product.id)}
                        style={{
                          backgroundColor: 'white',
                          color: '#dc3545',
                          border: '1px solid #dc3545',
                          borderRadius: '8px',
                          fontSize: '0.7rem',
                          fontWeight: '600',
                          letterSpacing: '1px',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#dc3545';
                          e.target.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'white';
                          e.target.style.color = '#dc3545';
                        }}
                      >
                        <i className="bi bi-trash3 me-1"></i> Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ToastContainer />
    </>
  )
}

export default Wishlist;