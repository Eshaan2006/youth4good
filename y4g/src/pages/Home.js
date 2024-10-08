import React from 'react';
import Boom from '../components/Boom';               // Adjust path as needed
import About from '../components/About';             // Adjust path as needed
import More from '../components/More';               // Adjust path as needed
import Footer from '../components/Footer'; // Import the new footer component


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
      <Footer />
    </div>
  );
}

export default Home;
