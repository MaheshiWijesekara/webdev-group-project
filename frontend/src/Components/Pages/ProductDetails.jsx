import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../Nav/Nav";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const fetchData = async () => {
    try {
      const prodRes = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(prodRes.data);
      
      const revRes = await axios.get(`http://localhost:5000/api/reviews/${id}`);
      setReviews(revRes.data);

      // Check if product is in wishlist
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      setIsInWishlist(wishlist.some(item => item.id === parseInt(id)));
    } catch (err) {
      console.error("Error loading product details:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // --- ADD TO WISHLIST ---
  const toggleWishlist = () => {
    try {
      const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
      if (isInWishlist) {
        // Remove from wishlist
        const updated = wishlist.filter(item => item.id !== product.id);
        localStorage.setItem("wishlist", JSON.stringify(updated));
        setIsInWishlist(false);
        window.dispatchEvent(new Event("wishlistUpdated"));
        toast.info(`${product.pname} removed from wishlist`);
      } else {
        // Add to wishlist
        wishlist.push(product);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
        setIsInWishlist(true);
        window.dispatchEvent(new Event("wishlistUpdated"));
        toast.success(`${product.pname} added to wishlist!`);
      }
    } catch (err) {
      console.error("Wishlist Error:", err);
    }
  };

  // --- ADD TO CART ---
  const addToCart = async () => {
    if (user) {
      await axios.post('http://localhost:5000/api/cart/add', { 
        userId: user.id, 
        productId: id, 
        quantity: quantity 
      });
      window.dispatchEvent(new Event("cartUpdated"));
      toast.success("Added to your cart!");
    } else {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const existing = cart.find(item => item.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({ ...product, quantity: quantity });
      }
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
      toast.success("Added to your cart!");
    }
  };

  // --- REVIEWS ---
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Please login to leave a review");

    try {
      await axios.post('http://localhost:5000/api/reviews', {
        userId: user.id,
        productId: id,
        comment: newComment,
        rating: newRating
      });
      setNewComment("");
      fetchData();
      toast.success("Thank you for your feedback!");
    } catch (err) {
      toast.error("Failed to post review");
    }
  };

  const deleteReview = async (revId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      await axios.delete(`http://localhost:5000/api/reviews/${revId}`);
      fetchData();
      toast.info("Review deleted");
    }
  };

  if (!product) return (
    <div className="text-center py-5 mt-5">
      <div className="spinner-border" role="status" style={{ color: '#B4975A' }}>
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 text-muted">Loading product details...</p>
    </div>
  );

  const images = [product.image, product.secondImage].filter(Boolean);

  return (
    <>
      <Navbar />
      
      {/* Breadcrumbs */}
      <Breadcrumbs customTitle={product.pname} />

      {/* Product Details */}
      <div className="container py-4">
        <div className="row g-5">
          
          {/* LEFT: Product Images */}
          <div className="col-lg-6">
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
              border: '1px solid rgba(45,64,46,0.06)'
            }}>
              {/* Main Image */}
              <div className="position-relative" style={{ height: '450px', backgroundColor: '#f8f9fa' }}>
                <img 
                  src={images[activeImage] || product.image} 
                  className="w-100 h-100" 
                  style={{ objectFit: 'cover' }}
                  alt={product.pname} 
                />
                {/* Wishlist Button on Image */}
                <button
                  onClick={toggleWishlist}
                  className="position-absolute border-0 bg-white rounded-circle shadow-sm"
                  style={{
                    top: '15px',
                    right: '15px',
                    width: '45px',
                    height: '45px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    zIndex: 5
                  }}
                  onMouseEnter={(e) => {
                    if (!isInWishlist) {
                      e.target.style.backgroundColor = '#f5f5f5';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isInWishlist) {
                      e.target.style.backgroundColor = 'white';
                    }
                  }}
                >
                  <i 
                    className={`bi ${isInWishlist ? 'bi-heart-fill' : 'bi-heart'}`} 
                    style={{ 
                      color: isInWishlist ? '#dc3545' : '#666',
                      fontSize: '1.2rem',
                      transition: 'all 0.3s ease'
                    }}
                  ></i>
                </button>
                
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
                    borderRadius: '20px',
                    zIndex: 5
                  }}>
                    {product.tag}
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="d-flex gap-2 p-3">
                  {images.map((img, index) => (
                    <div 
                      key={index}
                      onClick={() => setActiveImage(index)}
                      style={{
                        width: '70px',
                        height: '70px',
                        cursor: 'pointer',
                        border: activeImage === index ? '2px solid #B4975A' : '2px solid transparent',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        backgroundColor: '#f8f9fa'
                      }}
                      onMouseEnter={(e) => {
                        if (activeImage !== index) {
                          e.currentTarget.style.borderColor = '#ddd';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeImage !== index) {
                          e.currentTarget.style.borderColor = 'transparent';
                        }
                      }}
                    >
                      <img 
                        src={img} 
                        className="w-100 h-100" 
                        style={{ objectFit: 'cover' }} 
                        alt={`${product.pname} view ${index + 1}`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="col-lg-6">
            <div style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '30px',
              boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
              border: '1px solid rgba(45,64,46,0.06)'
            }}>
              {/* Category */}
              <span className="d-inline-block mb-2" style={{
                color: '#B4975A',
                fontSize: '0.7rem',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                fontWeight: '600'
              }}>
                {product.category || 'SKIN RITUAL'}
              </span>
              
              {/* Title */}
              <h1 className="fw-bold mb-2" style={{
                fontFamily: 'Playfair Display, serif',
                color: '#2D402E',
                fontSize: '2rem',
                lineHeight: '1.3'
              }}>
                {product.pname}
              </h1>
              
              {/* Price */}
              <h2 className="mb-3" style={{
                color: '#2D402E',
                fontSize: '1.8rem',
                fontWeight: '700'
              }}>
                Rs. {product.price}
              </h2>
              
              {/* Description */}
              <p className="text-muted mb-4" style={{
                lineHeight: '1.8',
                fontSize: '0.95rem',
                maxHeight: '150px',
                overflowY: 'auto',
                paddingRight: '5px'
              }}>
                {product.pdescription || 'A luxurious skincare product designed to nourish and revitalize your skin.'}
              </p>
              
              {/* Quantity & Add to Cart */}
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="d-flex align-items-center" style={{
                  border: '1px solid #eee',
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}>
                  <button 
                    className="border-0 bg-transparent px-3 py-2"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
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
                    {quantity}
                  </span>
                  <button 
                    className="border-0 bg-transparent px-3 py-2"
                    onClick={() => setQuantity(q => q + 1)}
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
                
                <button 
                  className="btn flex-grow-1 py-3 fw-bold"
                  onClick={addToCart}
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
                  <i className="bi bi-cart me-2"></i> ADD TO CART
                </button>
              </div>
              
              {/* Wishlist & Back to Shop */}
              <div className="d-flex justify-content-between align-items-center">
                <button 
                  onClick={toggleWishlist}
                  className="border-0 bg-transparent"
                  style={{
                    color: isInWishlist ? '#dc3545' : '#666',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    padding: '5px 0'
                  }}
                  onMouseEnter={(e) => {
                    if (!isInWishlist) {
                      e.target.style.color = '#B4975A';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isInWishlist) {
                      e.target.style.color = '#666';
                    }
                  }}
                >
                  <i className={`bi ${isInWishlist ? 'bi-heart-fill' : 'bi-heart'} me-2`}></i>
                  {isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
                </button>
                
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
                  ← Back to Shop
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* --- REVIEWS SECTION --- */}
        <div className="mt-5">
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '30px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
            border: '1px solid rgba(45,64,46,0.06)'
          }}>
            <h2 className="fw-bold mb-4" style={{
              fontFamily: 'Playfair Display, serif',
              color: '#2D402E'
            }}>
              Customer Reviews
            </h2>
            
            <div className="row g-4">
              {/* Review List */}
              <div className="col-md-7">
                {reviews.length === 0 ? (
                  <div className="text-center py-4" style={{
                    backgroundColor: '#F9F7F2',
                    borderRadius: '8px'
                  }}>
                    <i className="bi bi-chat-dots" style={{ fontSize: '2rem', color: '#B4975A', opacity: 0.5 }}></i>
                    <p className="text-muted mt-2 mb-0">No reviews yet for this product. Be the first to share your experience!</p>
                  </div>
                ) : (
                  reviews.map((r, index) => (
                    <div 
                      key={r.id} 
                      className="mb-3 p-3"
                      style={{
                        backgroundColor: '#F9F7F2',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f0ede8'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#F9F7F2'}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h6 className="fw-bold m-0" style={{ color: '#2D402E' }}>
                            {r.user_name}
                          </h6>
                          <div style={{ color: '#B4975A', fontSize: '0.9rem' }}>
                            {"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}
                          </div>
                        </div>
                        <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                          {new Date(r.review_date).toLocaleDateString()}
                        </small>
                      </div>
                      <p className="mb-0" style={{ color: '#666', lineHeight: '1.6', fontSize: '0.95rem' }}>
                        {r.comment}
                      </p>
                      
                      {user && user.id === r.user_id && (
                        <button 
                          onClick={() => deleteReview(r.id)} 
                          className="border-0 bg-transparent text-danger mt-2"
                          style={{
                            fontSize: '0.75rem',
                            textDecoration: 'underline',
                            cursor: 'pointer',
                            padding: '0'
                          }}
                        >
                          Delete my review
                        </button>
                      )}
                    </div>
                  ))
                )}
              </div>

              {/* Review Form */}
              <div className="col-md-5">
                {user ? (
                  <div style={{
                    backgroundColor: '#F9F7F2',
                    borderRadius: '8px',
                    padding: '20px'
                  }}>
                    <h5 className="fw-bold mb-3" style={{ color: '#2D402E' }}>
                      Write a Review
                    </h5>
                    <form onSubmit={handleReviewSubmit}>
                      <div className="mb-3">
                        <label className="form-label small fw-bold" style={{ color: '#666' }}>
                          Rating
                        </label>
                        <select 
                          className="form-select" 
                          value={newRating} 
                          onChange={(e) => setNewRating(Number(e.target.value))}
                          style={{
                            border: '1px solid #eee',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            backgroundColor: 'white'
                          }}
                        >
                          <option value="5">5 Stars - Excellent</option>
                          <option value="4">4 Stars - Very Good</option>
                          <option value="3">3 Stars - Good</option>
                          <option value="2">2 Stars - Fair</option>
                          <option value="1">1 Star - Poor</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label small fw-bold" style={{ color: '#666' }}>
                          Comment
                        </label>
                        <textarea 
                          className="form-control" 
                          rows="4" 
                          placeholder="Describe your experience with this product..." 
                          value={newComment} 
                          onChange={(e) => setNewComment(e.target.value)} 
                          required
                          style={{
                            border: '1px solid #eee',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            backgroundColor: 'white',
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
                      <button 
                        type="submit" 
                        className="btn w-100 py-2 fw-bold"
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
                        POST REVIEW
                      </button>
                    </form>
                  </div>
                ) : (
                  <div className="text-center py-4" style={{
                    backgroundColor: '#F9F7F2',
                    borderRadius: '8px'
                  }}>
                    <i className="bi bi-box-arrow-in-right" style={{ fontSize: '2rem', color: '#B4975A', opacity: 0.5 }}></i>
                    <p className="mt-2 mb-3">Log in to share your experience with this product.</p>
                    <button 
                      className="btn px-4 py-2"
                      data-bs-toggle="modal" 
                      data-bs-target="#authModal"
                      style={{
                        backgroundColor: 'white',
                        color: '#2D402E',
                        border: '1px solid #2D402E',
                        borderRadius: '8px',
                        fontSize: '0.85rem',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = '#2D402E';
                        e.target.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'white';
                        e.target.style.color = '#2D402E';
                      }}
                    >
                      <i className="bi bi-box-arrow-in-right me-2"></i> SIGN IN
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" />
    </>
  );
}

export default ProductDetails;