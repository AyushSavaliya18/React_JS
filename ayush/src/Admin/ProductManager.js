import React, {useState, useEffect} from "react";
import axios from "axios";
import "./Product.css";

function ProductManager() {
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState({
    product_name: "",
    price: "",
    qty: "",
    size: "",
    image: "",
    description: "",
    brand_name: "",
  });
  const [editingId, setEditingId] = useState(null);

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

  const handleChange = (e) => {
    setProductData({...productData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(
          `http://localhost:8000/api/products/${editingId}`,
          productData
        );
      } else {
        await axios.post("http://localhost:8000/api/products", productData);
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
        await axios.delete(`http://localhost:8000/api/products/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleEdit = (product) => {
    setProductData(product);
    setEditingId(product._id);
  };

  return (
    <div className="container">
      <h2>{editingId ? "Edit Product" : "Add Product"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="product_name"
          placeholder="Product Name"
          value={productData.product_name}
          onChange={handleChange}
          required
        />
        <br />
        <input
          className="Field"
          type="number"
          name="price"
          placeholder="Price"
          value={productData.price}
          onChange={handleChange}
          required
        />
        <br />
        <input
          className="Field"
          type="number"
          name="qty"
          placeholder="Quantity"
          value={productData.qty}
          onChange={handleChange}
          required
        />
        <br />
        <input
          className="Field"
          type="text"
          name="size"
          placeholder="Size"
          value={productData.size}
          onChange={handleChange}
        />
        <br />
        <input
          className="Field"
          type="text"
          name="image"
          placeholder="Image URL"
          value={productData.image}
          onChange={handleChange}
        />
        <br />
        <input
          className="Field"
          type="text"
          name="description"
          placeholder="Description"
          value={productData.description}
          onChange={handleChange}
        />
        <br />
        <input
          className="Field"
          type="text"
          name="brand_name"
          placeholder="Brand Name"
          value={productData.brand_name}
          onChange={handleChange}
        />
        <br />
        <button type="submit" className="submit">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>
      <h2>Product List</h2>
      <ul className="ul">
        {products.length > 0 ? (
          products.map((product) => (
            <li className="List" key={product._id}>
              <img
                className="Photo"
                src={product.image}
                alt={product.product_name}
                width="100"
              />
              <h3 className="Name">{product.product_name}</h3>
              <p className="P">Price: ₹{product.price}</p>
              <p>Quantity: {product.qty}</p>
              <button onClick={() => handleEdit(product)} className="btn btn-secondary">Edit</button>
              <button
                onClick={() => handleDelete(product._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
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
