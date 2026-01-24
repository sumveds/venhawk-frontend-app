import { useAuth0 } from '@auth0/auth0-react';
import PropTypes from 'prop-types';
import LoadingSpinner from '../common/LoadingSpinner';

/**
 * ProtectedRoute Component
 * @description Protects routes by requiring authentication
 */
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading, loginWithRedirect } = useAuth0();

  // Show loading state
  if (isLoading) {
    return <LoadingSpinner fullScreen size="large" message="Loading..." />;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    loginWithRedirect({
      appState: { returnTo: window.location.pathname }
    });
    return <LoadingSpinner fullScreen size="large" message="Redirecting to login..." />;
  }

  // Render children if authenticated
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
