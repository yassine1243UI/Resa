import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/AdminNavbar.css';

const AdminNavbar = () => {
  return (
    <nav className="admin-navbar">
      <div className="admin-nav-container">
        <div className="admin-nav-brand">
          Admin Panel
        </div>
        <div className="admin-nav-links">
          <Link to="/admin/events" className="admin-nav-link">
            Événements
          </Link>
          <Link to="/admin/reservations" className="admin-nav-link">
            Réservations
          </Link>
          <Link to="/admin/waiting-list" className="admin-nav-link">
            Liste d'Attente
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
