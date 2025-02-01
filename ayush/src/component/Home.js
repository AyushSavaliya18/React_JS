import React from "react";
import ProductList from "./ProductList";
import Nav from "./Nav";
import Slider from "./Slider";

function Home() {
  return (
    <div>
      <Nav />
      <Slider />
      <ProductList />
    </div>
  );
}

export default Home;
