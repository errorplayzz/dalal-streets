import { useState } from 'react';
import '../../App.css';
import './ClientStyles.css';
import SearchPG from '../../components/client/SearchPG';
import { PGListings } from '../../components/client/PGListings';
import { PayRent } from '../../components/client/PayRent';
import { AdditionalServices } from '../../components/client/AdditionalServices';
import { Complaints } from '../../components/client/Complaints';

const Dashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('search');

  // Render the appropriate component based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'search':
        return <SearchPG />;
      case 'listings':
        return <PGListings />;
      case 'rent':
        return <PayRent user={user} />;
      case 'services':
        return <AdditionalServices />;
      case 'complaints':
        return <Complaints user={user} />;
      default:
        return <SearchPG />;
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Client Dashboard</h1>
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          <button className="logout-button" onClick={onLogout}>Logout</button>
        </div>
      </header>
      
      <nav className="dashboard-nav">
        <ul className="nav-tabs">
          <li className={activeTab === 'search' ? 'active' : ''}>
            <button onClick={() => setActiveTab('search')}>
              Search & Book PGs
            </button>
          </li>
          <li className={activeTab === 'listings' ? 'active' : ''}>
            <button onClick={() => setActiveTab('listings')}>
              View Listings & Prices
            </button>
          </li>
          <li className={activeTab === 'rent' ? 'active' : ''}>
            <button onClick={() => setActiveTab('rent')}>
              Pay Rent Online
            </button>
          </li>
          <li className={activeTab === 'services' ? 'active' : ''}>
            <button onClick={() => setActiveTab('services')}>
              Additional Services
            </button>
          </li>
          <li className={activeTab === 'complaints' ? 'active' : ''}>
            <button onClick={() => setActiveTab('complaints')}>
              Complaints & Feedback
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
