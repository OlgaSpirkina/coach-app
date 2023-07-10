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
  const [loginError, setLoginError] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform login request to the backend
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + base64.encode(`${username}:${password}`)
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        setLoginError(false);
        handleLogin();
      } else {
        setLoginError(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      {loginError && <p>Invalid credentials. Please try again.</p>}
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
function ProtectedRoute({ element: Element, isAuthenticated, ...rest }) {
  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? <Element /> : <Navigate to="/login" replace />
      }
    />
  );
}
/*
function ProtectedRoute({ path, isAuthenticated, children }) {
  return isAuthenticated ? (
    <Route path={path}>{children}</Route>
  ) : (
    <Navigate to="/login" replace />
  );
}
*/
function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const handleLogin = () => {
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
  };
  React.useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
  }, [isAuthenticated]);
  return (
    
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute
              isAuthenticated={isAuthenticated}
              element={
                <Layout>
                  <Route index element={<Home />} />
                  <Route path="about" element={<About />} />
                  <Route path="trainers" element={<Trainers />} />
                  <Route path="trainers/:id" element={<TrainerDetails />} />
                  <Route path="user" element={<UserLayout />}>
                    <Route index element={<UserDashboard />} />
                    <Route path="slot" element={<UserSlot />} />
                    <Route path="calendar" element={<UserCalendar />} />
                    <Route path="calendar/:monthid" element={<UserMonths />} />
                  </Route>
                </Layout>
              }
            />
          }
        />
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/" replace />
            ) : (
              <Login handleLogin={handleLogin} />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App/>    
  </React.StrictMode>
);