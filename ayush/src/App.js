import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import React from "react";
import Home from "./component/Home";
import About from "./component/About";
import Registration from "./component/Registration";
import Login from "./component/Login";
import AdminHome from "./Admin/Home";
// import RegistraionApi from "./component/RegistraionApi";
import UpdateProduct from "./Admin/UpdateProduct";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/products/update/:productId" element={<UpdateProduct />} />
        </Routes>
      </BrowserRouter>
      <AdminHome />
    </div>
  );
}
export default App;
