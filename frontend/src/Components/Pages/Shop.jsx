import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../AuthContext"; 
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Breadcrumbs from "../Breadcrumbs/Breadcrumbs";

function Shop() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [availability, setAvailability] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // --- FETCH LOGIC ---
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
  }, [currentPage, searchTerm, category, availability, sortBy]);

  let filteredProducts = Array.isArray(products) ? [...products] : [];

  // --- ADD TO WISHLIST LOGIC ---
  const addToWishlist = (product) => {
    try {
      const existing = JSON.parse(localStorage.getItem("wishlist")) || [];
      if (!existing.some((p) => p.id === product.id)) {
        const updated = [...existing, product];
        localStorage.setItem("wishlist", JSON.stringify(updated));
        window.dispatchEvent(new Event("wishlistUpdated"));
        toast.success(`${product.pname} saved to wishlist!`);
      } else {
        toast.info(`${product.pname} is already in your wishlist.`);
      }
    } catch (err) {
      console.error("Wishlist Error:", err);
    }
  };

  // --- ADD TO CART LOGIC ---
  const addToCart = async (product) => {
    if (user) {
      try {
        await axios.post('http://localhost:5000/api/cart/add', {
          userId: user.id,
          productId: product.id,
          quantity: quantity
        });
        window.dispatchEvent(new Event("cartUpdated"));
        toast.success(`${product.pname} saved to account!`);
      } catch (err) {
        toast.error("Error saving to account cart.");
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
    <div style={{ backgroundColor: 'var(--soft-beige)', minHeight: '100vh' }}>
      
      {/* Breadcrumbs */}
      <Breadcrumbs />

      {/* Shop Header - Clean & Simple */}
      <section className="shop-header py-4" style={{
        backgroundColor: 'var(--soft-beige)',
        paddingTop: '30px',
        paddingBottom: '20px'
      }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <span className="d-inline-block mb-2" style={{
                color: '#B4975A',
                fontSize: '0.7rem',
                letterSpacing: '4px',
                textTransform: 'uppercase',
                fontWeight: '600'
              }}>
                Our Collection
              </span>
              <h1 className="display-3 fw-bold mb-2" style={{
                fontFamily: 'Playfair Display, serif',
                color: '#2D402E',
                letterSpacing: '1px'
              }}>
                Shop All <span style={{ color: '#B4975A' }}>Products</span>
              </h1>
              <p className="lead" style={{
                color: '#666',
                maxWidth: '500px',
                margin: '0 auto',
                fontSize: '1rem',
                lineHeight: '1.8'
              }}>
                Discover our curated collection of natural skincare essentials
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search & Filters - FIXED */}
      <div className="container">
        <div className="shop-toolbar py-3" style={{
          borderTop: '1px solid rgba(45,64,46,0.08)',
          borderBottom: '1px solid rgba(45,64,46,0.08)'
        }}>
          
          {/* Search Bar - FIXED */}
          <div className="row justify-content-center mb-3">
            <div className="col-lg-5 col-md-7">
              <div className="position-relative w-100">
                <input 
                  type="text" 
                  className="form-control"
                  placeholder="Search our botanical collection..."
                  style={{
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    padding: '10px 45px 10px 45px',
                    transition: 'all 0.3s ease',
                    backgroundColor: 'white',
                    width: '100%',
                    outline: 'none'
                  }}
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#B4975A';
                    e.target.style.boxShadow = '0 0 0 3px rgba(180,151,90,0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#eee';
                    e.target.style.boxShadow = 'none';
                  }}
                />
                <i 
                  className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3" 
                  style={{ 
                    fontSize: '1rem', 
                    color: '#999',
                    pointerEvents: 'none'
                  }}
                ></i>
                {searchTerm && (
                  <button
                    className="position-absolute top-50 end-0 translate-middle-y me-2 border-0 bg-transparent"
                    onClick={() => setSearchTerm("")}
                    style={{
                      color: '#999',
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      padding: '5px'
                    }}
                  >
                    <i className="bi bi-x-circle"></i>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Filters - In a Row */}
          <div className="d-flex flex-wrap justify-content-center align-items-center gap-2">
            {/* Category Filter */}
            <div className="filter-group" style={{ minWidth: '160px' }}>
              <select 
                className="form-select"
                style={{
                  padding: '8px 30px 8px 15px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: '500',
                  color: '#666',
                  border: '1px solid #eee',
                  backgroundColor: 'white',
                  width: '100%',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  outline: 'none'
                }}
                value={category} 
                onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#B4975A';
                  e.target.style.boxShadow = '0 0 0 3px rgba(180,151,90,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#eee';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="all">ALL CATEGORIES</option>
                <option value="Skin">SKIN CARE</option>
                <option value="Lip">LIP CARE</option>
                <option value="Body">BODY CARE</option>
              </select>
            </div>

            {/* Availability Filter */}
            <div className="filter-group" style={{ minWidth: '150px' }}>
              <select 
                className="form-select"
                style={{
                  padding: '8px 30px 8px 15px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: '500',
                  color: '#666',
                  border: '1px solid #eee',
                  backgroundColor: 'white',
                  width: '100%',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  outline: 'none'
                }}
                value={availability} 
                onChange={(e) => { setAvailability(e.target.value); setCurrentPage(1); }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#B4975A';
                  e.target.style.boxShadow = '0 0 0 3px rgba(180,151,90,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#eee';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="all">AVAILABILITY</option>
                <option value="In">IN STOCK</option>
                <option value="Out">OUT OF STOCK</option>
              </select>
            </div>

            {/* Sort Filter */}
            <div className="filter-group" style={{ minWidth: '160px' }}>
              <select 
                className="form-select"
                style={{
                  padding: '8px 30px 8px 15px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: '500',
                  color: '#666',
                  border: '1px solid #eee',
                  backgroundColor: 'white',
                  width: '100%',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  outline: 'none'
                }}
                value={sortBy} 
                onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#B4975A';
                  e.target.style.boxShadow = '0 0 0 3px rgba(180,151,90,0.1)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#eee';
                  e.target.style.boxShadow = 'none';
                }}
              >
                <option value="default">SORT BY: DEFAULT</option>
                <option value="New">NEWEST</option>
                <option value="Sale">ON SALE</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* --- PRODUCT GRID --- */}
      <div className="container py-4">
        <div className="row g-4">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
                <div key={p.id} className="col-xl-3 col-lg-4 col-6">
                    <div className="product-card" style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                      transition: 'all 0.4s ease',
                      border: '1px solid rgba(45,64,46,0.06)',
                      height: '100%'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.06)';
                    }}>
                        <div className="product-image position-relative overflow-hidden" style={{ height: '280px' }}>
                            <img 
                                src={p.image} 
                                alt={p.pname} 
                                className="w-100 h-100"
                                style={{
                                  objectFit: 'cover',
                                  transition: 'transform 0.6s ease'
                                }}
                                onMouseOver={(e) => {
                                  if (p.secondImage) {
                                    e.target.src = p.secondImage;
                                  }
                                }} 
                                onMouseOut={(e) => {
                                  e.target.src = p.image;
                                }} 
                            />
                            {/* Quick View Button */}
                            <div className="quick-view-overlay d-flex align-items-center justify-content-center" style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: '100%',
                              height: '100%',
                              backgroundColor: 'rgba(45,64,46,0.3)',
                              opacity: 0,
                              transition: 'opacity 0.3s ease',
                              zIndex: 2
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}>
                                <button 
                                  className="btn btn-white rounded-circle shadow-sm" 
                                  onClick={() => { setSelectedProduct(p); setQuantity(1); }}
                                  style={{
                                    width: '50px',
                                    height: '50px',
                                    backgroundColor: 'white',
                                    border: 'none',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transform: 'translateY(20px)',
                                    transition: 'transform 0.4s ease'
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                  }}
                                >
                                    <i className="bi bi-eye" style={{ color: '#2D402E', fontSize: '1.2rem' }}></i>
                                </button>
                            </div>
                        </div>

                        <div className="p-3 text-center d-flex flex-column">
                            <h6 className="fw-bold mb-1" style={{
                              color: '#2D402E',
                              fontSize: '0.85rem',
                              fontFamily: 'Playfair Display, serif',
                              minHeight: '2.5rem'
                            }}>
                                {p.pname}
                            </h6>
                            <p className="text-muted small mb-2" style={{ fontSize: '0.9rem' }}>
                                Rs. {p.price}
                            </p>
                            
                            <button 
                                className="journal-link mt-auto mx-auto text-decoration-none border-0 bg-transparent" 
                                onClick={() => navigate(`/product/${p.id}`)}
                                style={{
                                  color: '#2D402E',
                                  fontSize: '0.7rem',
                                  fontWeight: '600',
                                  letterSpacing: '1px',
                                  borderBottom: '2px solid #B4975A',
                                  paddingBottom: '3px',
                                  transition: 'all 0.3s ease',
                                  cursor: 'pointer'
                                }}
                                onMouseEnter={(e) => {
                                  e.target.style.color = '#B4975A';
                                  e.target.style.borderBottomColor = '#2D402E';
                                }}
                                onMouseLeave={(e) => {
                                  e.target.style.color = '#2D402E';
                                  e.target.style.borderBottomColor = '#B4975A';
                                }}
                            >
                                DISCOVER MORE —
                            </button>
                        </div>
                    </div>
                </div>
            ))
          ) : (
            <div className="text-center py-5 w-100">
                <i className="bi bi-box-seam" style={{ fontSize: '3rem', color: '#B4975A', opacity: 0.5 }}></i>
                <h4 className="mt-3 text-muted" style={{ fontFamily: 'Playfair Display, serif' }}>
                  No products found in this ritual...
                </h4>
                <button 
                  className="btn mt-3" 
                  onClick={() => {setSearchTerm(""); setCategory("all")}}
                  style={{
                    backgroundColor: '#B4975A',
                    color: 'white',
                    border: 'none',
                    padding: '8px 25px',
                    borderRadius: '8px',
                    fontSize: '0.85rem',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2D402E'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#B4975A'}
                >
                  Clear Filters
                </button>
            </div>
          )}
        </div>

        {/* --- PAGINATION --- */}
        {totalPages > 1 && (
            <div className="d-flex justify-content-center gap-2 my-5">
                <button 
                  className="btn px-4 py-2" 
                  disabled={currentPage === 1} 
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  style={{
                    backgroundColor: 'white',
                    color: '#666',
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!e.target.disabled) {
                      e.target.style.backgroundColor = '#2D402E';
                      e.target.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.target.disabled) {
                      e.target.style.backgroundColor = 'white';
                      e.target.style.color = '#666';
                    }
                  }}
                >
                    <i className="bi bi-chevron-left"></i>
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button 
                      key={index + 1} 
                      className={`btn px-4 py-2`}
                      onClick={() => setCurrentPage(index + 1)}
                      style={{
                        backgroundColor: currentPage === index + 1 ? '#2D402E' : 'white',
                        color: currentPage === index + 1 ? 'white' : '#666',
                        border: currentPage === index + 1 ? 'none' : '1px solid #eee',
                        borderRadius: '8px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (currentPage !== index + 1) {
                          e.target.style.backgroundColor = '#f5f5f5';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (currentPage !== index + 1) {
                          e.target.style.backgroundColor = 'white';
                        }
                      }}
                    >
                        {index + 1}
                    </button>
                ))}
                <button 
                  className="btn px-4 py-2" 
                  disabled={currentPage === totalPages} 
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  style={{
                    backgroundColor: 'white',
                    color: '#666',
                    border: '1px solid #eee',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!e.target.disabled) {
                      e.target.style.backgroundColor = '#2D402E';
                      e.target.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!e.target.disabled) {
                      e.target.style.backgroundColor = 'white';
                      e.target.style.color = '#666';
                    }
                  }}
                >
                    <i className="bi bi-chevron-right"></i>
                </button>
            </div>
        )}
      </div>

      {/* --- QUICK VIEW MODAL --- */}
      {selectedProduct && (
        <div className="popup-overlay" onClick={(e) => {
          if (e.target === e.currentTarget) setSelectedProduct(null);
        }}>
          <div className="popup-box shadow-lg">
            <button className="close-btn" onClick={() => setSelectedProduct(null)}>
              <i className="bi bi-x-lg"></i>
            </button>

            <div className="row g-0">
              <div className="col-md-6">
                <div className="popup-image-wrapper">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    navigation
                    pagination={{ clickable: true }}
                    className="quickview-swiper"
                  >
                    <SwiperSlide>
                      <img src={selectedProduct.image} alt="Main" className="w-100 h-100 object-fit-cover" />
                    </SwiperSlide>
                    {selectedProduct.secondImage && (
                      <SwiperSlide>
                        <img src={selectedProduct.secondImage} alt="Secondary" className="w-100 h-100 object-fit-cover" />
                      </SwiperSlide>
                    )}
                  </Swiper>
                </div>
              </div>

              <div className="col-md-6">
                <div className="popup-details d-flex flex-column justify-content-center">
                  <span className="popup-category">
                    {selectedProduct.category || 'SKIN RITUAL'}
                  </span>
                  
                  <h2 className="popup-title">{selectedProduct.pname}</h2>
                  
                  <p className="popup-price">Rs. {selectedProduct.price}</p>
                  
                  <p className="popup-description">
                    {selectedProduct.pdescription || 'A luxurious skincare product designed to nourish and revitalize your skin.'}
                  </p>

                  <div className="popup-actions">
                    <div className="popup-quantity">
                      <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                      <span>{quantity}</span>
                      <button onClick={() => setQuantity(q => q + 1)}>+</button>
                    </div>
                    
                    <button 
                      className="popup-add-to-cart" 
                      onClick={() => addToCart(selectedProduct)}
                    >
                      ADD TO CART
                    </button>
                  </div>

                  <button 
                    className="popup-view-details" 
                    onClick={() => navigate(`/product/${selectedProduct.id}`)}
                  >
                    View Full Details →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
    </div>
  );
}

export default Shop;