import React, {useState, useEffect} from "react";
import axios from "axios";

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    product_name: "",
    price: "",
    qty: "",
    size: "",
    image: [],
    description: "",
    brand_name: "",
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/ShowProduct");
      console.log("Fetched products:", res.data); // Log the response
      setProducts(res.data.products || res.data); // Ensure you're setting products correctly
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    setProductData({...productData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedProductData = {
        ...productData,
        image: productData.image.split(","), // Convert comma-separated string to an array
      };

      if (editingId) {
        await axios.put(
          `http://localhost:8000/api/UpdateProduct/${editingId}`,
          updatedProductData
        );
      } else {
        await axios.post(
          "http://localhost:8000/api/AddProduct",
          updatedProductData
        );
      }

      fetchProducts();
      setProductData({
        product_name: "",
        price: "",
        qty: "",
        size: "",
        image: "",
        description: "",
        brand_name: "",
      });
      setEditingId(null);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:8000/api/DeleteProducts/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleEdit = (product) => {
    setProductData({
      ...product,
      image: product.image.join(","), // Convert array back to string for input field
    });
    setEditingId(product._id);
  };

  return (
    <div className="container">
      <h2>{editingId ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="product_name"
          placeholder="Product Name"
          value={productData.product_name}
          onChange={handleChange}
          required
        />{" "}
        <br />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productData.price}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="number"
          name="qty"
          placeholder="Quantity"
          value={productData.qty}
          onChange={handleChange}
          required
        />
        <br />
        <input
          type="text"
          name="size"
          placeholder="Size"
          value={productData.size}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Image URLs (comma-separated)"
          value={productData.image}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={productData.description}
          onChange={handleChange}
        />
        <br />
        <input
          type="text"
          name="brand_name"
          placeholder="Brand Name"
          value={productData.brand_name}
          onChange={handleChange}
        />
        <br />
        <button type="submit">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>
      <br />

      <h2>Product List</h2>
      <ul className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product._id} className="product-item">
              {product.image.length > 0 && (
                <img
                  src={product.image[0]}
                  alt={product.product_name}
                  className="product-img"
                />
              )}
              <div>
                <h3>{product.product_name}</h3>
                <p>Price: ${product.price}</p>
                <p>Quantity: {product.qty}</p>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(product)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(product._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No products available</p>
        )}
      </ul>
    </div>
  );
}

export default ProductManager;
