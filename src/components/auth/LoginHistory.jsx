import React, { useState, useEffect } from 'react';
import './Auth.css';

const LoginHistory = ({ userId }) => {
  const [loginRecords, setLoginRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoginHistory = async () => {
      try {
        setLoading(true);
        // Fetch login history from the API
        const response = await fetch(`/api/auth/login-history?userId=${userId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch login history');
        }
        
        const data = await response.json();
        setLoginRecords(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching login history:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    if (userId) {
      fetchLoginHistory();
    }
  }, [userId]);

  // Format date for better readability
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div className="loading">Loading login history...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (loginRecords.length === 0) {
    return <div className="no-records">No login records found.</div>;
  }

  return (
    <div className="login-history-container">
      <h2>Login History</h2>
      <div className="login-records">
        <table>
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>IP Address</th>
              <th>Device/Browser</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loginRecords.map((record, index) => (
              <tr key={record.id || index} className={record.loginStatus === 'success' ? 'success' : 'failed'}>
                <td>{formatDate(record.timestamp)}</td>
                <td>{record.ipAddress}</td>
                <td>{record.userAgent}</td>
                <td>{record.loginStatus === 'success' ? 'Successful' : 'Failed'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoginHistory;
