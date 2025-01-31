import React, {useState, useEffect} from "react";

function AddProduct({onSubmit, initialData}) {
  // Set up the state to manage the product data
  const [productData, setProductData] = useState({
    product_name: "",
    price: "",
    qty: "",
    size: "",
    image: "",
    description: "",
    brand_name: "",
  });

  // Effect hook to populate the form with initial data if available
  useEffect(() => {
    if (initialData) setProductData(initialData); // If initialData is provided, use it to set the state
  }, [initialData]);

  // Handle changes to form input fields
  const handleChange = (e) => {
    const {name, value} = e.target; // Destructure name and value from the event target (input field)
    setProductData({...productData, [name]: value}); // Update the corresponding field in productData
  };

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (onSubmit) {
      onSubmit(productData); // Pass the productData to the onSubmit function (callback)
    } else {
      console.error("onSubmit function is not defined.");
    }
  };

  return (
    <div>
      <h2>Add Product </h2>
      {/* Render the form to collect product information */}
      <form onSubmit={handleSubmit}>
        {/* Input field for the product name */}
        <input
          type="text"
          name="product_name"
          placeholder="Product Name"
          value={productData.product_name} // Set the value to the current state of product_name
          onChange={handleChange} // Update the state when the value changes
          required
        />
        <br />
        <br />

        {/* Input field for the product price */}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={productData.price} // Set the value to the current state of price
          onChange={handleChange} // Update the state when the value changes
          required
        />
        <br />
        <br />

        {/* Input field for the product quantity */}
        <input
          type="number"
          name="qty"
          placeholder="Quantity"
          value={productData.qty} // Set the value to the current state of qty
          onChange={handleChange} // Update the state when the value changes
          required
        />
        <br />
        <br />

        {/* Input field for the product size */}
        <input
          type="text"
          name="size"
          placeholder="Size"
          value={productData.size} // Set the value to the current state of size
          onChange={handleChange} // Update the state when the value changes
        />
        <br />
        <br />

        {/* Input field for the image URL */}
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={productData.image} // Set the value to the current state of image
          onChange={handleChange} // Update the state when the value changes
        />
        <br />
        <br />

        {/* Textarea for the product description */}
        <textarea
          name="description"
          placeholder="Description"
          value={productData.description} // Set the value to the current state of description
          onChange={handleChange} // Update the state when the value changes
          required
        ></textarea>
        <br />
        <br />

        {/* Input field for the brand name */}
        <input
          type="text"
          name="brand_name"
          placeholder="Brand Name"
          value={productData.brand_name} // Set the value to the current state of brand_name
          onChange={handleChange} // Update the state when the value changes
          required
        />
        <br />
        <br />

        {/* Submit button to submit the form */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default AddProduct;
