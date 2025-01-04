import "./App.css";


import React from "react";
import Nav from "./component/Nav";
import Registration from "./component/Registration";
import Login from "./component/Login";



function App() {
  return (
    <div>
      <Nav />
      {/* <Home /> */}
      <Registration />
      <Login />
      
    </div>
  );
}
export default App;
