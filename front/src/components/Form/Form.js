import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import User from "../User/User"

export default function Form() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    fetch("/api", { 
      method: "POST", 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formJson)
    }).then(data => data.json()).then(result=>{
      (result.trainers.length > 0)
        ?
      (console.log(result.trainers[0].id))
        :
      (console.log("no user found"))
      
    }).catch(err=>console.error(err))
    
  }

  return (
    <>
    <h1>Bonjour</h1>
    <form method="POST" onSubmit={handleSubmit}>
      <p>
      <label>
        First name:
      </label>
      <input
          name="name"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          type="text"
        />
      </p>
      <p>
      <label>
        Email:
      </label>
      <input
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          type="email"
        />
      </p>
      <button type="submit">Se connecter</button>
    </form>
    </>
  );
}