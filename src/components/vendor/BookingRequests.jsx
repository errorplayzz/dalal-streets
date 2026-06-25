import { useState, useEffect } from 'react';
import './VendorComponents.css';

export const BookingRequests = ({ user }) => {
  const [bookingRequests, setBookingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showRequestDetails, setShowRequestDetails] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  
  // Mock data - in a real app, this would come from a database
  const mockBookingRequests = [
    {
      id: 1,
      clientName: 'Amit Kumar',
      clientPhone: '9876543210',
      clientEmail: 'amit.k@example.com',
      propertyId: 1,
      propertyName: 'Comfort PG for Men',
      roomNumber: '101',
      roomType: 'single',
      requestDate: '2023-05-15',
      moveInDate: '2023-06-01',
      status: 'pending',
      message: 'I am a software engineer working at ABC company and looking for a place closer to my office. I need the accommodation for at least 6 months.',
      depositAmount: 24000,
      rentAmount: 12000
    },
    {
      id: 2,
      clientName: 'Priya Singh',
      clientPhone: '8765432109',
      clientEmail: 'priya.s@example.com',
      propertyId: 2,
      propertyName: 'Luxury Living Spaces',
      roomNumber: '202',
      roomType: 'single',
      requestDate: '2023-05-12',
      moveInDate: '2023-05-25',
      status: 'approved',
      message: 'I am a student at XYZ University and need accommodation for the coming semester. I prefer a quiet environment for studying.',
      depositAmount: 36000,
      rentAmount: 18000
    },
    {
      id: 3,
      clientName: 'Rahul Sharma',
      clientPhone: '7654321098',
      clientEmail: 'rahul.s@example.com',
      propertyId: 1,
      propertyName: 'Comfort PG for Men',
      roomNumber: '103',
      roomType: 'shared',
      requestDate: '2023-05-10',
      moveInDate: '2023-06-01',
      status: 'rejected',
      message: 'Looking for affordable accommodation. I work in shifts so I might come late some days.',
      depositAmount: 16000,
      rentAmount: 8000,
      rejectionReason: 'Room already booked by another tenant'
    },
    {
      id: 4,
      clientName: 'Neha Patel',
      clientPhone: '6543210987',
      clientEmail: 'neha.p@example.com',
      propertyId: 2,
      propertyName: 'Luxury Living Spaces',
      roomNumber: '203',
      roomType: 'shared',
      requestDate: '2023-05-14',
      moveInDate: '2023-05-30',
      status: 'pending',
      message: 'I need a place for 3 months as I am doing an internship in the city. I prefer a roommate who is also a working professional.',
      depositAmount: 24000,
      rentAmount: 12000
    }
  ];

  const mockProperties = [
    { id: 1, name: 'Comfort PG for Men' },
    { id: 2, name: 'Luxury Living Spaces' }
  ];

  useEffect(() => {
    // Simulate API call to fetch booking requests and properties
    setTimeout(() => {
      setBookingRequests(mockBookingRequests);
      setProperties(mockProperties);
      setLoading(false);
    }, 1000);
  }, []);

  const handlePropertyChange = (e) => {
    setSelectedProperty(e.target.value);
  };

  const handleStatusChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setShowRequestDetails(true);
  };

  const handleApproveRequest = (requestId) => {
    // In a real app, this would send data to an API
    setBookingRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: 'approved' } 
          : request
      )
    );
    
    if (selectedRequest && selectedRequest.id === requestId) {
      setSelectedRequest(prev => ({ ...prev, status: 'approved' }));
    }
  };

  const handleRejectRequest = (requestId, reason = 'Request rejected by vendor') => {
    // In a real app, this would send data to an API
    setBookingRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: 'rejected', rejectionReason: reason } 
          : request
      )
    );
    
    if (selectedRequest && selectedRequest.id === requestId) {
      setSelectedRequest(prev => ({ ...prev, status: 'rejected', rejectionReason: reason }));
    }
  };

  const filteredRequests = bookingRequests.filter(request => {
    // Filter by property
    if (selectedProperty !== 'all' && request.propertyId !== parseInt(selectedProperty)) {
      return false;
    }
    
    // Filter by status
    if (filterStatus !== 'all' && request.status !== filterStatus) {
      return false;
    }
    
    return true;
  });

  const renderRequestDetails = () => (
    <div className="request-details-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Booking Request Details</h3>
          <button className="close-button" onClick={() => {
            setShowRequestDetails(false);
            setSelectedRequest(null);
          }}>
            &times;
          </button>
        </div>
        
        <div className="request-details">
          <div className="detail-group">
            <h4>Client Information</h4>
            <p><strong>Name:</strong> {selectedRequest.clientName}</p>
            <p><strong>Email:</strong> {selectedRequest.clientEmail}</p>
            <p><strong>Phone:</strong> {selectedRequest.clientPhone}</p>
          </div>
          
          <div className="detail-group">
            <h4>Property Information</h4>
            <p><strong>Property:</strong> {selectedRequest.propertyName}</p>
            <p><strong>Room Number:</strong> {selectedRequest.roomNumber}</p>
            <p><strong>Room Type:</strong> {
              selectedRequest.roomType === 'single' ? 'Single Room' : 
              selectedRequest.roomType === 'shared' ? 'Shared Room' : 'Deluxe Room'
            }</p>
          </div>
          
          <div className="detail-group">
            <h4>Booking Information</h4>
            <p><strong>Request Date:</strong> {selectedRequest.requestDate}</p>
            <p><strong>Move-in Date:</strong> {selectedRequest.moveInDate}</p>
            <p><strong>Monthly Rent:</strong> ₹{selectedRequest.rentAmount.toLocaleString('en-IN')}</p>
            <p><strong>Security Deposit:</strong> ₹{selectedRequest.depositAmount.toLocaleString('en-IN')}</p>
            <p><strong>Status:</strong> <span className={`status-${selectedRequest.status}`}>
              {selectedRequest.status === 'pending' ? 'Pending' : 
               selectedRequest.status === 'approved' ? 'Approved' : 'Rejected'}
            </span></p>
            {selectedRequest.rejectionReason && (
              <p><strong>Rejection Reason:</strong> {selectedRequest.rejectionReason}</p>
            )}
          </div>
          
          <div className="detail-group">
            <h4>Client Message</h4>
            <p className="client-message">{selectedRequest.message}</p>
          </div>
        </div>
        
        <div className="modal-actions">
          <button 
            className="close-button"
            onClick={() => {
              setShowRequestDetails(false);
              setSelectedRequest(null);
            }}
          >
            Close
          </button>
          
          {selectedRequest.status === 'pending' && (
            <>
              <button 
                className="reject-button"
                onClick={() => {
                  const reason = prompt('Please provide a reason for rejection (optional):', '');
                  handleRejectRequest(selectedRequest.id, reason || 'Request rejected by vendor');
                }}
              >
                Reject
              </button>
              <button 
                className="approve-button"
                onClick={() => handleApproveRequest(selectedRequest.id)}
              >
                Approve
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <div className="loading-message">Loading booking requests...</div>;
  }

  return (
    <div className="booking-requests-container">
      <h2>Booking Requests</h2>
      
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
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>
      
      {filteredRequests.length > 0 ? (
        <div className="requests-table-container">
          <table className="requests-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Property</th>
                <th>Room</th>
                <th>Request Date</th>
                <th>Move-in Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map(request => (
                <tr key={request.id} className={`status-row-${request.status}`}>
                  <td>
                    <div className="client-info">
                      <span className="client-name">{request.clientName}</span>
                      <span className="client-contact">{request.clientEmail}</span>
                    </div>
                  </td>
                  <td>{request.propertyName}</td>
                  <td>{request.roomNumber} ({
                    request.roomType === 'single' ? 'Single' : 
                    request.roomType === 'shared' ? 'Shared' : 'Deluxe'
                  })</td>
                  <td>{request.requestDate}</td>
                  <td>{request.moveInDate}</td>
                  <td className={`status-${request.status}`}>
                    {request.status === 'pending' ? 'Pending' : 
                     request.status === 'approved' ? 'Approved' : 'Rejected'}
                  </td>
                  <td className="request-actions">
                    <button 
                      className="view-details-button"
                      onClick={() => handleViewRequest(request)}
                    >
                      View Details
                    </button>
                    
                    {request.status === 'pending' && (
                      <>
                        <button 
                          className="approve-button"
                          onClick={() => handleApproveRequest(request.id)}
                        >
                          Approve
                        </button>
                        <button 
                          className="reject-button"
                          onClick={() => {
                            const reason = prompt('Please provide a reason for rejection (optional):', '');
                            handleRejectRequest(request.id, reason || 'Request rejected by vendor');
                          }}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="no-requests">
          <p>No booking requests found matching your filters.</p>
        </div>
      )}
      
      {showRequestDetails && selectedRequest && renderRequestDetails()}
    </div>
  );
};
