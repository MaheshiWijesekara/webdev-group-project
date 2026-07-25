import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Breadcrumbs from "../Features/Breadcrumbs";
import QuickView from "../Features/QuickView";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Shop() {
  const navigate = useNavigate();
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

  // --- FETCH LOGIC ---
  useEffect(() => {
    fetch(`http://localhost:5000/api/products?page=1&limit=1000&search=${searchTerm}&category=${category}&availability=${availability}&sortBy=${sortBy}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.products) {
          setProducts(data.products);
          setTotalPages(data.totalPages);
          console.log(data.products);
        }
      })
      .catch((err) => console.log("Fetch Error:", err));
  }, [currentPage, searchTerm, category, availability, sortBy]);


  const categorySections = {
    Skin: [
      { title: "Cleansers", key: "Cleanser" },
      { title: "Toners", key: "Toner" },
      { title: "Serums", key: "Serum" },
      { title: "Moisturizers", key: "Moisturizer" },
      { title: "Face Masks", key: "Face Mask" },
    ],

    Hair: [
      { title: "Hair Oil", key: "Hair Oil" },
      { title: "Shampoo", key: "Shampoo" },
      { title: "Conditioner", key: "Conditioner" },
    ],

    Lip: [
      { title: "Lip Balm", key: "Lip Balm" },
      { title: "Lip Scrub", key: "Lip Scrub" },
    ],

    Body: [
      { title: "Body Lotion", key: "Body Lotion" },
      { title: "Body Scrub", key: "Body Scrub" },
    ]
  };

  let filteredProducts = Array.isArray(products) ? [...products] : [];

  if (category !== "all") {
    const order = categorySections[category].map(section => section.key);

    filteredProducts.sort((a, b) => {
      return order.indexOf(a.subcategory) - order.indexOf(b.subcategory);
    });
  }

  const productsPerPage = 8;

  const startIndex = (currentPage - 1) * productsPerPage;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + productsPerPage
  );

  const calculatedTotalPages = Math.ceil(
    filteredProducts.length / productsPerPage
  );


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
      <Breadcrumbs />
      <div className="container pt-1 mt-1">
        <h1 className="shop-all pt-4" style={{ fontFamily: 'Playfair Display', color: 'var(--primary-green)', textAlign: 'center' }}>Shop All Products</h1>

        {/* Search Bar - Aesthetic Upgrade */}
        <div className="d-flex justify-content-center mb-5">
          <div className="position-relative w-100" style={{ maxWidth: '500px' }}>
            <input
              type="text"
              className="form-control py-3 px-4 rounded-0 border-0 shadow-sm"
              placeholder="Search our botanical collection..."
              style={{ backgroundColor: '#fff', fontSize: '0.9rem' }}
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />
            <i className="bi bi-search position-absolute top-50 end-0 translate-middle-y me-3 text-muted"></i>
          </div>
        </div>

        {/* Toolbar - Aesthetic Upgrade */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-5 gap-3 border-bottom pb-4">
          <div className="d-flex gap-3">
            <select className="form-select border-0 bg-white rounded-0 shadow-sm small" value={category} onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}>
              <option value="all">ALL CATEGORIES</option>
              <option value="Skin">SKIN CARE</option>
              <option value="Lip">LIP CARE</option>
              <option value="Body">BODY CARE</option>
              <option value="Hair">HAIR CARE</option>
            </select>
            <select className="form-select border-0 bg-white rounded-0 shadow-sm small" value={availability} onChange={(e) => { setAvailability(e.target.value); setCurrentPage(1); }}>
              <option value="all">AVAILABILITY</option>
              <option value="In">IN STOCK</option>
              <option value="Out">OUT OF STOCK</option>
            </select>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="small text-muted fw-bold">SORT BY:</span>
            <select className="form-select border-0 bg-transparent fw-bold small" style={{ width: 'auto' }} value={sortBy} onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}>
              <option value="default">DEFAULT</option>
              <option value="New">NEWEST</option>
              <option value="Sale">ON SALE</option>
            </select>
          </div>
        </div>




        {/* --- PRODUCT GRID --- */}



        <div className="row g-4">

          {paginatedProducts.length > 0 ? (

            paginatedProducts.map((p, index) => (

              <React.Fragment key={p.id}>

                {/* Show subcategory title only when it changes */}
                {category !== "all" &&
                  (index === 0 || paginatedProducts[index - 1].subcategory !== p.subcategory) && (

                    <h2 className="section-title w-100 mt-4">
                      {p.subcategory}
                    </h2>

                  )}


                <div className="col-xl-3 col-lg-4 col-6">

                  <div className="product-item border-0 bg-white shadow-sm h-100 p-0 overflow-hidden">

                    <div
                      className="product-image position-relative overflow-hidden"
                      style={{ height: "320px" }}
                    >

                      <img
                        src={p.image}
                        alt={p.pname}
                        className="w-100 h-100 object-fit-cover"
                        onMouseOver={(e) =>
                          (e.target.src = p.secondImage || p.image)
                        }
                        onMouseOut={(e) =>
                          (e.target.src = p.image)
                        }
                      />


                      {/* Quick View */}
                      <div className="quick-view-overlay d-flex align-items-center justify-content-center">

                        <button
                          className="btn btn-white rounded-pill shadow-sm p-3"
                          onClick={() => {
                            setSelectedProduct(p);
                            setQuantity(1);
                          }}
                        >

                          <i
                            className="bi bi-eye fs-4"
                            style={{ color: "var(--primary-green)" }}
                          ></i>

                        </button>

                      </div>

                    </div>


                    <div className="p-4 text-center">

                      <h6
                        className="fw-bold mb-1"
                        style={{
                          color: "var(--primary-green)",
                          fontFamily: "Montserrat"
                        }}
                      >
                        {p.pname}
                      </h6>


                      <p className="text-muted small">
                        Rs. {p.price}
                      </p>


                    </div>


                  </div>

                </div>


              </React.Fragment>

            ))

          ) : (

            <div className="text-center py-5 w-100">
              <h4 className="text-muted">
                No products found...
              </h4>
            </div>

          )}

        </div>

        {/* --- PAGINATION --- */}
        {calculatedTotalPages > 1 && (
          <div className="d-flex justify-content-center gap-2 my-5">
            <button className="btn btn-outline-dark rounded-0 px-4" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>
              <i className="bi bi-chevron-left"></i>
            </button>
            {[...Array(calculatedTotalPages)].map((_, index) => (
              <button key={index + 1} className={`btn rounded-0 px-4 ${currentPage === index + 1 ? 'btn-dark' : 'btn-outline-dark'}`} style={{ backgroundColor: currentPage === index + 1 ? 'var(--primary-green)' : 'transparent' }} onClick={() => setCurrentPage(index + 1)}>
                {index + 1}
              </button>
            ))}
            <button className="btn btn-outline-dark rounded-0 px-4" disabled={currentPage === calculatedTotalPages} onClick={() => setCurrentPage(prev => prev + 1)}>
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        )}
      </div>

      <QuickView
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        quantity={quantity}
        setQuantity={setQuantity}
        addToCart={addToCart}
      />


      <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
    </div>
  );
}

export default Shop;