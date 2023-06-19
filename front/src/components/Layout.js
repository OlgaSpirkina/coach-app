import React from 'react'
import { Outlet, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Cookies from 'js-cookie'

export default function Layout() {
    /*
    const navigate = useNavigate();
    const location = useLocation();
  
    React.useEffect(() => {
      const authToken = Cookies.get('authToken');
      const isAuthenticated = !!authToken;
      
      if (!isAuthenticated && location.pathname !== '/login') {
        navigate('/login');
      }
    }, [navigate, location]);
  */
    return (
      <div className="site-wrapper">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    );
}


/*
export default function Layout(){
    return(
        <div className="site-wrapper">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

*/

  