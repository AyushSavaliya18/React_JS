import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import Home from "./component/Home";
import About from "./component/About";
import Registration from "./component/Registration";
import Login from "./component/Login";
import UpdateProduct from "./Admin/UpdateProduct";
import AdminHome from "./Admin/AdminHome";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/products/update/:productId"
            element={<UpdateProduct />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
