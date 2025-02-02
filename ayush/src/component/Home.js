import React from "react";
import ProductList from "./ProductList";
import Nav from "./Nav";
import Slider from "./Slider";
import Pagination from "./Pagination";
import CustomerFooter from "./CustomerFooter";

function Home() {
  return (
    <div>
      <Nav />
      <Slider />
      <ProductList />
      <Pagination />
      <CustomerFooter />
    </div>
  );
}

export default Home;
