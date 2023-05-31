import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';


const AuthGuard = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuthenticationStatus = async () => {
      try {
        // Call your API function to check authentication status
        const isAuthenticated = await checkAuthentication();
        dispatch({ type: 'SET_AUTH_STATUS', payload: isAuthenticated });
      } catch (error) {
        // Handle any errors that occur during the authentication check
        console.error('Error checking authentication status:', error);
      }
    };

    fetchAuthenticationStatus();
  }, [dispatch]);

  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  return children;
};

export default AuthGuard;