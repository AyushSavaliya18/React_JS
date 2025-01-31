import React from "react";
import {Link} from "react-router-dom";
import Nav from "./Nav";

function Home() {
  return (
    <div>
      <Nav />
      <h1>This is a Home Page</h1>
      <h3>Click on the links above to navigate</h3>
      <h3>
        Click on the links above to navigate into Admin Page{" "}
        <Link to="/admin">Admin</Link>  
      </h3>
    </div>
  );
}

export default Home;
