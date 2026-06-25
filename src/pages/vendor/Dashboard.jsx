import { useState } from 'react';
import '../../App.css';
import './VendorStyles.css';
import { ManagePG } from '../../components/vendor/ManagePG';
import { TrackTenants } from '../../components/vendor/TrackTenants';
import { BookingRequests } from '../../components/vendor/BookingRequests';
import { ProvideServices } from '../../components/vendor/ProvideServices';

const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('managePG');

  // Render the appropriate component based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'managePG':
        return <ManagePG user={user} />;
      case 'tenants':
        return <TrackTenants user={user} />;
      case 'bookings':
        return <BookingRequests user={user} />;
      case 'services':
        return <ProvideServices user={user} />;
      default:
        return <ManagePG user={user} />;
    }
  };

  return (
    <div className="dashboard-container vendor-dashboard">
      <header className="dashboard-header">
        <h1>Vendor Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          {user.businessName && <span className="business-name">{user.businessName}</span>}
          <button className="logout-button" onClick={onLogout}>Logout</button>
        </div>
      </header>
      
      <nav className="dashboard-nav">
        <ul className="nav-tabs">
          <li className={activeTab === 'managePG' ? 'active' : ''}>
            <button onClick={() => setActiveTab('managePG')}>
              Manage PG Rentals
            </button>
          </li>
          <li className={activeTab === 'tenants' ? 'active' : ''}>
            <button onClick={() => setActiveTab('tenants')}>
              Track Tenants & Payments
            </button>
          </li>
          <li className={activeTab === 'bookings' ? 'active' : ''}>
            <button onClick={() => setActiveTab('bookings')}>
              Booking Requests
            </button>
          </li>
          <li className={activeTab === 'services' ? 'active' : ''}>
            <button onClick={() => setActiveTab('services')}>
              Provide Services
            </button>
          </li>
        </ul>
      </nav>
      
      <main className="dashboard-content">
        {renderContent()}
      </main>
      
      <footer className="dashboard-footer">
        <p>&copy; {new Date().getFullYear()} Dalal Streets. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
