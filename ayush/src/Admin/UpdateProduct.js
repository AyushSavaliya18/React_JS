import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom"; // Import useParams from react-router-dom
import axios from "axios";
import Header from "./Header";

function UpdateProduct() {
  const {productId} = useParams(); // Extract productId from the URL
  const [ProductData, setProductData] = useState({
    product_name: "",
    price: "",
    qty: "",
    size: "",
    image: "",
    description: "",
    brand_name: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Make sure productId is available before proceeding
    if (productId) {
      const fetchProductData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/products/${productId}`
          );
          setProductData(response.data);
        } catch (error) {
          console.error("Error fetching product:", error);
          setError("Error fetching product data.");
        }
      };
      fetchProductData();
    } else {
      setError("Product ID is missing in the URL.");
    }
  }, [productId]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setProductData({...ProductData, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make sure productId is defined before submitting
    if (!productId) {
      setError("Product ID is missing.");
      return;
    }

    try {
      setError("");
      setSuccess("");

      const response = await axios.put(
        `http://localhost:8000/api/products/${productId}`,
        ProductData
      );
      setProductData(response.data);

      setSuccess("Product updated successfully!");
    } catch (error) {
      setError("Error updating product.");
    }
  };

  return (
    <div>
      <Header />
      <h3>Update Product</h3>

      <form onSubmit={handleSubmit} style={{textAlign: "center"}}>
        <div className="form-group">
          <label>Product Name:</label>
          <input
            type="text"
            name="product_name"
            value={ProductData.product_name}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={ProductData.price}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="qty"
            value={ProductData.qty}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="form-group">
          <label>Size:</label>
          <input
            type="text"
            name="size"
            value={ProductData.size}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={ProductData.image}
            onChange={handleChange}
          />
        </div>
        <br />
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={ProductData.description}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        <div className="form-group">
          <label>Brand Name:</label>
          <input
            type="text"
            name="brand_name"
            value={ProductData.brand_name}
            onChange={handleChange}
            required
          />
        </div>
        <br />
        {error && <div>{error}</div>}
        {success && <div>{success}</div>}
        <br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
