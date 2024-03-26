import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function LoginForm({ setLoggedIn, setAdminLoggedIn }) {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      const response = await axios.post("https://localhost:44321/api/Login", { Email, Password });
  
      if (response.status === 200) {
        const { isAdmin } = response.data;

        if(isAdmin)
        {
          setAdminLoggedIn(true);
        } else {
        setLoggedIn(true);
        }
        setErrorMessage("");
      }
    } catch (error) {
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <div className="card3">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        </label>
        <label>
          Password:
          <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        </label>
        <button type="submit" className="btn btn-Primary">Login</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
}

export default LoginForm;