import React from 'react';
import Navbar from '../components/Navbar'; // Adjust path as needed
import Boom from '../components/Boom';               // Adjust path as needed
import About from '../components/About';             // Adjust path as needed
import More from '../components/More';               // Adjust path as needed


function Home() {
  return (
    <div className="home">
      <div className="wrapper">
        <div className="main">
          <Boom />
          <About />
          <More />
        </div>
      </div>
    </div>
  );
}

export default Home;
