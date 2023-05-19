import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home'
import About from './pages/About'
import Trainers from './pages/Trainer/Trainers'
import TrainerDetails from './pages/Trainer/TrainerDetails'
import UserLayout from './components/UserLayout'
import UserCompany from './pages/User/UserCompanies'
import UserCalendar from './pages/User/UserCalendar'
import UserMonths from './pages/User/UserMonths'
import UserDashboard from './pages/User/UserDashboard'
import Layout from './components/Layout'

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home/>}/>
          <Route path="about" element={<About/>}/>
          <Route path="trainers" element={<Trainers/>}/>
          <Route path="trainers/:id" element={<TrainerDetails/>}/>
          <Route path="user" element={<UserLayout />}>
            <Route index element={<UserDashboard />}/>
            <Route path="company" element={<UserCompany />}/>
            <Route path="calendar/*" element={<UserCalendar />} >
              <Route path=":monthid" element={<UserMonths />}/>
            </Route>
          </Route>
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
