import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Inventory from "./components/inventory/Inventory";
import Header from "./components/header/Header";

function App() {
  return (
    <div className="App">
      <div className="header-wrapper">
        <Header />
      </div>

      <div className="inventory-wrapper">
        <Inventory />
      </div>
    </div>
  );
}

export default App;
