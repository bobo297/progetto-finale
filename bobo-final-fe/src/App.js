import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';

import EmployeesPage from './pages/EmployeesPage';
import ProductsPage from './pages/ProductsPage';
import StocksPage from './pages/StocksPage';
import ShelvesPage from './pages/ShelvesPage';
import WarehousesPage from './pages/WarehousesPage';
import WarehouseMovementsPage from './pages/WarehouseMovementsPage';
import LoginPage from './pages/LoginPage';



export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('basicAuthToken');
    const role = localStorage.getItem('userRole');
    setIsAuthenticated(!!token);
    setUserRole(role);
  }, []);

  const handleLogin = (role) => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('userRole', role);
  };

  const handleLogout = () => {
    localStorage.removeItem('basicAuthToken');
    localStorage.removeItem('userRole');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/products">
            Warehouse Management System
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav me-auto">
              <Link className="nav-link" to="/employees">Employees</Link>
              <Link className="nav-link" to="/products">Products</Link>
              <Link className="nav-link" to="/stocks">Stocks</Link>
              <Link className="nav-link" to="/shelves">Shelves</Link>
              <Link className="nav-link" to="/warehouses">Warehouses</Link>
              <Link className="nav-link" to="/warehouse_movements">Warehouse Movements</Link>
            </div>
            <button
              className="btn btn-outline-light"
              onClick={handleLogout}
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/stocks" element={<StocksPage />} />
          <Route path="/shelves" element={<ShelvesPage />} />
          <Route path="/warehouses" element={<WarehousesPage />} />
          <Route path="/warehouse_movements" element={<WarehouseMovementsPage userRole={userRole} />} />

          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
