import React from 'react';
import Cookies from 'js-cookie';

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
      password: password,
    };

    try {
      const response = await fetch(`/login`, {
        method: 'POST',
        body: JSON.stringify(loginCredentials),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        withCredentials: true
      });

     if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    console.log(response)
    if (data.success) {
      window.location.href = '/';
      console.log("coucoucoucoucoucoucouc")

    } else {
      throw new Error('Login failed');
    }
    
    } catch (error) {
      console.log('Error:', error);
    }

    // Clear form inputs
    setEmail('');
    setPassword('');
  };

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
/*
      if (response.ok) {
        // Authentication successful
        const data = await response;
        console.log(data.json())
        // Set the session cookie
        Cookies.set('authToken', data.sessionId, {
          secure: true,    // Ensure the cookie is only transmitted over HTTPS
          httpOnly: true,   // Restrict access to the cookie from client-side JavaScript
        });
        const authToken = Cookies.get('authToken');
        console.log("COUCOU")
        console.log(Cookies.get('authToken'))
        // Redirect to authenticated page
        window.location.href = '/';
      }   // else {
      //   // Handle non-2xx HTTP status codes
      //   const errorMessage = await response.text();

      //   if (response.status === 401) {
      //     // Unauthorized: Incorrect password
      //     console.log(errorMessage);
      //     // Update the state or show the error message in your component
      //   } else if (response.status === 404) {
      //     // Not Found: Email doesn't exist
      //     console.log(errorMessage);
      //     // Update the state or show the error message in your component
      //   } else {
      //     // Handle other error cases
      //     console.log('Unhandled error:', errorMessage);
      //   }
      // }
      */