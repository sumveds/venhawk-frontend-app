import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Landing from './pages/Landing';
import BudgetTimeline from './pages/BudgetTimeline';
import Summary from './pages/Summary';
import Login from './pages/Login';
import Callback from './pages/Callback';
import LoadingSpinner from './components/common/LoadingSpinner';
import { useUserSync } from './hooks/useUserSync';

/**
 * App Component
 * @description Main application component with routing
 */
function App() {
  // Sync user with backend when authenticated
  const { isSyncing } = useUserSync();

  // Show loading spinner while syncing user
  if (isSyncing) {
    return <LoadingSpinner fullScreen size="large" message="Setting up your account..." />;
  }

  return (
    <Routes>
      {/* Auth callback route */}
      <Route path="/callback" element={<Callback />} />

      {/* Landing page - shows Login if not authenticated, Landing form if authenticated */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Landing />
          </ProtectedRoute>
        }
      />
      <Route
        path="/budget-timeline"
        element={
          <ProtectedRoute>
            <BudgetTimeline />
          </ProtectedRoute>
        }
      />
      <Route
        path="/summary"
        element={
          <ProtectedRoute>
            <Summary />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendors"
        element={
          <ProtectedRoute>
            <div>Vendor Results Page</div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
