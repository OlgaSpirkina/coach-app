import React from 'react';
import ReactDOM from 'react-dom/client';
import base64 from 'base-64'
import { BrowserRouter, Router, Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home'
import About from './pages/About'
import Trainers from './pages/Trainer/Trainers'
import TrainerDetails from './pages/Trainer/TrainerDetails'
import UserLayout from './components/UserLayout'
import UserSlot from './pages/User/UserSlot'
import UserCalendar from './pages/User/UserCalendar'
import UserMonths from './pages/User/UserMonths'
import UserDashboard from './pages/User/UserDashboard'
import Layout from './components/Layout'
//import Login from './authentication/Login';

function Login({ handleLogin }) {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform login logic (e.g., API call, authentication)
    const loginSuccessful = await handleLogin(username, password);

    if (loginSuccessful) {
      return <Navigate to="/" replace />;
    } else {
      return <Navigate to="/login" replace state={{ error: 'Authentication failed' }} />;
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const handleLogin = async (username, password) => {
    const loginCredentials = {
      username: username,
      password: password,
    };
    try {
      const response = await fetch(`/login`, {
        method: 'POST',
        body: JSON.stringify(loginCredentials),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + base64.encode(`${username}:${password}`)
        }
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      if (response.ok) {
        setIsAuthenticated(true);
        return true; // Indicate successful login
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.log('Error:', error);
      return false; // Indicate login failure
    }
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  return (

    
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Layout>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="trainers" element={<Trainers />} />
                <Route path="trainers/:id" element={<TrainerDetails />} />
                <Route path="user" element={<UserLayout />}>
                  <Route index element={<UserDashboard />} />
                  <Route path="slot" element={<UserSlot />} />
                  <Route path="calendar/*" element={<UserCalendar />}>
                    <Route path=":monthid" element={<UserMonths />} />
                  </Route>
                </Route>
              </Layout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      </Routes>
    </BrowserRouter>


    
  );


  
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>    
  </React.StrictMode>
);
/*
<BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login handleLogin={handleLogin} />} />
      <React.Fragment>
        <PrivateRoute
          path="/"
          element={Layout}
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute
          path="/about"
          element={About}
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute
          path="/trainers"
          element={Trainers}
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute
          path="/trainers/:id"
          element={TrainerDetails}
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute
          path="/user/*"
          element={UserLayout}
          isAuthenticated={isAuthenticated}
        >
          <Route index element={<UserDashboard />} />
          <Route path="slot" element={<UserSlot />} />
          <Route path="calendar/*" element={<UserCalendar />}>
            <Route path=":monthid" element={<UserMonths />} />
          </Route>
        </PrivateRoute>
      </React.Fragment>
    </Routes>
  </BrowserRouter>
*/