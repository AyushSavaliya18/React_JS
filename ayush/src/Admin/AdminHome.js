import React from "react";
import Header from "./Header";
import ProductForm from "./ProductManager";
import AdminFooter from "./AdminFooter";

function AdminHome() {
  return (
    <div>
      <Header />
      <h3>This is an home page of admin!</h3>
      <ProductForm />
      <AdminFooter />
    </div>
  );
}

export default AdminHome;
