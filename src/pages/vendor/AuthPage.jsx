import { useState } from 'react';
import '../../App.css';
import './VendorStyles.css';

const AuthPage = ({ onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
    businessName: '',
    businessType: ''
  });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleMode = () => {
    setIsLoginMode(prev => !prev);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (!isLoginMode && (!formData.name || !formData.phone || !formData.businessType)) {
      setError('Please fill in all required fields');
      return;
    }

    // In a real app, this would connect to an authentication API
    // For now, simulate successful login/signup
    setTimeout(() => {
      // Pass the user data to the parent component
      onLogin({
        id: 'V12345',
        name: formData.name || 'Vendor User',
        businessName: formData.businessName,
        email: formData.email,
        businessType: formData.businessType || 'PG Owner',
        role: 'vendor'
      });
    }, 1000);
  };

  return (
    <div className="auth-container vendor-auth">
      <div className="auth-card">
        <h2 className="auth-title">{isLoginMode ? 'Vendor Login' : 'Vendor Signup'}</h2>
        
        {error && <div className="auth-error">{error}</div>}
        
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLoginMode && (
            <>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="businessName">Business Name (Optional)</label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Enter your business name if any"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="businessType">Business Type</label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                >
                  <option value="">Select Business Type</option>
                  <option value="PG Owner">PG Owner</option>
                  <option value="Service Provider">Service Provider</option>
                  <option value="Both">Both</option>
                </select>
              </div>
            </>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className="auth-button">
            {isLoginMode ? 'Login' : 'Sign Up'}
          </button>
        </form>
        
        <div className="auth-toggle">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}
          <button className="toggle-button" onClick={toggleMode}>
            {isLoginMode ? 'Sign Up' : 'Login'}
          </button>
        </div>
        
        <div className="auth-footer">
          <p>© {new Date().getFullYear()} Dalal Streets</p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
