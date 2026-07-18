import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../Nav/Nav";

// data
import products from "./../../Products.json";

function ProductDetails() {
  const { id } = useParams();
  const product = products.find((p) => p.id == id);
  const [mainImage, setMainImage] = useState("");
  const [images, setImages] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const colors = ["#000090", "#7B3F00", "#9BBEC8"];
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    if (product) {
      setMainImage(product.image);
      setImages([product.image, product.secondImage].filter(Boolean));
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  return (
    <>
      <Navbar />

      <div className="container-fluid border-bottom mb-4">
        <div className="container py-3 text-muted small">
          <Link to="/" className="text-decoration-none text-muted">
            Home
          </Link>{" "}
          —<span className="mx-2">Beauty & Cosmetics</span> —
          <span className="mx-2 text-dark">{product.name}</span>
        </div>
      </div>

      <div className="container py-4">
        <div className="row">
          <div className="col-lg-6">
            <div className="d-flex flex-column-reverse flex-md-row">
              <div className="d-flex flex-column thumbnail-images me-3">
                {images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt=""
                    onClick={() => setMainImage(img)}
                    className={`img-thumbnail mb-2 ${mainImage === img ? "border-dark" : "border-light"}`}
                    style={{
                      width: 65,
                      height: 85,
                      objectFit: "cover",
                      cursor: "pointer",
                    }}
                  />
                ))}
              </div>
              <div className="main-image flex-grow-1">
                <img
                  src={mainImage}
                  className="img-fluid w-100"
                  alt={product.name}
                  style={{ maxHeight: "600px", objectFit: "contain" }}
                />
              </div>
            </div>
          </div>

          <div className="col-lg-6 ps-lg-5">
            <h5 className="fw-light mb-1 text-secondary">{product.price}</h5>
            <h1 className="fw-bold mb-4" style={{ fontSize: "2.5rem" }}>
              {product.name}
            </h1>

            <p className="mb-2 fw-semibold">
              Color:{" "}
              <span className="text-muted fw-normal">
                {product.color || "Black"}
              </span>
            </p>
            <div className="d-flex gap-2 mb-4">
              {colors.map((color, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: color,
                    width: 25,
                    height: 25,
                    borderRadius: "50%",
                    border: "1px solid #ccc",
                    cursor: "pointer",
                  }}
                ></div>
              ))}
            </div>

            <p className="fw-semibold mb-2" style={{ fontSize: "0.9rem" }}>
              Quantity
            </p>

            <div className="d-flex gap-3 mb-2">
              {/* Quantity Selector - Light grey background, no black buttons */}
              <div
                className="d-flex align-items-center bg-light border"
                style={{ width: "140px", height: "50px" }}
              >
                <button
                  className="btn border-0 shadow-none px-3"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={{ background: "transparent", color: "#000" }}
                >
                  {" "}
                  -{" "}
                </button>
                <input
                  type="text"
                  className="form-control border-0 text-center bg-transparent p-0"
                  value={quantity}
                  readOnly
                />
                <button
                  className="btn border-0 shadow-none px-3"
                  onClick={() => setQuantity((q) => q + 1)}
                  style={{ background: "transparent", color: "#000" }}
                >
                  {" "}
                  +{" "}
                </button>
              </div>

              <button
                className="btn btn-outline-dark flex-grow-1 fw-normal"
                style={{
                  height: "50px",
                  borderRadius: "0",
                  borderWidth: "1px",
                }}
              >
                Add to cart
              </button>
            </div>

            <button
              className="btn btn-dark w-100 py-3 mb-4 fw-bold"
              style={{ borderRadius: "0", height: "55px" }}
            >
              Buy it now
            </button>

            {/* Metadata Section */}
            <div
              className="product-meta border-top pt-4 mt-2 text-muted"
              style={{ fontSize: "0.85rem", lineHeight: "2" }}
            >
              <p className="mb-1">
                <strong className="text-dark">Vendor:</strong> Vendor 4
              </p>
              <p className="mb-1">
                <strong className="text-dark">Collections:</strong> Beauty &
                Cosmetics, Bestseller, Featured, New Arrival, Skincare, under
                $40
              </p>
              <p className="mb-0">
                <strong className="text-dark">SKU:</strong> 501
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container my-5">
  {/* Tab Headers */}
  <ul className="nav nav-tabs border-0 mb-4" id="productTab">
    <li className="nav-item">
      <button
        className={`nav-link border-0 fw-bold fs-4 text-capitalize ${activeTab === 'description' ? 'active' : ''}`}
        onClick={() => setActiveTab('description')}
        type="button"
        style={{ background: 'transparent', color: activeTab === 'description' ? '#000' : '#ccc' }}
      >
        Description
      </button>
    </li>
    <li className="nav-item">
      <button
        className={`nav-link border-0 fw-bold fs-4 text-capitalize ${activeTab === 'shipping' ? 'active' : ''}`}
        onClick={() => setActiveTab('shipping')}
        type="button"
        style={{ background: 'transparent', color: activeTab === 'shipping' ? '#000' : '#ccc' }}
      >
        Shipping and Returns
      </button>
    </li>
  </ul>

  {/* Tab Content */}
  <div className="tab-content">
    {/* Description Content */}
    {activeTab === 'description' && (
      <div className="tab-pane fade show active">
        <p><strong>For Normal, Oily, Combination Skin Types</strong></p>
        <p>Complexion-perfecting natural foundation enriched with antioxidant-packed superfruits, vitamins and minerals</p>
        <h5 className="mt-4">Benefits</h5>
        <ul className="Benefits-list p-0">
          <li>Provides long-lasting wear</li>
          <li>Offers natural-looking finish</li>
          <li>Suitable for all skin types</li>
          <li>Enriched with antioxidants</li>
          <li>Available in a wide range of shades</li>
        </ul>
      </div>
    )}

    {/* Shipping Content */}
    {activeTab === 'shipping' && (
      <div className="tab-pane fade show active">
        <p>We aim to process and ship all orders within 1–3 business days, and you’ll receive tracking information once your package has been dispatched. Delivery times may vary depending on your location and courier service. If you are not completely satisfied with your purchase, returns are accepted within 14 days of delivery as long as the item is unused, in its original condition, and includes all original packaging. Refunds are processed after the returned item has been inspected, and the amount will be credited back to your original payment method. Shipping fees are non-refundable unless the item received was damaged or incorrect.
</p>
      </div>
    )}
  </div>
</div>
    </>
  );
}

export default ProductDetails;
