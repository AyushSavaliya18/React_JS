import React from "react";
import {useState, useEffect} from "react";

function AddProduct({onSubmit, initialData}) {
  const [ProductData, setProductData] = useState({
    name: "",
    price: "",
    qty: "",
    size: "",
    image: "",
    description: "",
    brand_name: "",
  });

  useEffect(() => {
    if (initialData) setProductData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setProductData({...ProductData, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(ProductData);
  };

  return (
    <div>
      AddProduct
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="product_name"
          placeholder="Product Name"
          value={ProductData.product_name}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={ProductData.price}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input
          type="number"
          name="qty"
          placeholder="Quantity"
          value={ProductData.qty}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input
          type="text"
          name="size"
          placeholder="Size"
          value={ProductData.size}
          onChange={handleChange}
        />
        <br />
        <br />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={ProductData.image}
          onChange={handleChange}
        />
        <br />
        <br />
        <textarea
          name="description"
          placeholder="Description"
          value={ProductData.description}
          onChange={handleChange}
          required
        ></textarea><br/><br/>
        <input
          type="text"
          name="brand_name"
          placeholder="Brand Name"
          value={ProductData.brand_name}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddProduct;
