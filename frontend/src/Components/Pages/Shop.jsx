import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../AuthContext"; 

// --- 1. IMPORT TOASTIFY ---
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Shop() {
  const navigate = useNavigate(); // <--- ADD THIS LINE HERE
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [availability, setAvailability] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isSecondImage, setIsSecondImage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  // --- UPDATED FETCH LOGIC (Includes all filters) ---
  useEffect(() => {
    fetch(`http://localhost:5000/api/products?page=${currentPage}&search=${searchTerm}&category=${category}&availability=${availability}&sortBy=${sortBy}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.products) {
            setProducts(data.products); 
            setTotalPages(data.totalPages);
        }
      })
      .catch((err) => console.log("Fetch Error:", err));
  }, [currentPage, searchTerm, category, availability, sortBy]); // Re-fetch when ANY filter changes

  const getBySubcategory = (list, name) => list.filter((p) => p.subcategory === name);

  // Since the Backend is now doing the filtering, we use 'products' directly
  let filteredProducts = Array.isArray(products) ? [...products] : [];

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

  // --- FIXED ADD TO WISHLIST LOGIC ---
  const addToWishlist = (product) => {
    try {
      const existing = JSON.parse(localStorage.getItem("wishlist")) || [];
      if (!existing.some((p) => p.id === product.id)) {
        const updated = [...existing, product];
        localStorage.setItem("wishlist", JSON.stringify(updated));
        window.dispatchEvent(new Event("wishlistUpdated"));
        toast.success(`${product.pname} added to wishlist!`);
      } else {
        toast.info(`${product.pname} is already in your wishlist.`);
      }
    } catch (err) {
      console.error("Wishlist Error:", err);
    }
  };

  // --- UPDATED ADD TO CART LOGIC ---
  const addToCart = async (product) => {
    if (user) {
      try {
        await axios.post('http://localhost:5000/api/cart/add', {
          userId: user.id,
          productId: product.id,
          quantity: quantity
        });
        window.dispatchEvent(new Event("cartUpdated"));
        toast.success(`${product.pname} saved to your account!`);
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
      toast.success(`${product.pname} added to guest cart!`);
    }
  };

  return (
    <>
      <ol className="section-banner py-3 position-relative" style={{ marginTop: "-18px", maxWidth: "100%" }}>
        <li className="position-relative"><Link to="/">Home</Link></li>
        <li className="position-relative active"><span className='ps-5 text-dark'>Shop</span></li>
      </ol>

      <h1 className="shop-all">Shop All Products</h1>

      {/* Toolbar */}
      <div className="shop-toolbar">
        <div className="control">
          <p className="filter">Filter :</p>
          <select value={category} onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}>
            <option value="all">FILTER BY CATEGORY</option>
            <option value="Skin">Skin Care</option>
            <option value="Lip">Lip Care</option>
            <option value="Body">Body Care</option>
            <option value="Hair">Hair Care</option>
            <option value="Fragrances">Fragrances</option>
          </select>
          <select className="availability" value={availability} onChange={(e) => { setAvailability(e.target.value); setCurrentPage(1); }}>
            <option value="all">AVAILABILITY</option>
            <option value="In">In Stock</option>
            <option value="Out">Out of Stock</option>
          </select>
        </div>
        <div className="control">
          <p className="sort">Sort By :</p>
          <select value={sortBy} onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}>
            <option value="default">Default</option>
            <option value="New">Newest</option>
            <option value="Sale">Sale</option>
          </select>
        </div>
      </div>

      {/* Search Box */}
      <div className="container mt-4">
        <div className="search-box position-relative" style={{ maxWidth: '400px', margin: '0 auto 30px' }}>
            <input 
                type="text" 
                className="form-control py-3 px-4 rounded-pill border-0 shadow-sm"
                placeholder="Search for botanical beauty..."
                style={{ backgroundColor: '#fff', paddingRight: '50px' }}
                value={searchTerm}
                onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1); 
                }}
            />
            <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-4 text-muted"></i>
        </div>
      </div>

      {/* --- PRODUCT GRID RENDERING --- */}
      <div className="container">
        {category === "all" ? (
            <div className="product-grid">
            {filteredProducts.map((p) => (
                <div className="product-card" key={p.id}>
                <img src={p.image} alt={p.pname} onMouseOver={(e) => (e.target.src = p.secondImage)} onMouseOut={(e) => (e.target.src = p.image)} />
                <p className="fw-bold mt-2 mb-1">{p.pname}</p>
                <p className="text-muted">RS.{p.price}</p>
                <button onClick={() => navigate(`/product/${p.id}`)}>
  View Details
</button>
                </div>
            ))}
            </div>
        ) : (
            /* Subcategory sections (Skin, Lip, etc.) */
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
                                        <img src={p.image} alt={p.pname} onMouseOver={(e) => (e.target.src = p.secondImage)} onMouseOut={(e) => (e.target.src = p.image)} />
                                        <p className="fw-bold mt-2 mb-1">{p.pname}</p>
                                        <p className="text-muted">RS.{p.price}</p> 
                                        <button onClick={() => navigate(`/product/${p.id}`)}>
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
      </div>

      {/* No Results Message */}
      {filteredProducts.length === 0 && (
          <div className="text-center py-5">
              <h4 className="text-muted">No products match your search or filters.</h4>
              <button className="btn btn-link text-dark" onClick={() => {setSearchTerm(""); setCategory("all");}}>Clear All</button>
          </div>
      )}

      {/* --- PAGINATION BUTTONS --- */}
      {totalPages > 1 && (
        <div className="d-flex justify-content-center gap-2 my-5">
            <button className="btn btn-outline-dark px-4" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
                <i className="bi bi-chevron-left"></i>
            </button>
            {[...Array(totalPages)].map((_, index) => (
                <button key={index + 1} className={`btn px-4 ${currentPage === index + 1 ? 'btn-dark' : 'btn-outline-dark'}`} onClick={() => setCurrentPage(index + 1)}>
                    {index + 1}
                </button>
            ))}
            <button className="btn btn-outline-dark px-4" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
                <i className="bi bi-chevron-right"></i>
            </button>
        </div>
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
            <h3 className="fw-bold">RS.{selectedProduct.price}</h3>
            <div className="quantity-box">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
            <button className="cart-btn mb-3" onClick={() => addToCart(selectedProduct)}>Add To Cart</button>
            <button className="cart-btn bg-secondary" onClick={() => addToWishlist(selectedProduct)}>Add To Wishlist</button>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default Shop;