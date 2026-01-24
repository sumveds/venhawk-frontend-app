import { Outlet } from 'react-router-dom';
import Header from './Header';
import PropTypes from 'prop-types';

/**
 * Layout Component
 * @description Main layout wrapper with header and content area
 */
const Layout = ({ showHeader = true }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && <Header />}
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
};

Layout.propTypes = {
  showHeader: PropTypes.bool,
};

export default Layout;
