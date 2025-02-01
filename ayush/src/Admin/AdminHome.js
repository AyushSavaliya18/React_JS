import React from "react";
import Header from "./Header";
import ProductForm from "./ProductManager";


function AdminHome() {
  return (
    <div>
      <Header />
      <h3>This is an home page of admin!</h3>
      <ProductForm />
      
    </div>
  );
}

export default AdminHome;
