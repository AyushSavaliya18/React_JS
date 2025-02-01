import React, {useState, useEffect} from "react";
import axios from "axios";
import "./ProductList.css"; // Import the CSS file

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/getallproduct");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="product-container">
      <h2>Product List</h2>
      <div className="product-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="product-card">
              <img src={product.image} alt={product.product_name} />
              <h3>{product.product_name}</h3>
              <p>Price: ₹{product.price} /-</p>
              <p>Quantity: {product.qty}</p>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
