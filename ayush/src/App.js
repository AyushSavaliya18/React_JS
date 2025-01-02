import "./App.css";
import Nav from "./component/Nav";
import React from "react";
import Registration from "./component/Registration";
import Login from "./component/Login";
// import Home from "./component/Home1";

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
