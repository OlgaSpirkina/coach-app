import React from 'react';
import ReactDOM from 'react-dom/client';
import base64 from 'base-64'
import { BrowserRouter, Outlet, Router, Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom'
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
import AuthRequired from './authentication/AuthRequired'
//import Login from './authentication/Login';
const d = new Date()
function App() {
  const [cookieValue, setCookieValue] = React.useState(Cookies.get('react_auth') || '')
  React.useEffect(() => {
    if (cookieValue) {
      setCookieValue(cookieValue)
    }
  }, [cookieValue]);
  function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loginError, setLoginError] = React.useState(false);
    const handleLogin = async (e) => {
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
          Cookies.set("react_auth", process.env.REACT_APP_TOKEN, {
            expires: d.setTime(d.getTime() + 24 * 60 * 60 * 1000),
          });
          setCookieValue(Cookies.get('react_auth'))
          setLoginError(false);
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
        <form onSubmit={handleLogin}>
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
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home/>}/>
        <Route path="about" element={<About/>}/>
        <Route
          path="login"
          element={cookieValue ? <Navigate to="/user" replace /> : <Login cookieValue={cookieValue} />}
        />
        <Route element={<AuthRequired cookieValue={cookieValue}/>}>
          <Route path="trainers" element={cookieValue && <Trainers/>}/>
          <Route path="trainers/:id" element={cookieValue && <TrainerDetails/>}/>
          <Route path="user" element={cookieValue && <UserLayout />}>
            <Route index element={cookieValue && <UserDashboard />}/>
            <Route path="slot" element={cookieValue &&  <UserSlot />}/>
            <Route path="calendar/*" element={cookieValue &&  <UserCalendar />} >
              <Route path=":monthid" element={cookieValue &&  <UserMonths />}/>
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>  
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