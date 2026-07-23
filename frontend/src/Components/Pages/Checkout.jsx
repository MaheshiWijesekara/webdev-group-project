import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import Navbar from "../Nav/Nav";

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

  // Auto-fill email if user is logged in
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
    if (!cardName || cardNumber.length < 12 || !expiry || !cvv) {
      toast.error("Please check your payment details");
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    if (cartItems.length === 0) return toast.error("Your cart is empty!");

    setIsProcessing(true); // Disable button to prevent double-spending

    try {
      // 1. Save order to backend
      await axios.post('http://localhost:5000/api/orders', {
        userId: user ? user.id : null,
        email: formData.email,
        total: finalTotal,
        items: cartItems // Sending items too for better order history
      });

      // 2. Clear Cart
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
      <div className="container my-5 pt-5">
        <div className="row g-4 mt-2">
          {/* LEFT COLUMN: FORMS */}
          <div className="col-lg-7">
            <nav className="mb-4 small">
                <Link to="/Cart" className="text-decoration-none text-muted">Cart</Link>
                <span className="mx-2 text-muted">/</span>
                <span className="fw-bold">Information</span>
            </nav>

            <section className="mb-5">
              <h5 className="fw-bold mb-3">Contact Information</h5>
              <input
                type="email"
                name="email"
                className="form-control py-3"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <div className="form-check mt-3">
                <input className="form-check-input" type="checkbox" id="newsCheck" />
                <label className="form-check-label text-muted small" htmlFor="newsCheck">
                  Email me with news and offers
                </label>
              </div>
            </section>

            <section className="mb-5">
              <h5 className="fw-bold mb-3">Delivery Method</h5>
              <div className="btn-group w-100 mb-4 rounded-3 overflow-hidden border">
                <input type="radio" className="btn-check" name="del" id="ship" checked={deliveryOption === "ship"} onChange={() => setDeliveryOption("ship")} />
                <label className={`btn py-3 border-0 ${deliveryOption === 'ship' ? 'btn-dark' : 'btn-light'}`} htmlFor="ship">
                  <i className="bi bi-truck me-2"></i> Ship to address
                </label>

                <input type="radio" className="btn-check" name="del" id="pickup" checked={deliveryOption === "pickup"} onChange={() => setDeliveryOption("pickup")} />
                <label className={`btn py-3 border-0 ${deliveryOption === 'pickup' ? 'btn-dark' : 'btn-light'}`} htmlFor="pickup">
                  <i className="bi bi-shop me-2"></i> Pickup in store
                </label>
              </div>

              {deliveryOption === "ship" && (
                <div className="row g-3">
                  <div className="col-md-6">
                    <input type="text" name="firstName" className="form-control py-2" placeholder="First Name" value={formData.firstName} onChange={handleInputChange} />
                  </div>
                  <div className="col-md-6">
                    <input type="text" name="lastName" className="form-control py-2" placeholder="Last Name *" value={formData.lastName} onChange={handleInputChange} required />
                  </div>
                  <div className="col-12">
                    <input type="text" name="address" className="form-control py-2" placeholder="Address *" value={formData.address} onChange={handleInputChange} required />
                  </div>
                  <div className="col-md-6">
                    <input type="text" name="city" className="form-control py-2" placeholder="City *" value={formData.city} onChange={handleInputChange} required />
                  </div>
                  <div className="col-md-6">
                    <input type="text" name="postalCode" className="form-control py-2" placeholder="Postal Code" value={formData.postalCode} onChange={handleInputChange} />
                  </div>
                </div>
              )}
            </section>

            <section className="mb-4">
              <h5 className="fw-bold mb-3">Payment</h5>
              <div className="card border-0 bg-light rounded-4 overflow-hidden">
                <div className="p-4">
                  <input type="text" name="cardName" className="form-control mb-3" placeholder="Name on card *" value={formData.cardName} onChange={handleInputChange} required />
                  <input type="text" name="cardNumber" className="form-control mb-3" placeholder="Card number *" value={formData.cardNumber} onChange={handleInputChange} required />
                  <div className="row">
                    <div className="col-6">
                      <input type="text" name="expiry" className="form-control" placeholder="MM / YY *" value={formData.expiry} onChange={handleInputChange} required />
                    </div>
                    <div className="col-6">
                      <input type="text" name="cvv" className="form-control" placeholder="CVV *" value={formData.cvv} onChange={handleInputChange} required />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <button 
              className="btn btn-dark w-100 py-3 fw-bold fs-5 mt-3 shadow" 
              onClick={handlePlaceOrder}
              disabled={isProcessing}
            >
              {isProcessing ? "Processing..." : `PAY NOW — Rs. ${finalTotal}`}
            </button>
          </div>

          {/* RIGHT COLUMN: SUMMARY */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '100px', backgroundColor: '#fdfdfd' }}>
              <h5 className="fw-bold mb-4">Order Summary ({cartItems.length})</h5>
              
              <div className="cart-items-list mb-4" style={{ maxHeight: '350px', overflowY: 'auto' }}>
                {cartItems.map((item) => (
                  <div key={item.id} className="d-flex align-items-center mb-3">
                    <div className="position-relative">
                      <img src={item.image} className="rounded border bg-white" width="70" height="70" style={{ objectFit: "cover" }} alt="" />
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary" style={{fontSize: '0.7rem'}}>
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0 small fw-bold text-dark">{item.pname || item.name}</h6>
                      <p className="text-muted small mb-0">{item.price}</p>
                    </div>
                    <div className="fw-bold small">
                      Rs. {(parseFloat(item.price.toString().replace("Rs.", "")) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-top pt-3">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Subtotal</span>
                  <span className="fw-bold small">Rs. {totalPrice.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted small">Shipping</span>
                  <span className="small">
                    {deliveryOption === "pickup" ? "Free (Pickup)" : (formData.address ? "Free" : "Calculated at next step")}
                  </span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-muted small">Estimated Tax (10%)</span>
                  <span className="fw-bold small">Rs. {estimatedTax.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mt-3 h3 fw-bold border-top pt-3">
                  <span>Total</span>
                  <span style={{ color: 'var(--primary-green)' }}>Rs. {finalTotal}</span>
                </div>
              </div>

              <Link to='/Cart' className="btn btn-link w-100 mt-4 text-muted text-decoration-none small">
                <i className="bi bi-arrow-left me-2"></i> Return to cart
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
    </>
  );
}

export default Checkout;