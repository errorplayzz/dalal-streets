import { useState, useEffect } from 'react';
import './VendorComponents.css';

export const TrackTenants = ({ user }) => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showPaymentHistory, setShowPaymentHistory] = useState(false);
  const [selectedTenant, setSelectedTenant] = useState(null);
  
  // Mock data - in a real app, this would come from a database
  const mockTenants = [
    {
      id: 1,
      name: 'John Doe',
      phone: '9876543210',
      email: 'john.doe@example.com',
      propertyId: 1,
      propertyName: 'Comfort PG for Men',
      roomNumber: '101',
      joinDate: '2023-01-15',
      rentAmount: 12000,
      securityDeposit: 24000,
      status: 'active',
      dueDate: 10, // day of month
      paymentHistory: [
        { id: 1, month: 'March 2023', amount: 12000, date: '2023-03-08', status: 'paid' },
        { id: 2, month: 'April 2023', amount: 12000, date: '2023-04-09', status: 'paid' },
        { id: 3, month: 'May 2023', amount: 12000, date: '2023-05-12', status: 'paid', lateBy: 2 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      phone: '8765432109',
      email: 'jane.smith@example.com',
      propertyId: 1,
      propertyName: 'Comfort PG for Men',
      roomNumber: '102',
      joinDate: '2023-02-01',
      rentAmount: 12000,
      securityDeposit: 24000,
      status: 'active',
      dueDate: 5, // day of month
      paymentHistory: [
        { id: 1, month: 'March 2023', amount: 12000, date: '2023-03-04', status: 'paid' },
        { id: 2, month: 'April 2023', amount: 12000, date: '2023-04-06', status: 'paid', lateBy: 1 },
        { id: 3, month: 'May 2023', amount: 12000, status: 'pending' }
      ]
    },
    {
      id: 3,
      name: 'Robert Johnson',
      phone: '7654321098',
      email: 'robert.j@example.com',
      propertyId: 2,
      propertyName: 'Luxury Living Spaces',
      roomNumber: '201',
      joinDate: '2023-03-10',
      rentAmount: 18000,
      securityDeposit: 36000,
      status: 'active',
      dueDate: 10, // day of month
      paymentHistory: [
        { id: 1, month: 'April 2023', amount: 18000, date: '2023-04-08', status: 'paid' },
        { id: 2, month: 'May 2023', amount: 18000, date: '2023-05-09', status: 'paid' }
      ]
    },
    {
      id: 4,
      name: 'Michael Brown',
      phone: '6543210987',
      email: 'michael.b@example.com',
      propertyId: 2,
      propertyName: 'Luxury Living Spaces',
      roomNumber: '203',
      joinDate: '2023-01-05',
      rentAmount: 12000,
      securityDeposit: 24000,
      status: 'inactive',
      leaveDate: '2023-04-30',
      dueDate: 5, // day of month
      paymentHistory: [
        { id: 1, month: 'February 2023', amount: 12000, date: '2023-02-04', status: 'paid' },
        { id: 2, month: 'March 2023', amount: 12000, date: '2023-03-03', status: 'paid' },
        { id: 3, month: 'April 2023', amount: 12000, date: '2023-04-06', status: 'paid', lateBy: 1 }
      ]
    }
  ];

  const mockProperties = [
    { id: 1, name: 'Comfort PG for Men' },
    { id: 2, name: 'Luxury Living Spaces' }
  ];

  useEffect(() => {
    // Simulate API call to fetch tenants and properties
    setTimeout(() => {
      setTenants(mockTenants);
      setProperties(mockProperties);
      setLoading(false);
    }, 1000);
  }, []);

  const handlePropertyChange = (e) => {
    setSelectedProperty(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleViewPaymentHistory = (tenant) => {
    setSelectedTenant(tenant);
    setShowPaymentHistory(true);
  };

  const filteredTenants = tenants.filter(tenant => {
    // Filter by property
    if (selectedProperty !== 'all' && tenant.propertyId !== parseInt(selectedProperty)) {
      return false;
    }
    
    // Filter by status
    if (filterStatus !== 'all' && tenant.status !== filterStatus) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !tenant.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const renderPaymentHistory = () => (
    <div className="payment-history-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Payment History - {selectedTenant.name}</h3>
          <button className="close-button" onClick={() => {
            setShowPaymentHistory(false);
            setSelectedTenant(null);
          }}>
            &times;
          </button>
        </div>
        
        <div className="tenant-details">
          <p><strong>Room:</strong> {selectedTenant.roomNumber} ({selectedTenant.propertyName})</p>
          <p><strong>Monthly Rent:</strong> ₹{selectedTenant.rentAmount.toLocaleString('en-IN')}</p>
          <p><strong>Due Date:</strong> {selectedTenant.dueDate}th of every month</p>
        </div>
        
        <div className="payment-history-table-container">
          {selectedTenant.paymentHistory.length > 0 ? (
            <table className="payment-history-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                {selectedTenant.paymentHistory.map(payment => (
                  <tr key={payment.id} className={payment.status}>
                    <td>{payment.month}</td>
                    <td>₹{payment.amount.toLocaleString('en-IN')}</td>
                    <td>{payment.date || '-'}</td>
                    <td className={`status-${payment.status}`}>
                      {payment.status === 'paid' ? 'Paid' : 'Pending'}
                    </td>
                    <td>
                      {payment.lateBy ? `Late by ${payment.lateBy} day${payment.lateBy > 1 ? 's' : ''}` : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-history">No payment history available.</p>
          )}
        </div>
        
        <div className="modal-actions">
          <button 
            className="close-button"
            onClick={() => {
              setShowPaymentHistory(false);
              setSelectedTenant(null);
            }}
          >
            Close
          </button>
          <button className="print-button">
            Print Receipt
          </button>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <div className="loading-message">Loading tenants data...</div>;
  }

  return (
    <div className="track-tenants-container">
      <h2>Track Tenants & Payments</h2>
      
      <div className="filter-controls">
        <div className="filter-group">
          <label htmlFor="property-filter">Property:</label>
          <select 
            id="property-filter"
            value={selectedProperty}
            onChange={handlePropertyChange}
          >
            <option value="all">All Properties</option>
            {properties.map(property => (
              <option key={property.id} value={property.id}>
                {property.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="status-filter">Status:</label>
          <select 
            id="status-filter"
            value={filterStatus}
            onChange={handleStatusChange}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        
        <div className="filter-group search">
          <input
            type="text"
            placeholder="Search by name, email, or room"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      
      {filteredTenants.length > 0 ? (
        <div className="tenants-table-container">
          <table className="tenants-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Property</th>
                <th>Room</th>
                <th>Join Date</th>
                <th>Rent Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map(tenant => (
                <tr key={tenant.id} className={tenant.status === 'inactive' ? 'inactive-row' : ''}>
                  <td>
                    <div className="tenant-info">
                      <span className="tenant-name">{tenant.name}</span>
                      <span className="tenant-contact">{tenant.email}</span>
                    </div>
                  </td>
                  <td>{tenant.propertyName}</td>
                  <td>{tenant.roomNumber}</td>
                  <td>{tenant.joinDate}</td>
                  <td>₹{tenant.rentAmount.toLocaleString('en-IN')}</td>
                  <td className={`status-${tenant.status}`}>
                    {tenant.status === 'active' ? 'Active' : 'Inactive'}
                    {tenant.leaveDate && <span className="leave-date">Left: {tenant.leaveDate}</span>}
                  </td>
                  <td className="tenant-actions">
                    <button 
                      className="view-history-button"
                      onClick={() => handleViewPaymentHistory(tenant)}
                    >
                      Payment History
                    </button>
                    <button className="contact-button">
                      Contact
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-tenants">
          <p>No tenants found matching your filters.</p>
        </div>
      )}
      
      {showPaymentHistory && selectedTenant && renderPaymentHistory()}
    </div>
  );
};
