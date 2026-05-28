import products from "src/Products.json";
import { useState } from "react";

function Shop() {
    const [category, setCategory] = useState("all");
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isSecondImage, setIsSecondImage] = useState(false);
    const filteredProducts =
    category === "all"
      ? products
      : products.filter((p) => p.category === category);

    const Cleansers = filteredProducts.filter(
    (p) => p.subcategory === "Cleanser" );

    const Toners = filteredProducts.filter(
    (p) => p.subcategory === "Toner" );

    const Serums = filteredProducts.filter(
    (p) => p.subcategory === "Serum" );

    const FaceMasks = filteredProducts.filter(
    (p) => p.subcategory === "Face Mask" );

    const Moisturizers = filteredProducts.filter(
    (p) => p.subcategory === "Moisturizer" );

    const SunScreen = filteredProducts.filter(
    (p) => p.subcategory === "SunScreen" );

    const lipmask = filteredProducts.filter(
    (p) => p.subcategory === "Lip Mask" );

  const addToCart = (product) => {
  const existingCart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const existingProduct = existingCart.find(
    (item) => item.id === product.id
  );

  if (existingProduct) {
    existingProduct.quantity += quantity;
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
      <h1 className="shop-all">Shop All Products</h1>

      <div className="shop-toolbar">

            <div className="control">
            <p>Filter :</p>
            <select onChange={(e) => setCategory(e.target.value)}>
                <option value= "all">FILTER BY CATEGORY</option>
                <option value="Skin">Skin Care</option>
                <option value="Lip">Lip Care</option>
                <option value="Hand">Hand Care</option>
                <option value="Foot">Foot Care</option>
                <option value="Hair">Hair Care</option>
                <option value="Fragnances">Fragnances</option>
                <option value="Accessories">Accessories</option>
            </select>

            <select>
                <option>AVAILABILITY </option>
                <option value="In">In Stock</option>
                <option value="Out">Out of Stock</option>
            </select>
            </div>
            
            <div className="control">
            <p>Sort By :</p>
            <select>
                <option>Default</option>
                <option>Best Selling</option>
                <option>Most relevant</option>
            </select>
            </div>

      </div>

    {category === "all" ? (
     <> 
    <div className="product-grid">
            {products.map((p) => (
            <div className="product-card" key={p.id}>
                <img src={p.image}
                     alt={p.name}  
                     onMouseOver={(e) => (e.target.src = p.secondImage)}
                     onMouseOut={(e) => (e.target.src = p.image)}/>
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
    
  ) : category === "Skin" ? (

      <>

      <br/>
      <h3 className="section-title">CLEANSERS</h3>

      <div className="product-grid">
        {Cleansers.map((p) =>(
          <div key={p.id} className="product-card">
            <img src={p.image}
                 alt={p.name}  
                 onMouseOver={(e) => (e.target.src = p.secondImage)}
                 onMouseOut={(e) => (e.target.src = p.image)}/>
            <p>{p.name}</p>
            <p>{p.price}</p>
            <p>
                {"⭐".repeat(p.rating)}
            </p>
            <button onClick={() => setSelectedProduct(p)}> View Details</button>
            
          </div>
        ))}

      </div>
      
      <br></br>
      <h3 className="section-title">TONERS</h3>

      <div className="product-grid">
        {Toners.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image}
                 alt={p.name}  
                 onMouseOver={(e) => (e.target.src = p.secondImage)}
                 onMouseOut={(e) => (e.target.src = p.image)}/>
            <p>{p.name}</p>
            <p>{p.price}</p>
            <p>
                {"⭐".repeat(p.rating)}
            </p>
            <button onClick={() => setSelectedProduct(p)}> View Details</button>
            
          </div>
        ))}
        </div>

        <br></br>
      <h3 className="section-title">Serums</h3>

      <div className="product-grid">
        {Serums.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image}
                 alt={p.name}  
                 onMouseOver={(e) => (e.target.src = p.secondImage)}
                 onMouseOut={(e) => (e.target.src = p.image)}/>
            <p>{p.name}</p>
            <p>{p.price}</p>
            <p>
                {"⭐".repeat(p.rating)}
            </p>
            <button onClick={() => setSelectedProduct(p)}> View Details</button>
            
          </div>
        ))}
        </div>

        <br></br>
      <h3 className="section-title">Moisturizers</h3>

      <div className="product-grid">
        {Moisturizers.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image}
                 alt={p.name}  
                 onMouseOver={(e) => (e.target.src = p.secondImage)}
                 onMouseOut={(e) => (e.target.src = p.image)}/>
            <p>{p.name}</p>
            <p>{p.price}</p>
            <p>
                {"⭐".repeat(p.rating)}
            </p>
            <button onClick={() => setSelectedProduct(p)}> View Details</button>
            
          </div>
        ))}
        </div>

        <br></br>
      <h3 className="section-title">SunScreen</h3>

      <div className="product-grid">
        {SunScreen.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image}
                 alt={p.name}  
                 onMouseOver={(e) => (e.target.src = p.secondImage)}
                 onMouseOut={(e) => (e.target.src = p.image)}/>
            <p>{p.name}</p>
            <p>{p.price}</p>
            <p>
                {"⭐".repeat(p.rating)}
            </p>
            <button onClick={() => setSelectedProduct(p)}> View Details</button>
            
          </div>
        ))}
        </div>

        <br></br>
      <h3 className="section-title">Face Masks</h3>

      <div className="product-grid">
        {FaceMasks.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image}
                 alt={p.name}  
                 onMouseOver={(e) => (e.target.src = p.secondImage)}
                 onMouseOut={(e) => (e.target.src = p.image)}/>
            <p>{p.name}</p>
            <p>{p.price}</p>
            <p>
                {"⭐".repeat(p.rating)}
            </p>
            <button onClick={() => setSelectedProduct(p)}> View Details</button>
            
          </div>
        ))}
        </div>


    </>
    

) : category === "Lip" ? (
      <>

      <br></br>
      <h3 className="section-title">Lip Masks</h3>

      <div className="product-grid">
        {lipmask.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image}
                 alt={p.name}  
                 onMouseOver={(e) => (e.target.src = p.secondImage)}
                 onMouseOut={(e) => (e.target.src = p.image)}/>
            <p>{p.name}</p>
            <p>{p.price}</p>
            <p>
                {"⭐".repeat(p.rating)}
            </p>
            <button onClick={() => setSelectedProduct(p)}> View Details</button>
            
          </div>
        ))}
        </div>

        </>

    ) : (

      <p>No products found in this category.</p>    
      
    )}

    {selectedProduct && (

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

)}
   </>
  );
}

export default Shop;
