import React, { useState, useEffect, useContext } from "react"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import axios from 'axios'; 
import { AuthContext } from "../../AuthContext"; 
import Navbar from "../Nav/Nav";

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
                // Ensure we handle the database column 'pname'
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
  }, [user]); // This ensures the cart re-loads when the user logs in/out

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
    toast.error("Item removed");
  };

  const totalPrice = cartItems.reduce((acc, item) => acc + (getPrice(item.price) * item.quantity), 0);

  return (
    <>
      <Navbar />
      <div className="container py-5 mt-5">
        <h2 className="text-center fw-bold mb-5 pt-3">Your Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <div className="text-center py-5"><p>Empty cart!</p><Link to="/Shop" className="btn btn-dark">Shop Now</Link></div>
        ) : (
          <div className="row">
            <div className="col-lg-8">
              {cartItems.map((item) => (
                <div key={item.id} className="card mb-3 p-3 border-0 shadow-sm rounded-4">
                  <div className="row align-items-center">
                    <div className="col-3"><img src={item.image} className="img-fluid rounded" alt="" /></div>
                    <div className="col-9">
                        <div className="d-flex justify-content-between">
                            <div>
                                <h5 className="fw-bold mb-1">{item.name}</h5>
                                <p className="text-muted small mb-0">Rs. {item.price}</p>
                            </div>
                            <div className="d-flex align-items-center gap-2">
                                <button className="btn btn-light btn-sm border" onClick={() => updateQuantity(item.id, "decrease")}>-</button>
                                <span className="fw-bold px-2">{item.quantity}</span>
                                <button className="btn btn-light btn-sm border" onClick={() => updateQuantity(item.id, "increase")}>+</button>
                                <button className="btn text-danger ms-3" onClick={() => removeItem(item.id)}><i className="bi bi-trash"></i></button>
                            </div>
                        </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-lg-4">
              <div className="card p-4 border-0 shadow-sm rounded-4 bg-light">
                <h4 className="fw-bold mb-4">Summary</h4>
                <div className="d-flex justify-content-between mb-3"><span>Subtotal</span><span className="fw-bold">Rs. {totalPrice.toFixed(2)}</span></div>
                <Link to="/checkout" className="btn btn-dark w-100 py-3 fw-bold rounded-pill">CHECKOUT</Link>
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