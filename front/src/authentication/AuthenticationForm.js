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
      const response = await fetch(`/login`, {
        method: 'POST',
        body: JSON.stringify(loginCredentials),
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          withCredentials: true,
          credentials:'include'
        }
      });
      if (response.ok) {
        
        // Authentication successful
        const data = await response.json();
        // Set the session cookie
        Cookies.set('authToken', data.sessionId, {
          secure: true,    // Ensure the cookie is only transmitted over HTTPS
          httpOnly: false   // Restrict access to the cookie from client-side JavaScript
        });
        
      } else {
        console.log(response)
        // Handle non-2xx HTTP status codes
        const errorMessage = await response.text();
       
        if (response.status === 401) {
          // Unauthorized: Incorrect password
          console.log(errorMessage)
          // Update the state or show the error message in your component
        } else if (response.status === 404) {
          // Not Found: Email doesn't exist
        
          // Update the state or show the error message in your component
        } else {
          // Handle other error cases
          console.log('Unhandled error:', errorMessage);
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }



    
/*
   try {
      const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify(loginCredentials),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.log("CATCH")
      if (error.response) {
        console.log("ERRR")
        // The request was made and the server responded with an error status
        if (error.response.status === 401) {
          // Unauthorized: Incorrect password
          const errorMessage = error.response.data.message;
          console.log(errorMessage)
          // Update the state or show the error message in your component
        } else if (error.response.status === 404) {
          // Not Found: Email doesn't exist
          const errorMessage = error.response.data.message;
          // Update the state or show the error message in your component
        } else {
          // Handle other error cases
          // ...
        }
      } else {
        // Handle other types of errors, e.g., network error
        // ...
      }
    } 
*/
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

