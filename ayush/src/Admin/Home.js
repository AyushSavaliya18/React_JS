import React from "react";
import Header from "./Header";
import AddProduct from "./Addproduct";
import UpdateProduct from "./UpdateProduct";

function Home() {
  return (
    <div>
      <Header />
      <h3>This is an home page of admin!</h3>
      <h4>Here you can add, update and delete products.</h4>
      <h4>Click on the links above to perform these actions.</h4>

      <br />
      <h4>Add Product</h4>
      <AddProduct />
      <h4>Update Product</h4>
      <UpdateProduct />
      <h4>Delete Product</h4>
    </div>
  );
}

export default Home;
