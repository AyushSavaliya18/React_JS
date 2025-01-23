import React from "react";
import Nav from "./Nav";
import Product from "./AddProduct";

function Home() {
  return (
    <div>
      <Nav />
      <h1>This is a Home Page</h1>
      <h3>Click on the links above to navigate</h3>
      <h3>
        Click on the link to visit admin site <a href="../Admin/Home.js"> Admin</a>
      </h3>
      <Product />
    </div>
  );
}

export default Home;
