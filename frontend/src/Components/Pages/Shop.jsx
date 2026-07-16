import products from "src/Products.json";
import { useState } from "react";
import { Link } from "react-router-dom";

function Shop() {
  
  const getBySubcategory = (list, name) =>
    list.filter((p) => p.subcategory === name);

  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [availability, setAvailability] = useState("all");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isSecondImage, setIsSecondImage] = useState(false);

  let filteredProducts = [...products];

  // 1. category filter
  if (category !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => p.category === category
    );
  }

  // 2. availability filter
  if (availability !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) => p.availability === availability
    );
  }

  // 3. sort/tag filter
  if (sortBy !== "default") {
    filteredProducts = filteredProducts.filter(
      (p) => p.tag === sortBy
    );
  }


  const skinSections = [
    { title: "Cleansers", key: "Cleanser" },
    { title: "Toners", key: "Toner" },
    { title: "Serums", key: "Serum" },
    { title: "Moisturizers", key: "Moisturizer" },
    { title: "SunScreen", key: "SunScreen" },
    { title: "Face Masks", key: "Face Mask" },
  ];

  const lipSections = [
    { title: "Lip Balms and Moisturizers", key: "Lip Balm" },
    { title: "Lip Masks", key: "Lip Mask" },
    { title: "Lip Oils", key: "Lip Oil" },
  ];

  const bodySections = [
    { title: "Body Lotions", key: "Body Lotion" },
    { title: "Body Oils", key: "Body Oil" },
    { title: "Body Washes", key: "Body Wash" },
    { title: "Exfoliating Scrubs", key: "Exfoliating Scrub" },
    { title: "Hand Creams", key: "Hand Cream" },
    { title: "Foot Creams", key: "Foot Cream" },

  ];

  const hairSections = [
    { title: "Shampoos", key: "Shampoo" },
    { title: "Conditioners", key: "Conditioner" },
    { title: "Hair Oils", key: "Hair Oil" },
    { title: "Hair Masks", key: "Hair Mask" },
  ];

  const fragranceSections = [
    { title: "Eau de Parfum", key: "EDP" },
    { title: "Body Sprays", key: "Body Spray" },
    { title: "Deodorants", key: "Deodorant" },
  ];




  const addToCart = (product) => {
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = existingCart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += Number(quantity);
    } else {
      existingCart.push({
        ...product,
        quantity: quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    alert("Added to cart!");
  };

  return (
    <>

    <ol className="section-banner py-3 position-relative" style={{ marginTop: "-18px" , maxWidth: "100%"}}>
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
            <option value="Accessories">Accessories</option>
          </select>

          <select className="availability" onChange={(e) => setAvailability(e.target.value)}>
            <option>AVAILABILITY </option>
            <option value="In">In Stock</option>
            <option value="Out">Out of Stock</option>
          </select>
        </div>

        <div className="control">
          <p className="sort">Sort By :</p>
          <select onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Default</option>
            <option value="Best">Best Selling</option>
            <option value="Rele">Most relevant</option>
            <option value="New">Newest</option>
            <option value="Sale">Sale</option>
          </select>
        </div>

      </div>

      {/*all products section*/}
      {category === "all" ? (
        <>
          <div className="product-grid">
            {filteredProducts.map((p) => (
              <div className="product-card" key={p.id}>
                <img src={p.image}
                  alt={p.name}
                  onMouseOver={(e) => (e.target.src = p.secondImage)}
                  onMouseOut={(e) => (e.target.src = p.image)} />
                <p>{p.name}</p>
                <p>{p.price}</p>
                <p>
                  {"⭐".repeat(p.rating)}
                </p>
                <button onClick={() => {
                  setSelectedProduct(p);
                  setIsSecondImage(false);
                }} >
                  View Details
                </button>
              </div>
            ))}
          </div>


        </>

        /* Skin care section*/
      ) : category === "Skin" ? (
        <>
          {skinSections.map((section) => (
            <div key={section.key}>
              <br />
              <h3 className="section-title">{section.title}</h3>

              <div className="product-grid">
                {getBySubcategory(filteredProducts, section.key).map((p) => (
                  <div key={p.id} className="product-card">
                    <img
                      src={p.image}
                      alt={p.name}
                      onMouseOver={(e) => (e.target.src = p.secondImage)}
                      onMouseOut={(e) => (e.target.src = p.image)}
                    />

                    <p>{p.name}</p>
                    <p>{p.price}</p>
                    <p>{"⭐".repeat(p.rating)}</p>

                    <button onClick={() => setSelectedProduct(p)}>
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}


        </>

        // Lip care section
      ) : category === "Lip" ? (
        <>
          {lipSections.map((section) => (
            <div key={section.key}>
              <br />
              <h3 className="section-title">{section.title}</h3>

              <div className="product-grid">
                {getBySubcategory(filteredProducts, section.key).map((p) => (
                  <div key={p.id} className="product-card">
                    <img
                      src={p.image}
                      alt={p.name}
                      onMouseOver={(e) => (e.target.src = p.secondImage)}
                      onMouseOut={(e) => (e.target.src = p.image)}
                    />

                    <p>{p.name}</p>
                    <p>{p.price}</p>
                    <p>{"⭐".repeat(p.rating)}</p>

                    <button onClick={() => setSelectedProduct(p)}>
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>

      ) : category === "Body" ? (
        <>
          {bodySections.map((section) => (
            <div key={section.key}>
              <br />
              <h3 className="section-title">{section.title}</h3>

              <div className="product-grid">
                {getBySubcategory(filteredProducts, section.key).map((p) => (
                  <div key={p.id} className="product-card">
                    <img
                      src={p.image}
                      alt={p.name}
                      onMouseOver={(e) => (e.target.src = p.secondImage)}
                      onMouseOut={(e) => (e.target.src = p.image)}
                    />

                    <p>{p.name}</p>
                    <p>{p.price}</p>
                    <p>{"⭐".repeat(p.rating)}</p>

                    <button onClick={() => setSelectedProduct(p)}>
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>

      ) : category === "Hair" ? (
        <>
          {hairSections.map((section) => (
            <div key={section.key}>
              <br />
              <h3 className="section-title">{section.title}</h3>

              <div className="product-grid">
                {getBySubcategory(filteredProducts, section.key).map((p) => (
                  <div key={p.id} className="product-card">
                    <img
                      src={p.image}
                      alt={p.name}
                      onMouseOver={(e) => (e.target.src = p.secondImage)}
                      onMouseOut={(e) => (e.target.src = p.image)}
                    />

                    <p>{p.name}</p>
                    <p>{p.price}</p>
                    <p>{"⭐".repeat(p.rating)}</p>

                    <button onClick={() => setSelectedProduct(p)}>
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      ) : category === "Fragrances" ? (
        <>
          {fragranceSections.map((section) => (
            <div key={section.key}>
              <br />
              <h3 className="section-title">{section.title}</h3>

              <div className="product-grid">
                {getBySubcategory(filteredProducts, section.key).map((p) => (
                  <div key={p.id} className="product-card">
                    <img
                      src={p.image}
                      alt={p.name}
                      onMouseOver={(e) => (e.target.src = p.secondImage)}
                      onMouseOut={(e) => (e.target.src = p.image)}
                    />

                    <p>{p.name}</p>
                    <p>{p.price}</p>
                    <p>{"⭐".repeat(p.rating)}</p>

                    <button onClick={() => setSelectedProduct(p)}>
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>

      ) : category === "Accessories" ? (
        <>
          <h3 className="section-title">Accessories</h3>

          <div className="product-grid">
            {filteredProducts.map((p) => (
              <div key={p.id} className="product-card">
                <img
                  src={p.image}
                  alt={p.name}
                  onMouseOver={(e) => (e.target.src = p.secondImage)}
                  onMouseOut={(e) => (e.target.src = p.image)}
                />

                <p>{p.name}</p>
                <p>{p.price}</p>
                <p>{"⭐".repeat(p.rating)}</p>

                <button onClick={() => setSelectedProduct(p)}>
                  View Details
                </button>
              </div>
            ))}
          </div>
        </>

      ) : (<p>Coming soon...</p>)
      }

      {/*Popup screen*/}
      {
        selectedProduct && (

          <div className="popup-overlay">

            <div className="popup-box">

              <button className="close-btn" onClick={() => setSelectedProduct(null)}>
                ❌
              </button>

              <div className="image-wrapper">

                <button className="prev-btn" onClick={() => setIsSecondImage(false)}>
                  ←
                </button>

                <img src={isSecondImage ? selectedProduct.secondImage : selectedProduct.image} alt={selectedProduct.name} />

                <button className="next-btn" onClick={() => setIsSecondImage(true)}>
                  →
                </button>

              </div>

              <h2>{selectedProduct.name}</h2>
              <p>{selectedProduct.description}</p>
              <h3>{selectedProduct.price}</h3>

              <div className="quantity-box">

                <button onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
                  -
                </button>

                <span>{quantity}</span>

                <button onClick={() => setQuantity(quantity + 1)}>
                  +
                </button>

              </div>

              <button className="cart-btn" onClick={() => addToCart(selectedProduct)}>
                Add To Cart
              </button>
              <br></br><br></br>
              <button className="cart-btn">
                Add To Wishlist
              </button>

            </div>
          </div>

        )
      }
    </>
  );
}

export default Shop;
