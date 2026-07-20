import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Nav/Nav"; // 1. Added Import
import { Link } from "react-router-dom"; // Added for navigation

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
      

    <div className="container my-5 mt-5 pt-5">
        <h2 className="text-center fw-bold mb-4">Your Wishlist</h2>

        {wishlist.length === 0 ? (
            <div className="text-center">
                <p className="lead text-muted">Your wishlist is empty.</p>
                <Link to="/Shop" className="btn">
                <i className="ri-shopping-bag-line me-2"></i>Browse Products</Link>
            </div>
        ):(
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4">
                {wishlist.map(product => (
                    <div className="col" key={product.id}>
                        <div className="card h-100 shadow-sm border-0">
                            <div className="position-relative overflow-hidden" style={{height:'250px', backgroundColor:'#f8f9fa'}}>
                                <img src={product.image} className="card-img-top h-100 object-fit-cover" alt={product.pname} />
                                {product.tag && (
                                    <span className={`position-absolute top-0 end-0 badge m-2 ${product.tag === "New" ? "bg-danger" : "bg-success"}`}>
                                        {product.tag}
                                    </span>
                                )}
                            </div>
                            <div className="card-body d-flex flex-column text-center">
                                <p className="card-text fs-5 fw-semibold text-dark">{product.price}</p>
                                <h5 className="card-title">{product.pname}</h5>
                                <div className="mt-auto d-flex justify-content-between gap-2">
                                    <button className="btn w-100" onClick={() => addtoCart(product)}>
                                        <i className="bi bi-cart me-2"></i>Add to Cart
                                    </button>
                                    <button className="btn w-100" onClick={() => removeFromWishlist(product.id)}>
                                        <i className="bi bi-trash me-2"></i> Remove
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
