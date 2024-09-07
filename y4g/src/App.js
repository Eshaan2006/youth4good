import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Events from './pages/Events'; // Import Events component
import Home from './pages/Home'; // Import Home component (create this if you don't have it)
import About from './pages/About'; // Import About component (create this if you don't have it)
import Services from './pages/Services.js'; // Import Services component (create this if you don't have it)
import Contact from './pages/Contact'; // Import Contact component (create this if you don't have it)
import './App.css'; // Import the CSS file for styling

function App() {
  return (
    <Router>
      <div className="App">
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;