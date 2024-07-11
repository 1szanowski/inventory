import React from 'react';
import logo from './logo.svg';
import './App.css';
import Inventory from './components/Inventory';

function App() {
  return (
    <div className="App">
      <div className='inventory-wrapper'>
      <Inventory/>
      </div>
     
    </div>
  );
}

export default App;
