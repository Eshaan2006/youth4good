import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar'; // Import Navbar component
import Events from './pages/Events'; // Import Events component
import Home from './pages/Home'; // Import Home component (create this if you don't have it)
import About from './pages/About'; // Import About component (create this if you don't have it)
import Signup from './pages/Signup';
import Services from './pages/Services.js'; // Import Services component (create this if you don't have it)
import Contact from './pages/Contact'; // Import Contact component (create this if you don't have it)
import Login from './pages/Login';
import Chat from './pages/Chat';
import './App.css'; // Import the CSS file for styling

function App() {
  return (
    <Router>
      <div className="App">
      <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/events" element={<Events />} />
            <Route path="/about" element={<About />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat/:eventId" element={<Chat />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
