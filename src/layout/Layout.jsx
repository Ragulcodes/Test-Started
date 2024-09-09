import React from 'react';
import { Outlet } from 'react-router-dom';


const Layout = () => {
  return (
    <div className="app-container">
      <div className="wrapper">
        <div className="header-title">Problems on Logarithm</div>
        <div className="sub-title">MCQs-Test</div>
      </div>
      <div className="content-container">
        {/* Dynamic content rendered via Outlet */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
