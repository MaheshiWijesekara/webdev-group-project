import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../AuthContext"; 

// --- 1. IMPORT TOASTIFY ---
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Shop() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [availability, setAvailability] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isSecondImage, setIsSecondImage] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log("Error fetching products:", err));
  }, []);

  const getBySubcategory = (list, name) => list.filter((p) => p.subcategory === name);

  let filteredProducts = [...products];
  if (category !== "all") filteredProducts = filteredProducts.filter((p) => p.category === category);
  if (availability !== "all") filteredProducts = filteredProducts.filter((p) => p.availability === availability);
  if (sortBy !== "default") filteredProducts = filteredProducts.filter((p) => p.tag === sortBy);

  const skinSections = [
    { title: "Cleansers", key: "Cleanser" },
    { title: "Toners", key: "Toner" },
    { title: "Serums", key: "Serum" },
    { title: "Moisturizers", key: "Moisturizer" },
    { title: "SunScreen", key: "SunScreen" },
    { title: "Face Masks", key: "Face Mask" },
  ];
  const lipSections = [{ title: "Lip Balms", key: "Lip Balm" }, { title: "Lip Masks", key: "Lip Mask" }];
  const bodySections = [{ title: "Body Lotions", key: "Body Lotion" }, { title: "Body Washes", key: "Body Wash" }];
  const hairSections = [{ title: "Shampoos", key: "Shampoo" }, { title: "Conditioners", key: "Conditioner" }];
  const fragranceSections = [{ title: "Eau de Parfum", key: "EDP" }, { title: "Body Sprays", key: "Body Spray" }];

  // --- 2. FIXED ADD TO WISHLIST LOGIC ---
  const addToWishlist = (product) => {
    try {
      const existing = JSON.parse(localStorage.getItem("wishlist")) || [];
      if (!existing.some((p) => p.id === product.id)) {
        const updated = [...existing, product];
        localStorage.setItem("wishlist", JSON.stringify(updated));
        window.dispatchEvent(new Event("wishlistUpdated"));
        
        // Pretty Toast Notification
        toast.success(`${product.pname} added to wishlist!`);
      } else {
        toast.info(`${product.pname} is already in your wishlist.`);
      }
    } catch (err) {
      console.error("Wishlist Error:", err);
    }
  };

  // --- 3. UPDATED ADD TO CART LOGIC (REPLACED ALERT WITH TOAST) ---
  const addToCart = async (product) => {
    if (user) {
      try {
        await axios.post('http://localhost:5000/api/cart/add', {
          userId: user.id,
          productId: product.id,
          quantity: quantity
        });
        window.dispatchEvent(new Event("cartUpdated"));
        toast.success(`${product.pname} saved to your account!`); // PRETTY POPUP
      } catch (err) {
        toast.error("Failed to save to database cart.");
      }
    } else {
      const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingProduct = existingCart.find((item) => item.id === product.id);

      if (existingProduct) {
        existingProduct.quantity += Number(quantity);
      } else {
        existingCart.push({ ...product, quantity: quantity });
      }

      localStorage.setItem("cart", JSON.stringify(existingCart));
      window.dispatchEvent(new Event("cartUpdated"));
      toast.success(`${product.pname} added to guest cart!`); // PRETTY POPUP
    }
  };

  return (
    <>
      <ol className="section-banner py-3 position-relative" style={{ marginTop: "-18px", maxWidth: "100%" }}>
        <li className="position-relative"><Link to="/">Home</Link></li>
        <li className="position-relative active"><span className='ps-5'>Shop</span></li>
      </ol>

      <h1 className="shop-all">Shop All Products</h1>

      <div className="shop-toolbar">
        <div className="control">
          <p className="filter">Filter :</p>
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="all">FILTER BY CATEGORY</option>
            <option value="Skin">Skin Care</option>
            <option value="Lip">Lip Care</option>
            <option value="Body">Body Care</option>
            <option value="Hair">Hair Care</option>
            <option value="Fragrances">Fragrances</option>
          </select>
          <select className="availability" onChange={(e) => setAvailability(e.target.value)}>
            <option value="all">AVAILABILITY</option>
            <option value="In">In Stock</option>
            <option value="Out">Out of Stock</option>
          </select>
        </div>
        <div className="control">
          <p className="sort">Sort By :</p>
          <select onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Default</option>
            <option value="New">Newest</option>
            <option value="Sale">Sale</option>
          </select>
        </div>
      </div>

      {/* Grid rendering for "All" and categories */}
      {category === "all" ? (
        <div className="product-grid">
          {filteredProducts.map((p) => (
            <div className="product-card" key={p.id}>
              <img src={p.image} alt={p.pname} onMouseOver={(e) => (e.target.src = p.secondImage)} onMouseOut={(e) => (e.target.src = p.image)} />
              <p className="fw-bold">{p.pname}</p>
              <p>RS.{p.price}</p>
              <button onClick={() => { setSelectedProduct(p); setIsSecondImage(false); setQuantity(1); }}>View Details</button>
            </div>
          ))}
        </div>
      ) : (
        /* This handles Skin, Lip, Body etc using the sections defined above */
        [...skinSections, ...lipSections, ...bodySections, ...hairSections, ...fragranceSections]
  .filter(sec => 
    category === "all" || 
    (category === "Skin" && skinSections.some(s => s.key === sec.key)) ||
    (category === "Lip" && lipSections.some(s => s.key === sec.key)) ||
    (category === "Body" && bodySections.some(s => s.key === sec.key)) ||
    (category === "Hair" && hairSections.some(s => s.key === sec.key)) ||
    (category === "Fragrances" && fragranceSections.some(s => s.key === sec.key))
  )
  .map(section => (
      <div key={section.key}>
          {getBySubcategory(filteredProducts, section.key).length > 0 && (
              <>
                  <h3 className="section-title mt-4">{section.title}</h3>
                  <div className="product-grid">
                      {getBySubcategory(filteredProducts, section.key).map(p => (
                          <div key={p.id} className="product-card">
                              <img 
                                src={p.image} 
                                alt={p.pname} 
                                onMouseOver={(e) => (e.target.src = p.secondImage)} 
                                onMouseOut={(e) => (e.target.src = p.image)}
                              />
                              <p className="fw-bold mt-2 mb-1">{p.pname}</p>
                              
                              {/* ADD THIS LINE BELOW TO SHOW THE PRICE */}
                              <p className="text-muted">RS.{p.price}</p> 
                              
                              <button onClick={() => { setSelectedProduct(p); setQuantity(1); }}>
                                  View Details
                              </button>
                          </div>
                      ))}
                  </div>
              </>
          )}
      </div>
  ))
)}

      {/* --- POPUP MODAL SECTION --- */}
      {selectedProduct && (
        <div className="popup-overlay">
          <div className="popup-box">
            <button className="close-btn" onClick={() => setSelectedProduct(null)}>❌</button>
            <div className="image-wrapper">
              <button className="prev-btn" onClick={() => setIsSecondImage(false)}>←</button>
              <img src={isSecondImage ? selectedProduct.secondImage : selectedProduct.image} alt={selectedProduct.pname} />
              <button className="next-btn" onClick={() => setIsSecondImage(true)}>→</button>
            </div>

            <h2>{selectedProduct.pname}</h2>
            <p>{selectedProduct.pdescription}</p>
            <h3>RS.{selectedProduct.price}</h3>

            <div className="quantity-box">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>

            {/* ATTACHED FUNCTIONS TO POPUP BUTTONS */}
            <button className="cart-btn" onClick={() => addToCart(selectedProduct)}>Add To Cart</button>
            <br /><br />
            <button className="cart-btn" onClick={() => addToWishlist(selectedProduct)}>Add To Wishlist</button>
          </div>
        </div>
      )}

      {/* --- 4. ADD TOAST CONTAINER TO BOTTOM --- */}
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default Shop;