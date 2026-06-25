import React, { useState, useEffect } from 'react';
import './AdminStyles.css';

const AdminLoginHistory = () => {
  const [loginRecords, setLoginRecords] = useState({
    successful: [],
    failed: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('successful');

  useEffect(() => {
    const fetchAllLoginRecords = async () => {
      try {
        setLoading(true);
        // Fetch all login records from the API
        const response = await fetch('/api/auth/all-login-records');
        
        if (!response.ok) {
          throw new Error('Failed to fetch login records');
        }
        
        const data = await response.json();
        setLoginRecords(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching login records:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchAllLoginRecords();
  }, []);

  // Format date for better readability
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div className="admin-loading">Loading login records...</div>;
  }

  if (error) {
    return <div className="admin-error">Error: {error}</div>;
  }

  return (
    <div className="admin-login-history-container">
      <h2>Login Records Dashboard</h2>
      
      <div className="admin-tabs">
        <button 
          className={`tab-button ${activeTab === 'successful' ? 'active' : ''}`}
          onClick={() => setActiveTab('successful')}
        >
          Successful Logins ({loginRecords.successful.length})
        </button>
        <button 
          className={`tab-button ${activeTab === 'failed' ? 'active' : ''}`}
          onClick={() => setActiveTab('failed')}
        >
          Failed Attempts ({loginRecords.failed.length})
        </button>
      </div>
      
      <div className="admin-records-table">
        {activeTab === 'successful' ? (
          <>
            <h3>Successful Logins</h3>
            {loginRecords.successful.length === 0 ? (
              <p>No successful login records found.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>User Email</th>
                    <th>IP Address</th>
                    <th>Location</th>
                    <th>Device/Browser</th>
                  </tr>
                </thead>
                <tbody>
                  {loginRecords.successful.map((record) => (
                    <tr key={record.id}>
                      <td>{formatDate(record.timestamp)}</td>
                      <td>{record.email}</td>
                      <td>{record.ipAddress}</td>
                      <td>{record.location || 'Unknown'}</td>
                      <td>{record.userAgent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        ) : (
          <>
            <h3>Failed Login Attempts</h3>
            {loginRecords.failed.length === 0 ? (
              <p>No failed login attempts found.</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Date & Time</th>
                    <th>Email</th>
                    <th>IP Address</th>
                    <th>Device/Browser</th>
                    <th>Error</th>
                  </tr>
                </thead>
                <tbody>
                  {loginRecords.failed.map((record) => (
                    <tr key={record.id}>
                      <td>{formatDate(record.timestamp)}</td>
                      <td>{record.email}</td>
                      <td>{record.ipAddress}</td>
                      <td>{record.userAgent}</td>
                      <td>{record.errorMessage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminLoginHistory;
