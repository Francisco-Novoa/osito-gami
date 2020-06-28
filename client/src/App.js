import React from 'react';
import Navbar from './navbar';
import WindowShop from "./products/windowshop"
import Footer from './footer';
import Display from './products/display';

function App() {
  return (
    <div className="App">
      <Navbar/>
     <Display/>
     <Footer/>
    </div>
  );
}

export default App;
