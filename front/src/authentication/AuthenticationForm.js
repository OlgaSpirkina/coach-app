import React from 'react'
import Cookies from 'js-cookie'

const AuthenticationForm = () => {
  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginCredentials = {
      email: email,
      password: password
    };

    try {
      const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify(loginCredentials),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Authentication successful
        const data = await response.json();
        Cookies.set('authToken', data.sessionId);
        console.log(data.message);
      } else {
        // Authentication failed
        const errorData = await response.json();
        console.log(errorData.message);
      }
    } catch (error) {
      console.log('Error:', error);
    }

    // Clear form inputs
    setEmail('');
    setPassword('');
  };

  // Check if the authToken cookie exists
  const authToken = Cookies.get('authToken');
  const isAuthenticated = !!authToken;

  if (isAuthenticated) {
    // User is authenticated, redirect to authenticated page
    window.location.href = '/';
    return null;
  }

  return (
    <form className="authentication-form" onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={handleEmailChange}
        required
      />

      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
        required
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default AuthenticationForm;

