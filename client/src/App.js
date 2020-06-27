import React from 'react';
import Navbar from './navbar';
import WindowShop from "./products/windowshop"
import Footer from './footer';

function App() {
  return (
    <div className="App">
      <Navbar/>
     <WindowShop/>
     <Footer/>
    </div>
  );
}

export default App;
