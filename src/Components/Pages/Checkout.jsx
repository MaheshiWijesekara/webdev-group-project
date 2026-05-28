import React, { useState, useEffect } from "react"; // 1. Added missing imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

function Checkout() {
  const [deliveryOption, setDeliveryOption] = useState("ship");

  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);
  }, []);

  const handlePlaceOrder = () => {
    toast.success("Order placed successfully!");
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = parseFloat(item.price.replace("$", "")) || 0;
    return acc + price * (item.quantity || 1);
  }, 0);

  const estimatedTax = (totalPrice * 0.1).toFixed(2);

  return (
    <>
      <div className="container my-5 pt-1">
        <div className="row g-4 mt-5">
          <div className="col-lg-7">
            <h5>Contact</h5>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Email or phone number"
              />
            </div>
            <div className="form-check mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                id="newsCheck"
              />
              <label className="form-check-label" htmlFor="newsCheck">
                Subscribe to our newsletter
              </label>
            </div>
            <h5>Delivery</h5>
            <div>
              <div className="mb-3">
                <div className="btn-group btn-form w-100" role="group">
                  <input
                    type="radio"
                    className="btn-check"
                    name="deliveryOption"
                    id="ship"
                    checked={deliveryOption === "ship"}
                    onChange={() => setDeliveryOption("ship")}
                  />
                  <label className="btn pickup-btn" htmlFor="ship">
                    <i className="fa fa-truck"></i> Ship
                  </label>

                  <input
                    type="radio"
                    className="btn-check"
                    name="deliveryOption"
                    id="pickup"
                    checked={deliveryOption === "pickup"}
                    onChange={() => setDeliveryOption("pickup")}
                  />
                  <label className="btn pickup-btn" htmlFor="pickup">
                    <i className="fa fa-shop"></i> Pickup in store
                  </label>
                </div>
              </div>

              {deliveryOption === "ship" && (
                <div className="row mb-3">
                  <div className="mb-3">
                    <select className="form-select">
                      <option>Vietnam</option>
                      <option>France</option>
                      <option>United States</option>
                    </select>
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First name (optional)"
                    />
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last name (optional)"
                    />
                  </div>
                </div>
              )}

              {deliveryOption === "pickup" && (
                <div className="container my-4">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h6 className="fw-semibold mb-0">Store Location</h6>
                    <a href="#" className="text-decoration-none small">
                      Change location
                    </a>
                  </div>

                  <div
                    className="alert alert-danger d-flex flex-column rounded-3"
                    role="alert"
                    style={{
                      color: "#7b1c1c",
                      backgroundColor: "#fef6f6",
                      border: "1px solid rgba(145, 137, 137, 0.59)",
                    }}
                  >
                    <div className="d-flex align-items-center mb-1">
                      <i className="bi bi-exclamation-circle-fill me-2"></i>
                      <strong>No stores available with your items</strong>
                    </div>
                    <div>
                      <a
                        href="#"
                        className="text-decoration-none"
                        style={{ color: "#7b1c1c" }}
                      >
                        Ship to address
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Address"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Apartment, suite, etc. (optional)"
              />
            </div>
            <div className="row mb-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Postal code (optional)"
                />
              </div>
            </div>
            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input"
                id="saveInfo"
              />
              <label className="form-check-label" htmlFor="saveInfo">
                Save this information for next time
              </label>
            </div>

            <h6>Shipping method</h6>
            <div
              className="rounded p-3 d-flex justify-content-between align-items-center"
              style={{
                border: "1px solid darkblue",
                backgroundColor: "#f0f5ff",
              }}
            >
              <span>Standard</span>
              <span className="text-success">FREE</span>
            </div>

            <div className="container my-5">
              <h4 className="fw-semibold">Payment</h4>
              <p className="text-muted mb-3">
                All transactions are secure and encrypted.
              </p>

              <div className="border-rounded">
                <div className="bg-light border-bottom d-flex justify-content-between align-items-center p-3">
                  <span className="fw-semibold">Credit Card</span>
                  <div
                    className="bg-warning text-white px-2 py-1 fw-bold rounded"
                    style={{ fontSize: "0.9rem" }}
                  >
                    B
                  </div>
                </div>
                <div className="p-3 bg-light">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name on card"
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Card number"
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="CVV"
                      />
                    </div>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="billingCheck"
                      checked
                    />
                    <label className="form-check-label" for="billingCheck">
                      Use shipping address as billing address
                    </label>
                  </div>
                </div>
              </div>

              <button className="btn w-100 mt-4 py-2 fw-semibold">
                Pay now
              </button>

              <div className="mt-5 border-top pt-3">
                <a
                  href="#"
                  className="text-decoration-none small text-decoration-underline"
                >
                  Privacy Policy
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-bold mb-3">
                <i className="bi bi-cart me-2 text-info"></i> Order Summary
              </h5>
              {cartItems.length === 0 ? (
                <p className="text-muted">Your cart is empty.</p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex align-items-center mb-3 border-bottom pb-2"
                  >
                    <img
                      src={item.image}
                      className="rounded"
                      width="60"
                      height="60"
                      style={{ objectFit: "cover", marginRight: "10px" }}
                      alt=""
                    />
                    <div className="flex-grow-1">
                      <h6 className="mb">{item.name}</h6>
                      <small className="text-muted">Qty: {item.quantity}</small>
                    </div>
                    <div className="fw-semibold">
                      $
                      {parseFloat(
                        item.price.replace("$", "") * item.quantity,
                      ).toFixed(2)}
                    </div>
                  </div>
                ))
              )}
              <hr />
              <div className="d-flex justify-content-between small mb-1">
                    <span>Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between small mb-1">
                    <span>Shipping</span>
                    <span>Enter your address</span>
              </div>
              <div className="d-flex justify-content-between small mb-1">
                    <span>Estimated tax</span>
                    <span>${estimatedTax}</span>
              </div>
              <div className="d-flex justify-content-between small mb-1">
                    <span>Total</span>
                    <span>${(totalPrice + parseFloat(estimatedTax)).toFixed(2)}</span>
              </div>
              <button className="btn w-100 mt-3" onClick={handlePlaceOrder}>
                <i className="bi bi-credit-card me-2"></i> Place Order
              </button>

              <Link to='/cart' className="btn mt-2 text-decoration-none">
                <i className="bi bi-arrow-left me-2"></i> Back to cart</Link>

            </div>
          </div>
        </div>
      </div>

    <ToastContainer />

    </>
  );
}

export default Checkout;
