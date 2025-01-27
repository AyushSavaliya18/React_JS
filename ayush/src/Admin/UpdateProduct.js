import React, { useState, useEffect } from "react";
import axios from "axios";

function UpdateProduct({ productId }) {
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

  // Fetch existing product data when the component mounts or productId changes
  useEffect(() => {
    if (productId) {
      const fetchProductData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8000/api/products/${productId}`
          );
          setProductData(response.data); // Populate state with the product data
        } catch (error) {
          console.error("Error fetching product:", error);
          setError("Error fetching product data.");
        }
      };
      fetchProductData();
    }
  }, [productId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...ProductData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Clear previous errors or success messages
      setError("");
      setSuccess("");

      // Send PUT request to update the product
      const response = await axios.put(
        `http://localhost:8000/api/products/${productId}`, // Backend API URL
        ProductData
      );

      // If the request was successful
      console.log("Product updated:", response.data);
      setSuccess("Product updated successfully!");
    } catch (error) {
      console.error(
        "Error updating product:",
        error.response ? error.response.data : error.message
      );
      setError(
        "There was an error updating the product. Please check the console for more details."
      );
    }
  };

  return (
    <div className="update-product-container" style={{ textAlign: "center" }}>
      <h3>Update Product</h3>
      <br />
      <br />
      <form onSubmit={handleSubmit}>
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

        {error && <div className="alert">{error}</div>}
        {success && (
          <div className="alert" style={{ color: "green" }}>
            {success}
          </div>
        )}
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
