import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../Nav/Nav";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(5);

  // --- FETCH DATA ---
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

  // --- ADD TO CART ---
  const addToCart = async () => {
    if (user) {
      await axios.post('http://localhost:5000/api/cart/add', { userId: user.id, productId: id, quantity: 1 });
      window.dispatchEvent(new Event("cartUpdated"));
      toast.success("Saved to account!");
    } else {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push({ ...product, quantity: 1 });
      localStorage.setItem('cart', JSON.stringify(cart));
      window.dispatchEvent(new Event("cartUpdated"));
      toast.success("Added to guest cart!");
    }
  };

  // --- SUBMIT REVIEW ---
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
      fetchData(); // Refresh list to show new review
      toast.success("Thank you for your feedback!");
    } catch (err) {
      toast.error("Failed to post review");
    }
  };

  // --- DELETE REVIEW ---
  const deleteReview = async (revId) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      await axios.delete(`http://localhost:5000/api/reviews/${revId}`);
      fetchData();
      toast.info("Review deleted");
    }
  };

  if (!product) return <div className="text-center py-5">Loading botanical ingredients...</div>;

  return (
    <>
      <Navbar />
      <div className="container py-5 mt-5">
        <div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <img src={product.image} className="img-fluid rounded-4 shadow-sm" alt={product.pname} />
          </div>
          <div className="col-lg-6">
            <span className="text-uppercase fw-bold small text-muted" style={{letterSpacing: '2px'}}>{product.category}</span>
            <h1 className="display-4 fw-bold mb-3 mt-2">{product.pname}</h1>
            <h3 className="mb-4" style={{color: '#B4975A'}}>RS.{product.price}</h3>
            <p className="lead mb-5 text-muted" style={{ lineHeight: '1.8' }}>{product.pdescription}</p>
            
            <button className="btn btn-dark btn-lg px-5 py-3 w-100" onClick={addToCart}>
              ADD TO CART
            </button>
            <Link to="/Shop" className="btn btn-link text-dark mt-3 d-block text-center">Back to Shop</Link>
          </div>
        </div>

        {/* --- REVIEWS SECTION --- */}
        <div className="mt-5 pt-5 border-top">
          <h2 className="fw-bold mb-5">Customer Reviews</h2>
          
          <div className="row">
            {/* Display List */}
            <div className="col-md-7">
              {reviews.length === 0 ? (
                <p className="text-muted fst-italic">No reviews yet for this product. Be the first to share!</p>
              ) : (
                reviews.map(r => (
                  <div key={r.id} className="mb-4 p-4 rounded-4" style={{backgroundColor: '#fff', border: '1px solid #eee'}}>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="fw-bold m-0">{r.user_name}</h6>
                      <div className="text-warning" style={{fontSize: '0.9rem'}}>
                        {"★".repeat(r.rating)}{"☆".repeat(5-r.rating)}
                      </div>
                    </div>
                    <p className="text-muted small mb-3">{new Date(r.review_date).toLocaleDateString()}</p>
                    <p className="mb-0" style={{color: '#444'}}>{r.comment}</p>
                    
                    {/* Show delete button ONLY to the person who wrote the review */}
                    {user && user.id === r.user_id && (
                      <button onClick={() => deleteReview(r.id)} className="btn btn-sm text-danger mt-3 p-0 text-decoration-underline border-0 bg-transparent">
                        Delete my review
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Submit Form */}
            <div className="col-md-5">
              {user ? (
                <div className="card p-4 border-0 rounded-4" style={{backgroundColor: '#EDF1EE'}}>
                  <h5 className="fw-bold mb-3" style={{color: '#2D402E'}}>Write a Review</h5>
                  <form onSubmit={handleReviewSubmit}>
                    <div className="mb-3">
                      <label className="form-label small fw-bold">Rating</label>
                      <select className="form-select border-0" value={newRating} onChange={(e)=>setNewRating(e.target.value)}>
                        <option value="5">5 Stars - Excellent</option>
                        <option value="4">4 Stars - Very Good</option>
                        <option value="3">3 Stars - Good</option>
                        <option value="2">2 Stars - Fair</option>
                        <option value="1">1 Star - Poor</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label className="form-label small fw-bold">Comment</label>
                      <textarea className="form-control border-0" rows="4" placeholder="Describe your experience with this product..." value={newComment} onChange={(e)=>setNewComment(e.target.value)} required />
                    </div>
                    <button className="btn btn-dark w-100 py-2 fw-bold">POST REVIEW</button>
                  </form>
                </div>
              ) : (
                <div className="alert alert-light border text-center p-5 rounded-4">
                  <p className="mb-3">Log in to share your experience with this product.</p>
                  <button className="btn btn-outline-dark px-4" data-bs-toggle="modal" data-bs-target="#authModal">SIGN IN</button>
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