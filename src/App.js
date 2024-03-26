import React, { useState } from 'react';
import Product from './Product';
import Register from './Register';
import Contact from './Contact';
import Login from './Login';
import About from './About';
import Footer from './Footer'; 
import './App.css';
import '@fortawesome/fontawesome-free/css/all.css';

function App() {
  const [showAbout, setShowAbout] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  const handleAboutClick = () => {
    setShowAbout(true);
    setShowProducts(false);
    setShowRegister(false);
    setShowLogin(false);
    setShowContact(false);
  };

  const handleProductsClick = () => {
    setShowProducts(true);
    setShowAbout(false);
    setShowRegister(false);
    setShowLogin(false);
    setShowContact(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowAbout(false);
    setShowProducts(false);
    setShowRegister(false);
    setShowContact(false);
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setShowAbout(false);
    setShowProducts(false);
    setShowLogin(false);
    setShowContact(false);
  };

  const handleContactClick = () => {
    setShowContact(true);
    setShowAbout(false);
    setShowProducts(false);
    setShowRegister(false);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setAdminLoggedIn(false);
  };


  return (
    <div>
      <header className="header">
        <h1>ClinisysLabSolutions</h1>
        <div className="nav-links">
          <button onClick={handleAboutClick}>About</button>
          {loggedIn && !adminLoggedIn && <button onClick={handleProductsClick}>Products</button>}
          {adminLoggedIn && <button onClick={handleProductsClick}>Admin Products</button>}
          {(loggedIn || adminLoggedIn)  && <button onClick={handleLogout}>Logout</button>} 
          {!loggedIn && !adminLoggedIn && (
            <>
              <button onClick={handleRegisterClick}>Register</button>
              <button onClick={handleLoginClick}>Login</button>
            </>
          )}
          <button onClick={handleContactClick}>Contact</button>
        </div>
      </header>

      <div className="body-content">
        {showAbout && <About />} 
        {showProducts && (loggedIn || adminLoggedIn) && <Product adminLoggedIn={adminLoggedIn} />}
        {showRegister && <Register />}
        {(showLogin && !loggedIn) && !adminLoggedIn && <Login setLoggedIn={setLoggedIn} setAdminLoggedIn={setAdminLoggedIn} />}
        {showContact && <Contact />}
      </div>

      <Footer /> 
    </div>
  );
}

export default App;