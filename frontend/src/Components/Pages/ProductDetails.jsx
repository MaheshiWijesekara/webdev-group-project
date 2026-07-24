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

  const fetchData = async () => {
    try {
      const prodRes = await axios.get(`http://localhost:5000/api/products/${id}`);
      setProduct(prodRes.data);
      
      const revRes = await axios.get(`http://localhost:5000/api/reviews/${id}`);
      setReviews(revRes.data);
    } catch (err) {
      console.error("Error loading product details:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

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
      <div className="spinner-border text-success" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="mt-3 text-muted">Loading product details...</p>
    </div>
  );

  const images = [product.image, product.secondImage].filter(Boolean);

  return (
    <>
      <Navbar />
      <Breadcrumbs customTitle={product.pname} />
      <div className="container py-5 mt-5">
        

        <div className="row g-5">
          {/* LEFT: Product Images */}
          <div className="col-lg-6">
            <div className="position-relative">
              {/* Main Image */}
              <div className="product-main-image mb-3" style={{ 
                height: '500px', 
                overflow: 'hidden',
                backgroundColor: '#f8f9fa'
              }}>
                <img 
                  src={images[activeImage] || product.image} 
                  className="w-100 h-100 object-fit-cover" 
                  alt={product.pname} 
                />
              </div>
              
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="d-flex gap-2">
                  {images.map((img, index) => (
                    <div 
                      key={index}
                      className={`thumbnail-wrapper ${activeImage === index ? 'active' : ''}`}
                      style={{
                        width: '80px',
                        height: '80px',
                        cursor: 'pointer',
                        border: activeImage === index ? '2px solid #B4975A' : '2px solid transparent',
                        overflow: 'hidden',
                        transition: 'all 0.3s ease'
                      }}
                      onClick={() => setActiveImage(index)}
                    >
                      <img 
                        src={img} 
                        className="w-100 h-100 object-fit-cover" 
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
            <div className="product-info">
              {/* Category */}
              <span className="text-uppercase small fw-bold mb-2 d-block" style={{ 
                color: '#B4975A', 
                letterSpacing: '3px',
                fontSize: '0.75rem'
              }}>
                {product.category || 'SKIN RITUAL'}
              </span>
              
              {/* Title */}
              <h1 className="display-5 fw-bold mb-3" style={{ 
                fontFamily: 'Playfair Display, serif',
                color: '#2D402E'
              }}>
                {product.pname}
              </h1>
              
              {/* Price */}
              <h2 className="mb-4" style={{ 
                color: '#2D402E',
                fontSize: '2rem',
                fontWeight: '700'
              }}>
                Rs. {product.price}
              </h2>
              
              {/* Description */}
              <p className="text-muted mb-4" style={{ 
                lineHeight: '1.8',
                fontSize: '0.95rem'
              }}>
                {product.pdescription || 'A luxurious skincare product designed to nourish and revitalize your skin.'}
              </p>
              
              {/* Quantity & Add to Cart */}
              <div className="d-flex align-items-center gap-3 mb-4">
                <div className="quantity-selector d-flex align-items-center border">
                  <button 
                    className="btn-quantity"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    style={{
                      width: '45px',
                      height: '45px',
                      border: 'none',
                      background: 'transparent',
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#f5f5f5'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                  >
                    −
                  </button>
                  <span style={{ 
                    width: '50px', 
                    textAlign: 'center', 
                    fontWeight: '600',
                    fontSize: '1.1rem'
                  }}>
                    {quantity}
                  </span>
                  <button 
                    className="btn-quantity"
                    onClick={() => setQuantity(q => q + 1)}
                    style={{
                      width: '45px',
                      height: '45px',
                      border: 'none',
                      background: 'transparent',
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#f5f5f5'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                  >
                    +
                  </button>
                </div>
                
                <button 
                  className="btn btn-dark flex-grow-1 py-3 fw-bold"
                  onClick={addToCart}
                  style={{
                    borderRadius: '0',
                    letterSpacing: '2px',
                    backgroundColor: '#2D402E',
                    border: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#5C4033'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#2D402E'}
                >
                  ADD TO CART
                </button>
              </div>
              
              {/* Back to Shop */}
              <Link to="/Shop" className="text-decoration-none d-inline-block" style={{ 
                color: '#B4975A',
                fontSize: '0.9rem',
                fontWeight: '500',
                letterSpacing: '1px',
                borderBottom: '2px solid #B4975A',
                paddingBottom: '2px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.color = '#2D402E'}
              onMouseLeave={(e) => e.target.style.color = '#B4975A'}>
                ← Back to Shop
              </Link>
            </div>
          </div>
        </div>

        {/* --- REVIEWS SECTION --- */}
        <div className="mt-5 pt-5 border-top">
          <h2 className="fw-bold mb-5" style={{ 
            fontFamily: 'Playfair Display, serif',
            color: '#2D402E'
          }}>
            Customer Reviews
          </h2>
          
          <div className="row g-5">
            {/* Review List */}
            <div className="col-md-7">
              {reviews.length === 0 ? (
                <div className="text-center py-4" style={{ backgroundColor: '#f8f9fa' }}>
                  <p className="text-muted fst-italic mb-0">No reviews yet for this product. Be the first to share your experience!</p>
                </div>
              ) : (
                reviews.map(r => (
                  <div key={r.id} className="mb-4 p-4" style={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #eee',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.boxShadow = '0 5px 20px rgba(0,0,0,0.05)'}
                  onMouseLeave={(e) => e.target.style.boxShadow = 'none'}>
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <div>
                        <h6 className="fw-bold m-0">{r.user_name}</h6>
                        <div className="text-warning" style={{ fontSize: '0.9rem' }}>
                          {"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}
                        </div>
                      </div>
                      <small className="text-muted">{new Date(r.review_date).toLocaleDateString()}</small>
                    </div>
                    <p className="mb-0" style={{ color: '#444', lineHeight: '1.6' }}>{r.comment}</p>
                    
                    {user && user.id === r.user_id && (
                      <button 
                        onClick={() => deleteReview(r.id)} 
                        className="btn btn-sm text-danger mt-3 p-0 border-0 bg-transparent"
                        style={{ textDecoration: 'underline', fontSize: '0.8rem' }}
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
                <div className="p-4" style={{ backgroundColor: '#EDF1EE' }}>
                  <h5 className="fw-bold mb-3" style={{ color: '#2D402E' }}>Write a Review</h5>
                  <form onSubmit={handleReviewSubmit}>
                    <div className="mb-3">
                      <label className="form-label small fw-bold">Rating</label>
                      <select 
                        className="form-select border-0" 
                        value={newRating} 
                        onChange={(e) => setNewRating(Number(e.target.value))}
                        style={{ borderRadius: '0' }}
                      >
                        <option value="5">5 Stars - Excellent</option>
                        <option value="4">4 Stars - Very Good</option>
                        <option value="3">3 Stars - Good</option>
                        <option value="2">2 Stars - Fair</option>
                        <option value="1">1 Star - Poor</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-bold">Comment</label>
                      <textarea 
                        className="form-control border-0" 
                        rows="4" 
                        placeholder="Describe your experience with this product..." 
                        value={newComment} 
                        onChange={(e) => setNewComment(e.target.value)} 
                        required
                        style={{ borderRadius: '0' }}
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="btn btn-dark w-100 py-2 fw-bold"
                      style={{
                        borderRadius: '0',
                        letterSpacing: '2px',
                        backgroundColor: '#2D402E'
                      }}
                    >
                      POST REVIEW
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center p-5" style={{ 
                  backgroundColor: '#f8f9fa',
                  border: '1px solid #eee'
                }}>
                  <p className="mb-3">Log in to share your experience with this product.</p>
                  <button 
                    className="btn btn-outline-dark px-4"
                    data-bs-toggle="modal" 
                    data-bs-target="#authModal"
                    style={{ borderRadius: '0' }}
                  >
                    SIGN IN
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default ProductDetails;