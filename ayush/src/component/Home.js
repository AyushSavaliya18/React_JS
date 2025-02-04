import React from "react";
// import ProductList from "./ProductList";
import Nav from "./Nav";
import Slider from "./Slider";
// import Pagination from "./Pagination";
import CustomerFooter from "./CustomerFooter";
// import Filter from "./Filter";
import AddToCart from "./Addtocart";

function Home() {
  return (
    <div>
      <Nav />
      <Slider />
      {/* <ProductList /> */}
      {/* <Pagination /> */}
      {/* <Filter /> */}
      <AddToCart />
      <CustomerFooter />
    </div>
  );
}

export default Home;
