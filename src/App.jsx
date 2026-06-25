import { useState, useEffect } from 'react'
import './App.css'
import ClientAuthPage from './pages/client/AuthPage'
import ClientDashboard from './pages/client/Dashboard'
import VendorAuthPage from './pages/vendor/AuthPage'
import VendorDashboard from './pages/vendor/Dashboard'
import Navbar from './components/common/Navbar'
import backgroundImage from './assets/istockphoto-1283363191-612x612.jpg'

function App() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [user, setUser] = useState(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setAnimated(true);
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedOption(null);
  };

  const renderContent = () => {
    if (user) {
      if (user.role === 'client') {
        return <ClientDashboard user={user} onLogout={handleLogout} />;
      } else if (user.role === 'vendor') {
        return <VendorDashboard user={user} onLogout={handleLogout} />;
      }
      return null;
    }

    if (selectedOption === 'Client') {
      return <ClientAuthPage onLogin={handleLogin} />;
    } else if (selectedOption === 'Vendor') {
      return <VendorAuthPage onLogin={handleLogin} />;
    }

    return (
      <div className={`options-container ${animated ? 'animated' : ''}`}>
        <h2 className="options-title">
          Welcome to <span className="highlight">Dalal Streets</span>
        </h2>
        <p className="welcome-message">Your one-stop solution for PG accommodation and services</p>
        
        <div className="options-buttons">
          <button 
            className="option-button client-button"
            onClick={() => handleOptionSelect('Client')}
          >
            <span className="icon">👤</span>
            <span className="button-title">Client</span>
            <p className="option-description">For renters & service seekers</p>
          </button>
          
          <button 
            className="option-button vendor-button"
            onClick={() => handleOptionSelect('Vendor')}
          >
            <span className="icon">🏠</span>
            <span className="button-title">Vendor</span>
            <p className="option-description">For PG owners & service providers</p>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="app-container" style={{ 
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <Navbar />
      <div className="main-content">
        {renderContent()}
      </div>
    </div>
  );
}

export default App
