import React from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function QuickView({
  selectedProduct,
  setSelectedProduct,
  quantity,
  setQuantity,
  addToCart,
}) {
  const navigate = useNavigate();

  if (!selectedProduct) return null;

  return (
    <div
      className="popup-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) setSelectedProduct(null);
      }}
    >
      <div className="popup-box">
        <button
          className="close-btn"
          onClick={() => setSelectedProduct(null)}
        >
          ✕
        </button>

        <div className="row g-0">
          {/* LEFT */}
          <div className="col-md-6">
            <div className="popup-image-wrapper">
              <Swiper
                className="quickview-swiper"
                modules={[Navigation, Pagination]}
                navigation
                pagination={{ clickable: true }}
              >
                <SwiperSlide>
                  <img src={selectedProduct.image} alt="" />
                </SwiperSlide>

                {selectedProduct.secondImage && (
                  <SwiperSlide>
                    <img src={selectedProduct.secondImage} alt="" />
                  </SwiperSlide>
                )}
              </Swiper>
            </div>
          </div>

          {/* RIGHT */}
          <div className="col-md-6">
            <div className="popup-details">

              <span className="popup-category">
                {selectedProduct.category}
              </span>

              <h2 className="popup-title">
                {selectedProduct.pname}
              </h2>

              <p className="popup-price">
                Rs. {selectedProduct.price}
              </p>

              <p className="popup-description">
                {selectedProduct.pdescription}
              </p>

              <div className="popup-actions">

                <div className="popup-quantity">
                  <button
                    onClick={() =>
                      setQuantity((q) => Math.max(1, q - 1))
                    }
                  >
                    −
                  </button>

                  <span>{quantity}</span>

                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    +
                  </button>
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
                onClick={() =>
                  navigate(`/product/${selectedProduct.id}`)
                }
              >
                View Full Details →
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickView;