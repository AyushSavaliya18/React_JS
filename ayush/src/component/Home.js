import React from "react";
import ProductList from "./ProductList";
import Nav from "./Nav";
import Slider from "./Slider";
import Pagination from "./Pagination";

function Home() {
  return (
    <div>
      <Nav />
      <Slider />
      <ProductList />
      <Pagination />
    </div>
  );
}

export default Home;
