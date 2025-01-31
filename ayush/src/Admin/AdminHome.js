import React from "react";
import Header from "./Header";
import ProductForm from "./ProductManager";
// import AddProduct from "./AddProduct";

// import UpdateProduct from "./UpdateProduct";

function AdminHome() {
  return (
    <div>
      <Header />
      <h3>This is an home page of admin!</h3>
      <ProductForm />
      {/* <AddProduct /> */}
      {/* <UpdateProduct /> */}
    </div>
  );
}

export default AdminHome;
