import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../AuthContext"; // Import AuthContext
import Navbar from "../Nav/Nav"; // Import Navbar

function Checkout() {
  // --- 1. AUTH CONTEXT ---
  const { user } = useContext(AuthContext);

  // --- 2. FORM DATA STATE ---
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

  // --- 3. HANDLE INPUT CHANGES ---
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- 4. LOAD CART DATA ---
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  // --- 5. PRICE CALCULATIONS ---
  const totalPrice = cartItems.reduce((acc, item) => {
    // Handling "Rs." or raw numbers safely
    const priceStr = item.price.toString().replace("Rs.", "").replace(",", "");
    const price = parseFloat(priceStr) || 0;
    return acc + price * (item.quantity || 1);
  }, 0);

  const estimatedTax = (totalPrice * 0.1);
  const finalTotal = (totalPrice + estimatedTax).toFixed(2);

  // --- 6. HANDLE PLACE ORDER (With Validation & DB integration) ---
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // VALIDATION: Check for required fields
    const { email, address, city, cardName, cardNumber } = formData;
    
    if (!email || !address || !city || !cardName || !cardNumber) {
        return toast.error("Please fill in all required fields (Email, Address, City, and Payment info)!");
    }

    if (cartItems.length === 0) {
        return toast.error("Your cart is empty! Add products before checking out.");
    }

    try {
        // A. Send Order to Backend MySQL
        await axios.post('http://localhost:5000/api/orders', {
            userId: user ? user.id : null,
            email: formData.email,
            total: finalTotal
        });

        // B. CLEAR CART LOGIC
        localStorage.removeItem('cart'); // Clear the guest cart
        
        if (user) {
            // Clear the database cart if the user is logged in
            await axios.delete(`http://localhost:5000/api/cart/clear/${user.id}`);
        }

        // C. NOTIFY NAVBAR
        window.dispatchEvent(new Event("cartUpdated"));

        toast.success("Order placed successfully! Thank you for shopping with Virelle.");

        // D. REDIRECT HOME
        setTimeout(() => {
            window.location.href = "/"; 
        }, 2500);

    } catch (err) {
        console.error("Checkout Error:", err);
        toast.error("Database connection error. Is your server running?");
    }
  };

  return (
    <>
      <Navbar />
      
      <div className="container my-5 pt-5">
        <div className="row g-4 mt-2">
          <div className="col-lg-7">
            
            {/* Contact Section */}
            <h5 className="fw-bold mb-3">Contact</h5>
            <div className="mb-3">
              <input
                type="text"
                name="email"
                className="form-control py-2"
                placeholder="Email or phone number"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-check mb-4">
              <input className="form-check-input" type="checkbox" id="newsCheck" />
              <label className="form-check-label small" htmlFor="newsCheck">
                Subscribe to our newsletter
              </label>
            </div>

            {/* Delivery Section */}
            <h5 className="fw-bold mb-3">Delivery</h5>
            <div className="mb-3">
              <div className="btn-group w-100" role="group">
                <input
                  type="radio"
                  className="btn-check"
                  name="deliveryOption"
                  id="ship"
                  checked={deliveryOption === "ship"}
                  onChange={() => setDeliveryOption("ship")}
                />
                <label className={`btn py-3 ${deliveryOption === 'ship' ? 'btn-dark' : 'btn-outline-dark'}`} htmlFor="ship">
                  <i className="bi bi-truck me-2"></i> Ship
                </label>

                <input
                  type="radio"
                  className="btn-check"
                  name="deliveryOption"
                  id="pickup"
                  checked={deliveryOption === "pickup"}
                  onChange={() => setDeliveryOption("pickup")}
                />
                <label className={`btn py-3 ${deliveryOption === 'pickup' ? 'btn-dark' : 'btn-outline-dark'}`} htmlFor="pickup">
                  <i className="bi bi-shop me-2"></i> Pickup in store
                </label>
              </div>
            </div>

            {/* Shipping Address Inputs */}
            {deliveryOption === "ship" && (
              <div className="row g-3 mb-3">
                <div className="col-12">
                  <select className="form-select py-2">
                    <option>Vietnam</option>
                    <option>Sri Lanka</option>
                    <option>United States</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <input type="text" name="firstName" className="form-control py-2" placeholder="First name (optional)" value={formData.firstName} onChange={handleInputChange} />
                </div>
                <div className="col-md-6">
                  <input type="text" name="lastName" className="form-control py-2" placeholder="Last name" value={formData.lastName} onChange={handleInputChange} />
                </div>
                <div className="col-12">
                  <input type="text" name="address" className="form-control py-2" placeholder="Address" value={formData.address} onChange={handleInputChange} required />
                </div>
                <div className="col-12">
                  <input type="text" name="apartment" className="form-control py-2" placeholder="Apartment, suite, etc. (optional)" value={formData.apartment} onChange={handleInputChange} />
                </div>
                <div className="col-md-6">
                  <input type="text" name="city" className="form-control py-2" placeholder="City" value={formData.city} onChange={handleInputChange} required />
                </div>
                <div className="col-md-6">
                  <input type="text" name="postalCode" className="form-control py-2" placeholder="Postal code (optional)" value={formData.postalCode} onChange={handleInputChange} />
                </div>
              </div>
            )}

            {/* Pickup Warning */}
            {deliveryOption === "pickup" && (
              <div className="alert alert-danger rounded-3 my-4">
                <i className="bi bi-exclamation-circle-fill me-2"></i>
                <strong>No stores available with your items currently.</strong>
              </div>
            )}

            <div className="form-check mb-5">
              <input type="checkbox" className="form-check-input" id="saveInfo" />
              <label className="form-check-label small" htmlFor="saveInfo">Save this information for next time</label>
            </div>

            {/* Payment Section */}
            <h4 className="fw-bold mb-2">Payment</h4>
            <p className="text-muted small mb-4">All transactions are secure and encrypted.</p>

            <div className="border rounded-4 overflow-hidden bg-light">
              <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-white">
                <span className="fw-bold">Credit Card</span>
                <span className="badge bg-warning text-dark px-2 py-1">VISA / MASTER</span>
              </div>
              <div className="p-4">
                <div className="mb-3">
                  <input type="text" name="cardName" className="form-control" placeholder="Name on card" value={formData.cardName} onChange={handleInputChange} required />
                </div>
                <div className="mb-3">
                  <input type="text" name="cardNumber" className="form-control" placeholder="Card number" value={formData.cardNumber} onChange={handleInputChange} required />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input type="text" name="expiry" className="form-control" placeholder="MM / YY" value={formData.expiry} onChange={handleInputChange} required />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input type="text" name="cvv" className="form-control" placeholder="CVV" value={formData.cvv} onChange={handleInputChange} required />
                  </div>
                </div>
              </div>
            </div>

            <button className="btn btn-dark w-100 mt-4 py-3 fw-bold fs-5" onClick={handlePlaceOrder}>
              Pay now — Rs. {finalTotal}
            </button>
          </div>

          {/* RIGHT SIDE: ORDER SUMMARY */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 p-4 sticky-top" style={{ top: '100px' }}>
              <h5 className="fw-bold mb-4 d-flex align-items-center">
                <i className="bi bi-cart3 me-2 text-info"></i> Order Summary
              </h5>
              
              <div className="cart-items-list mb-4" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {cartItems.map((item) => (
                  <div key={item.id} className="d-flex align-items-center mb-3">
                    <div className="position-relative">
                      <img src={item.image} className="rounded border" width="65" height="65" style={{ objectFit: "cover" }} alt="" />
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary" style={{ fontSize: '0.7rem' }}>
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h6 className="mb-0 small fw-bold">{item.pname || item.name}</h6>
                      <small className="text-muted">{item.price}</small>
                    </div>
                    <div className="fw-bold text-dark small">
                      Rs. {(parseFloat(item.price.toString().replace("Rs.", "")) * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <hr />
              <div className="summary-details">
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Subtotal</span>
                  <span className="fw-semibold">Rs. {totalPrice.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span className="text-muted">Estimated Tax (10%)</span>
                  <span className="fw-semibold">Rs. {estimatedTax.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mt-3 h4 fw-bold">
                  <span>Total</span>
                  <span>Rs. {finalTotal}</span>
                </div>
              </div>

              <Link to='/Cart' className="btn btn-outline-secondary w-100 mt-4 border-0 text-decoration-underline small">
                <i className="bi bi-arrow-left me-2"></i> Back to cart
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default Checkout;