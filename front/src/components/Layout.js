import React from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'


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
/*
export default function Layout(){
    const navigate = useNavigate();

    React.useEffect(() => {
    const authToken = Cookies.get('authToken');
    const isAuthenticated = !!authToken;
    if (!isAuthenticated) {
        navigate('/login');
    }
    }, [navigate]);
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