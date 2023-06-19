import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
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
import Login from './authentication/Login';
import PrivateRoute from './authentication/PrivateRoute'


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
        },
        credentials: 'include',
        withCredentials: true,
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log(response);
      if (data.success) {
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
          path="/login"
          element={<Login handleLogin={handleLogin} />}
        />
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
  <Route path="login" element={<AuthenticationForm />} />

*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


/*
    <BrowserRouter>
      <Routes>
        <Route exact path="/login">
          {isAuthenticated ? (
            navigate("/")
          ) : (
            <Login handleLogin={handleLogin} />
          )}
        </Route>
        <PrivateRoute 
          path="/" 
          element={<Layout />}
          isAuthenticated={isAuthenticated}
        >
            
            <Route index element={<Home/>}/>
            <Route path="about" element={<About/>}/>
            <Route path="trainers" element={<Trainers/>}/>
            <Route path="trainers/:id" element={<TrainerDetails/>}/>
            <Route path="user" element={<UserLayout />}>
              <Route index element={<UserDashboard />}/>
              <Route path="slot" element={<UserSlot />}/>
              <Route path="calendar/*" element={<UserCalendar />} >
                <Route path=":monthid" element={<UserMonths />}/>
              </Route>
            </Route> 
        </PrivateRoute>
      </Routes>
      
    </BrowserRouter>
    */

/*
function PrivateRoute({ element: Component, ...rest }) {
  const authToken = Cookies.get('authToken');
  const isAuthenticated = !!authToken;

  React.useEffect(() => {
    console.log(authToken)
    if (!isAuthenticated) {
      // Redirect to '/login' if not authenticated
      navigate('/login');
    }
  }, [isAuthenticated]);

  const navigate = useNavigate(); // Add this line to access the navigate function

  return isAuthenticated ? (
    <Route {...rest} element={<Component />} />
  ) : (
    <Navigate to="/login" replace state={{ from: rest?.location?.pathname || '/' }} />
  );
}

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<AuthenticationForm />} />
        <Route element={<PrivateRoute />}>
          <Route  element={<Layout />}>
              <Route path="/" element={<Home/>}/>
              <Route path="about" element={<About/>}/>
              <Route path="trainers" element={<Trainers/>}/>
              <Route path="trainers/:id" element={<TrainerDetails/>}/>
              <Route path="user" element={<UserLayout />}>
                <Route index element={<UserDashboard />}/>
                <Route path="slot" element={<UserSlot />}/>
                <Route path="calendar/*" element={<UserCalendar />} >
                  <Route path=":monthid" element={<UserMonths />}/>
                </Route>
              </Route> 
          </Route>
        </Route>
      </Routes>
      
    </BrowserRouter>
  )
}
*/

