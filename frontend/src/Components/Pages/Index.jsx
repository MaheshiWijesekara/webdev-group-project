import { Link, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import React, { useState, useEffect } from "react"; 
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import subBanner1 from "./../../assets/banner-1.webp";
import subBanner2 from "./../../assets/banner-2.webp";

import serviceImg1 from "./../../assets/service-icon-1.svg";
import serviceImg2 from "./../../assets/service-icon-2.svg";
import serviceImg3 from "./../../assets/service-icon-3.svg";
import serviceImg4 from "./../../assets/service-icon-4.svg";

import brand1 from "./../../assets/brand-1.png";
import brand2 from "./../../assets/brand-2.png";
import brand3 from "./../../assets/brand-3.png";

import femalebanner from "./../../assets/banner-female.webp";

import discover1 from "./../../assets/discover-1.webp";
import discover2 from "./../../assets/discover-2.webp";

import socialImage1 from "./../../assets/social-image-1.jpg";
import socialImage2 from "./../../assets/social-image-2.jpg";
import socialImage3 from "./../../assets/social-image-3.jpg";
import socialImage4 from "./../../assets/social-image-4.jpg";
import socialImage5 from "./../../assets/social-image-5.jpg";

function Index() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const addToWishlist = (product) => {
    try {
      const existing = JSON.parse(localStorage.getItem("wishlist")) || [];
      if (!existing.some((p) => p.id === product.id)) {
        const updated = [...existing, product];
        localStorage.setItem("wishlist", JSON.stringify(updated));
        window.dispatchEvent(new Event("wishlistUpdated"));
        toast.success(`${product.pname} added to wishlist!`);
      } else {
        toast.info(`${product.pname} is already in wishlist!`);
      }
    } catch (err) {
      console.error("Wishlist Error:", err);
    }
  };

  const addToCart = (product) => {
    try {
      const existing = JSON.parse(localStorage.getItem("cart")) || [];
      const alreadyInCart = existing.some((p) => p.id === product.id);
      if (!alreadyInCart) {
        const updatedProduct = { ...product, quantity: 1 };
        const updatedCart = [...existing, updatedProduct];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("cartUpdated"));
        toast.success(`${product.pname} added to cart!`);
      } else {
        toast.info(`${product.pname} is already in cart!`);
      }
    } catch (err) {
      console.error("Cart Error:", err);
    }
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
        .then(response => response.json())
        .then(data => {
            if (data && data.products) {
                setProducts(data.products); 
            } else {
                setProducts(data);
            }
        })
        .catch(err => console.log("Error fetching data:", err));
  }, []);

  return (
    <>
      {/* Hero Swiper */}
      <div className="hero">
        <Swiper
          slidesPerView={1}
          modules={[Autoplay, EffectFade]}
          effect="fade"
          loop={true}
          autoplay={{ delay: 3000 }}
        >
          <SwiperSlide>
            <div className="hero-wrap hero-wrap1">
              <div className="hero-content text-center text-lg-start">
                <h5>- ESSENTIAL ITEMS -</h5>
                <h1>
                  Beauty Inspired <br /> by Real Life
                </h1>
                <Link to="/Shop" className="btn hero-btn mt-3">
                  Shop Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero-wrap hero-wrap2">
              <div className="hero-content">
                <h5>- NEW COLLECTION -</h5>
                <h1>Get The Perfectly Hydrated Skin</h1>
                <p className="my-3">
                  Made using clean, non-toxic ingredients, our products are
                  designed for everyone
                </p>
                <Link to="/Shop" className="btn hero-btn mt-3">
                  Shop Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="hero-wrap hero-wrap3">
              <div className="hero-content">
                <h5>- GET THE GLOW -</h5>
                <h1>
                  Be your kind <br /> of Beauty
                </h1>
                <p className="my-3">
                  Made using clean, non-toxic ingredients, our products are
                  designed for everyone
                </p>
                <Link to="/Shop" className="btn hero-btn mt-3">
                  Shop Now
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Featured Products Section */}
      <div className="product-container my-5 py-5">
        <div className="container position-relative">
          <div className="section-title mb-5 text-center">
            <span className="d-inline-block mb-2" style={{
              color: '#B4975A',
              fontSize: '0.7rem',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontWeight: '600'
            }}>
              Our Collection
            </span>
            <h2 className="fw-semibold fs-1" style={{ fontFamily: 'Playfair Display, serif', color: '#2D402E' }}>
              Featured Products
            </h2>
            <p className="text-muted" style={{ fontSize: '1.1rem' }}>
              Get the skin you've always wanted
            </p>
          </div>

          <Swiper
            slidesPerView={4}
            spaceBetween={20}
            modules={[Autoplay]}
            autoplay={{ delay: 2000 }}
            breakpoints={{
              1199: { slidesPerView: 3 },
              991: { slidesPerView: 2 },
              0: { slidesPerView: 1 },
            }}
          >
            {Array.isArray(products) && products.filter(
              (p) => Number(p.id) >= 1 && Number(p.id) <= 10,
            ).map((product) => (
              <SwiperSlide key={product.id}>
                <div className="product-item text-center">
                  <div className="product-image overflow-hidden position-relative" style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundColor: '#f8f9fa'
                  }}>
                    <img
                      src={product.image}
                      className="img-fluid"
                      alt={product.pname}
                    />
                    <img
                      src={product.secondImage}
                      className="img-fluid"
                      alt=""
                    />

                    <div className="product-icons d-flex gap-2">
                      <div
                        className="product-icon"
                        onClick={() => addToWishlist(product)}
                      >
                        <i className="bi bi-heart"></i>
                      </div>
                      <div
                        className="product-icon"
                        onClick={() => addToCart(product)}
                      >
                        <i className="bi bi-cart"></i>
                      </div>
                    </div>
                  </div>

                  <Link
                    to={`/product/${product.id}`}
                    className="text-decoration-none text-dark"
                  >
                    <div className="product-content pt-3">
                      <span className="d-block fw-bold" style={{ color: '#2D402E' }}>{product.price}</span>
                      <h3 className="fs-6 mt-1" style={{ fontFamily: 'Playfair Display, serif', color: '#2D402E' }}>{product.pname}</h3>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* Banner Section */}
      <div className="banners py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-6 banner-card overflow-hidden position-relative">
              <img
                src={subBanner1}
                alt="banner"
                className="img-fluid rounded banner-img"
                style={{ borderRadius: '12px' }}
              />
              <div className="banner-content position-absolute">
                <h3>NEW COLLECTION</h3>
                <h1>
                  Intensive Glow C+ <br /> Serum
                </h1>
                <button className="btn banner-btn mt-2">
                  EXPLORE MORE
                </button>
              </div>
            </div>

            <div className="col-lg-6 banner-card overflow-hidden position-relative">
              <img
                src={subBanner2}
                alt="banner"
                className="img-fluid rounded banner-img"
                style={{ borderRadius: '12px' }}
              />
              <div className="banner-content banner-content2 position-absolute">
                <h1>25% off everything</h1>
                <p>
                  Makeup with extended range in <br /> colors for every skin
                  tone
                </p>
                <button className="btn banner-btn mt-2">SHOP NOW</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container my-5 py-5">
        <div className="row text-center g-4">
          <div className="col-lg-3 col-sm-6 mb-4">
            <div style={{
              padding: '20px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <img src={serviceImg1} alt="" className="img-fluid" style={{ marginBottom: '15px' }} />
              <h4 className="mt-3 mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#2D402E' }}>Free Shipping</h4>
              <p className="text-muted fs-6 fw-semibold">
                Free shipping on orders over $130
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 mb-4">
            <div style={{
              padding: '20px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <img src={serviceImg2} alt="" className="img-fluid" style={{ marginBottom: '15px' }} />
              <h4 className="mt-3 mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#2D402E' }}>Easy Returns</h4>
              <p className="text-muted fs-6 fw-semibold">
                Within 30 days for an exchange
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 mb-4">
            <div style={{
              padding: '20px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <img src={serviceImg3} alt="" className="img-fluid" style={{ marginBottom: '15px' }} />
              <h4 className="mt-3 mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#2D402E' }}>24/7 Support</h4>
              <p className="text-muted fs-6 fw-semibold">
                24 hours, 7 days a week
              </p>
            </div>
          </div>
          <div className="col-lg-3 col-sm-6 mb-4">
            <div style={{
              padding: '20px',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              <img src={serviceImg4} alt="" className="img-fluid" style={{ marginBottom: '15px' }} />
              <h4 className="mt-3 mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#2D402E' }}>Flexible Payment</h4>
              <p className="text-muted fs-6 fw-semibold">
                Pay with multiple credit cards
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="text-center my-5 py-4" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <span className="d-inline-block mb-3" style={{
            color: '#B4975A',
            fontSize: '0.7rem',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            Testimonials
          </span>
          <h1 className="mb-5 fw-semibold" style={{ fontFamily: 'Playfair Display, serif', color: '#2D402E' }}>As seen in</h1>
          <div className="row pt-3 justify-content-center g-4">
            <div className="col-md-4 mb-4">
              <div style={{
                padding: '30px',
                backgroundColor: '#F9F7F2',
                borderRadius: '12px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <img src={brand1} alt="" className="img-fluid mb-3" />
                <p className="text-dark fs-5 mt-2 fw-semibold" style={{ fontFamily: 'Playfair Display, serif', color: '#2D402E' }}>
                  "Also the customer service is phenomenal. I would recommend this
                  company to anyone."
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div style={{
                padding: '30px',
                backgroundColor: '#F9F7F2',
                borderRadius: '12px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <img src={brand2} alt="" className="img-fluid mb-3" />
                <p className="text-dark fs-5 mt-2 fw-semibold" style={{ fontFamily: 'Playfair Display, serif', color: '#2D402E' }}>
                  "Great product and service. Very happy with my purchase."
                </p>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div style={{
                padding: '30px',
                backgroundColor: '#F9F7F2',
                borderRadius: '12px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <img src={brand3} alt="" className="img-fluid mb-3" />
                <p className="text-dark fs-5 mt-2 fw-semibold" style={{ fontFamily: 'Playfair Display, serif', color: '#2D402E' }}>
                  "Are you looking for the best beauty products? You've come to
                  the right place."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Favorites */}
      <div className="favourite-beauty py-5 my-5">
        <div className="container">
          <div className="section-title mb-5 favourite-beauty-title text-center">
            <span className="d-inline-block mb-2" style={{
              color: '#B4975A',
              fontSize: '0.7rem',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              fontWeight: '600'
            }}>
              Top Picks
            </span>
            <h2 className="fw-semibold fs-1" style={{ fontFamily: 'Playfair Display, serif', color: '#2D402E' }}>
              Customer Favorites
            </h2>
            <p className="text-muted" style={{ fontSize: '1.1rem' }}>
              Made using clean, non-toxic ingredients, our products are designed for everyone
            </p>
          </div>

          <div className="row g-4">
            <div className="col-lg-5">
              <div className="favourite-beauty-banner mb-lg-0 mb-5 position-relative" style={{
                borderRadius: '12px',
                overflow: 'hidden'
              }}>
                <img src={femalebanner} className="img-fluid" alt="" />
                <div className="favourite-beauty-banner-title">
                  <h3 className="fs-2" style={{ fontFamily: 'Playfair Display, serif' }}>Empower Yourself</h3>
                  <p className="fs-6">Get the skin you deserve</p>
                  <button className="btn" style={{
                    backgroundColor: '#B4975A',
                    color: 'white',
                    border: 'none',
                    padding: '10px 30px',
                    borderRadius: '8px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#2D402E'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = '#B4975A'}>
                    Explore
                  </button>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="row g-3">
                {Array.isArray(products) && products.filter(
                  (p) => p.category === 'Skin'
                ).slice(0, 6).map((product) => (
                  <div key={product.id} className="col-md-4 col-6 mb-3">
                    <div className="product-item text-center h-100" style={{
                      backgroundColor: 'white',
                      borderRadius: '12px',
                      padding: '15px',
                      boxShadow: '0 10px 40px rgba(0,0,0,0.06)',
                      border: '1px solid rgba(45,64,46,0.06)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-5px)';
                      e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.06)';
                    }}>
                      <div className="product-image overflow-hidden position-relative" style={{
                        borderRadius: '8px',
                        overflow: 'hidden',
                        backgroundColor: '#f8f9fa'
                      }}>
                        <img
                          src={product.image}
                          className="img-fluid"
                          alt={product.pname}
                        />
                        <img
                          src={product.secondImage}
                          className="img-fluid"
                          alt=""
                        />

                        <div className="product-icons d-flex gap-2">
                          <div
                            className="product-icon"
                            onClick={() => addToCart(product)}
                          >
                            <i className="bi bi-cart"></i>
                          </div>
                        </div>
                      </div>

                      <Link
                        to={`/product/${product.id}`}
                        className="text-decoration-none text-dark"
                      >
                        <div className="product-content pt-3">
                          <span className="d-block fw-bold" style={{ color: '#2D402E' }}>
                            {product.price}
                          </span>
                          <h3 className="fs-6 mt-1" style={{ fontFamily: 'Playfair Display, serif', color: '#2D402E' }}>{product.pname}</h3>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Discover Section */}
      <div className="discover container py-5">
        <div className="section-title mb-5 favourite-beauty-title text-center">
          <span className="d-inline-block mb-2" style={{
            color: '#B4975A',
            fontSize: '0.7rem',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            Explore More
          </span>
          <h2 className="fw-semibold fs-1" style={{ fontFamily: 'Playfair Display, serif', color: '#2D402E' }}>
            More to Discover
          </h2>
          <p className="text-muted" style={{ fontSize: '1.1rem' }}>
            Our bundles were designed to conveniently package <br /> your tanning essentials while saving you money
          </p>
        </div>
        <div className="row g-4">
          <div className="col-md-6 discover-card text-center">
            <div className="discover-img section-image rounded" style={{ borderRadius: '12px', overflow: 'hidden' }}>
              <img src={discover1} alt="summer collection" className="img-fluid rounded" style={{ borderRadius: '12px' }} />
            </div>
            <div className="discover-info mt-3">
              <div style={{ fontFamily: 'Playfair Display, serif', color: '#2D402E', fontSize: '1.8rem' }}>Summer Collection</div>
              <button className="btn mt-2" style={{
                backgroundColor: '#2D402E',
                color: 'white',
                border: 'none',
                padding: '10px 30px',
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#B4975A'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2D402E'}>
                Shop now <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
          <div className="col-md-6 discover-card text-center">
            <div className="discover-img section-image rounded" style={{ borderRadius: '12px', overflow: 'hidden' }}>
              <img src={discover2} alt="from our blog" className="img-fluid rounded" style={{ borderRadius: '12px' }} />
            </div>
            <div className="discover-info mt-3">
              <div style={{ fontFamily: 'Playfair Display, serif', color: '#2D402E', fontSize: '1.8rem' }}>From Our Blog</div>
              <button className="btn mt-2" style={{
                backgroundColor: '#2D402E',
                color: 'white',
                border: 'none',
                padding: '10px 30px',
                borderRadius: '8px',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#B4975A'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#2D402E'}>
                Read our blog <i className="bi bi-arrow-right ms-2"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Social Section */}
      <div className="social-image-container py-5 px-5 mx-auto">
        <div className="row g-3">
          <div className="col-lg-2 col-md-4 col-6">
            <div className="social-wrapper position-relative overflow-hidden" style={{ borderRadius: '12px' }}>
              <img src={socialImage1} alt="social" className="img-fluid" />
              <i className="bi bi-instagram"></i>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-6">
            <div className="social-wrapper position-relative overflow-hidden" style={{ borderRadius: '12px' }}>
              <img src={socialImage2} alt="social" className="img-fluid" />
              <i className="bi bi-instagram"></i>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-6">
            <div className="social-wrapper position-relative overflow-hidden" style={{ borderRadius: '12px' }}>
              <img src={socialImage3} alt="social" className="img-fluid" />
              <i className="bi bi-instagram"></i>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-6">
            <div className="social-wrapper position-relative overflow-hidden" style={{ borderRadius: '12px' }}>
              <img src={socialImage4} alt="social" className="img-fluid" />
              <i className="bi bi-instagram"></i>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-6">
            <div className="social-wrapper position-relative overflow-hidden" style={{ borderRadius: '12px' }}>
              <img src={socialImage5} alt="social" className="img-fluid" />
              <i className="bi bi-instagram"></i>
            </div>
          </div>
          <div className="col-lg-2 col-md-4 col-6">
            <div className="social-wrapper position-relative overflow-hidden" style={{ borderRadius: '12px' }}>
              <img src={socialImage1} alt="social" className="img-fluid" />
              <i className="bi bi-instagram"></i>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
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

export default Index;