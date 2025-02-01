import React from "react";
import ProductList from "./ProductList";
import Nav from "./Nav";

function Home() {
  return (
    <div>
      <Nav />
      <h1>This is a Home Page</h1>
      <ProductList />
    </div>
  );
}

export default Home;
