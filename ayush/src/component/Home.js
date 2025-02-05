import React from "react";
import Nav from "./Nav";
import Slider from "./Slider";
import CustomerFooter from "./CustomerFooter";
import ShoppingPage from "./ShoppingPage.js";

function Home() {
  return (
    <div>
      <Nav />
      <Slider />
      <ShoppingPage />
      <CustomerFooter />
    </div>
  );
}

export default Home;
