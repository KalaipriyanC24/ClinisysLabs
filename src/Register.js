import React, { useState } from "react";
import axios from "axios";
import './App.css';

function RegisterForm() {
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});
  const [registrationType, setRegistrationType] = useState("user");

  const pageurl = "https://localhost:44321/api/Register";

  function validateForm() {
    let errors = {};

    if (FirstName.length === 0) {
      errors.FirstName = 'FirstName cannot be empty';
    }

    if (LastName.length === 0) {
      errors.LastName = 'LastName cannot be empty';
    }

    if (Email.length === 0) {
      errors.Email = 'Email cannot be empty';
    }

    if (PhoneNumber.length !== 10) {
      errors.PhoneNumber = "PhoneNumber should have 10 numbers";
    }

    if (Password.length < 8) {
      errors.Password = 'Password must contain more than 8 characters including uppercase, lowercase, special characters, and numbers.';
    } else {
      let countUpperCase = 0;
      let countLowerCase = 0;
      let countDigit = 0;
      let countSpecialCharacters = 0;

      for (let i = 0; i < Password.length; i++) {
        const specialCharacters = ['!', '@', '$', '&', '-', '_', '#', '^', '*'];

        if (specialCharacters.includes(Password[i])) {
          countSpecialCharacters++;
        } else if (!isNaN(Password[i] * 1)) {
          countDigit++;
        } else {
          if (Password[i] === Password[i].toUpperCase()) {
            countUpperCase++;
          }
          if (Password[i] === Password[i].toLowerCase()) {
            countLowerCase++;
          }
        }
      }

      if (countLowerCase === 0) {
        errors.Password = 'Password must contain at least one lower case character.';
      }
      if (countUpperCase === 0) {
        errors.Password = 'Password must contain at least one upper case character.';
      }
      if (countDigit === 0) {
        errors.Password = 'Password must contain at least one digit.';
      }
      if (countSpecialCharacters === 0) {
        errors.Password = 'Password must contain at least one special character.';
      }
    }

    setErrorMessages(errors);
    return Object.keys(errors).length === 0;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const details = { 
        FirstName, 
        LastName, 
        Email, 
        PhoneNumber, 
        Password, 
        IsAdmin: registrationType === "admin" ? true : false 
      };
      postData(details);
      clickHandler(details);
    }
  }

  const postData = async (details) => {
    try {
      const response = await axios.post(pageurl, details);
      console.log(response.data);
     
    } 
    catch (error) {
      console.log("Error", error);
   
    }
  }

  const clickHandler = (details) => {
    let str = JSON.stringify(details);
    localStorage.setItem("user", str);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhoneNumber("");
    setPassword("");
  }

  return (
    <div className="card4">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              id="user"
              name="registrationType"
              value="user"
              checked={registrationType === "user"}
              onChange={() => setRegistrationType("user")}
            />
            User
          </label>
          <label>
            <input
              type="radio"
              id="admin"
              name="registrationType"
              value="admin"
              checked={registrationType === "admin"}
              onChange={() => setRegistrationType("admin")}
            />
            Admin
          </label>
        </div>
        <label>
          FirstName:
          <input type="text" value={FirstName} onChange={(e) => setFirstName(e.target.value)} placeholder="FirstName" required />
          <p className="error">{errorMessages.FirstName}</p>
        </label>
        <label>
          LastName:
          <input type="text" value={LastName} onChange={(e) => setLastName(e.target.value)} placeholder="LastName" required />
          <p className="error">{errorMessages.LastName}</p>
        </label>
        <label>
          Email:
          <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <p className="error">{errorMessages.Email}</p>
        </label>
        <label>
          PhoneNumber:
          <input type="tel" value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="PhoneNumber" required />
          <p className="error">{errorMessages.PhoneNumber}</p>
        </label>
        <label>
          Password:
          <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <p className="error">{errorMessages.Password}</p>
        </label>
        <button type="submit" className="button">Submit</button>
      </form>
    </div>
  );
}

export default RegisterForm;