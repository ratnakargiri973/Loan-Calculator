import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import HeaderLayout from './components/HeaderLayout';

function App() {
  const location = useLocation();

  const showHeaderRoutes = ['/', '/about', '/exchange_rates_live'];

  const shouldShowHeader = showHeaderRoutes.includes(location.pathname);

  return (
    <>
      <main>
        {shouldShowHeader && <HeaderLayout />}
        <Outlet />
      </main>
    </>
  );
}

export default App;
