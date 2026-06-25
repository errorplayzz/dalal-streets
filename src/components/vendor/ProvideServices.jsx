import { useState, useEffect } from 'react';
import './VendorComponents.css';

export const ProvideServices = ({ user }) => {
  const [servicesOffered, setServicesOffered] = useState([]);
  const [serviceRequests, setServiceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('myServices');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showRequestDetails, setShowRequestDetails] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [editingServiceId, setEditingServiceId] = useState(null);
  
  const [serviceForm, setServiceForm] = useState({
    name: '',
    category: '',
    description: '',
    pricing: '',
    availability: 'weekdays',
    areas: []
  });
  
  // Mock data - in a real app, this would come from a database
  const mockServicesOffered = [
    {
      id: 1,
      name: 'Lock & Key Services',
      category: 'maintenance',
      description: 'Professional locksmith services including key making, lock repair, and emergency lockout assistance.',
      pricing: 'Starting from ₹500 per service',
      availability: 'everyday',
      areas: ['Koramangala', 'HSR Layout', 'Indiranagar'],
      isActive: true
    },
    {
      id: 2,
      name: 'Home Cleaning',
      category: 'cleaning',
      description: 'Comprehensive home cleaning services including deep cleaning, regular maintenance, and specialized cleaning.',
      pricing: '₹1500 for one-time cleaning, ₹4000 for monthly subscription',
      availability: 'weekdays',
      areas: ['Koramangala', 'HSR Layout', 'Whitefield'],
      isActive: true
    },
    {
      id: 3,
      name: 'Math Tutoring',
      category: 'education',
      description: 'One-on-one math tutoring for students from grade 8 to 12, covering all major boards and competitive exams.',
      pricing: '₹800 per hour',
      availability: 'weekends',
      areas: ['Online', 'Indiranagar', 'Koramangala'],
      isActive: false
    }
  ];

  const mockServiceRequests = [
    {
      id: 1,
      clientName: 'Vikram Malhotra',
      clientPhone: '9876543210',
      clientEmail: 'vikram.m@example.com',
      serviceId: 1,
      serviceName: 'Lock & Key Services',
      requestDate: '2023-05-15',
      requiredDate: '2023-05-16',
      requiredTime: '10:00 AM',
      status: 'pending',
      address: '123, ABC Apartments, Koramangala, Bangalore',
      message: 'Need to change the lock on my main door. The old one is jammed.',
      estimatedPrice: 800
    },
    {
      id: 2,
      clientName: 'Anjali Desai',
      clientPhone: '8765432109',
      clientEmail: 'anjali.d@example.com',
      serviceId: 2,
      serviceName: 'Home Cleaning',
      requestDate: '2023-05-14',
      requiredDate: '2023-05-20',
      requiredTime: '09:00 AM',
      status: 'accepted',
      address: '456, XYZ Housing, HSR Layout, Bangalore',
      message: 'Need a deep cleaning of my 2BHK apartment.',
      estimatedPrice: 1500
    },
    {
      id: 3,
      clientName: 'Rohan Singhania',
      clientPhone: '7654321098',
      clientEmail: 'rohan.s@example.com',
      serviceId: 1,
      serviceName: 'Lock & Key Services',
      requestDate: '2023-05-13',
      requiredDate: '2023-05-14',
      requiredTime: '06:00 PM',
      status: 'completed',
      address: '789, PQR Residency, Indiranagar, Bangalore',
      message: 'Lost my keys and need a duplicate made.',
      estimatedPrice: 600,
      feedback: {
        rating: 4.5,
        comment: 'Great service, arrived on time and was very professional.'
      }
    },
    {
      id: 4,
      clientName: 'Sneha Kapoor',
      clientPhone: '6543210987',
      clientEmail: 'sneha.k@example.com',
      serviceId: 3,
      serviceName: 'Math Tutoring',
      requestDate: '2023-05-15',
      requiredDate: '2023-05-21',
      requiredTime: '11:00 AM',
      status: 'rejected',
      address: 'Online',
      message: 'Need help with calculus for my upcoming engineering entrance exam.',
      estimatedPrice: 800,
      rejectionReason: 'The service is currently not active.'
    }
  ];

  const serviceCategories = [
    { value: 'maintenance', label: 'Maintenance & Repair' },
    { value: 'cleaning', label: 'Cleaning Services' },
    { value: 'education', label: 'Education & Tutoring' },
    { value: 'food', label: 'Food & Catering' },
    { value: 'technology', label: 'Technology Support' },
    { value: 'moving', label: 'Moving & Transportation' },
    { value: 'personal', label: 'Personal Care' },
    { value: 'other', label: 'Other Services' }
  ];

  const availabilityOptions = [
    { value: 'weekdays', label: 'Weekdays Only' },
    { value: 'weekends', label: 'Weekends Only' },
    { value: 'everyday', label: 'All Days' },
    { value: 'custom', label: 'Custom Schedule' }
  ];

  const areaOptions = [
    'Koramangala', 'HSR Layout', 'Indiranagar', 'Whitefield', 
    'Marathahalli', 'Electronic City', 'Jayanagar', 'JP Nagar',
    'Bannerghatta Road', 'BTM Layout', 'Online'
  ];

  useEffect(() => {
    // Simulate API call to fetch services and requests
    setTimeout(() => {
      setServicesOffered(mockServicesOffered);
      setServiceRequests(mockServiceRequests);
      setLoading(false);
    }, 1000);
  }, []);

  const handleServiceInputChange = (e) => {
    const { name, value } = e.target;
    setServiceForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAreaToggle = (area) => {
    setServiceForm(prev => {
      const currentAreas = [...prev.areas];
      
      if (currentAreas.includes(area)) {
        return {
          ...prev,
          areas: currentAreas.filter(a => a !== area)
        };
      } else {
        return {
          ...prev,
          areas: [...currentAreas, area]
        };
      }
    });
  };

  const handleAddService = (e) => {
    e.preventDefault();
    
    // In a real app, this would send data to an API
    const newService = {
      id: servicesOffered.length + 1,
      ...serviceForm,
      isActive: true
    };
    
    setServicesOffered(prev => [...prev, newService]);
    setServiceForm({
      name: '',
      category: '',
      description: '',
      pricing: '',
      availability: 'weekdays',
      areas: []
    });
    setShowAddForm(false);
  };

  const handleEditService = (serviceId) => {
    const service = servicesOffered.find(s => s.id === serviceId);
    if (service) {
      setServiceForm({
        name: service.name,
        category: service.category,
        description: service.description,
        pricing: service.pricing,
        availability: service.availability,
        areas: [...service.areas]
      });
      setEditingServiceId(serviceId);
      setShowAddForm(true);
    }
  };

  const handleUpdateService = (e) => {
    e.preventDefault();
    
    // In a real app, this would update data via an API
    setServicesOffered(prev => 
      prev.map(service => 
        service.id === editingServiceId 
          ? { ...service, ...serviceForm } 
          : service
      )
    );
    
    setServiceForm({
      name: '',
      category: '',
      description: '',
      pricing: '',
      availability: 'weekdays',
      areas: []
    });
    setEditingServiceId(null);
    setShowAddForm(false);
  };

  const handleToggleServiceActive = (serviceId) => {
    // In a real app, this would update data via an API
    setServicesOffered(prev => 
      prev.map(service => 
        service.id === serviceId 
          ? { ...service, isActive: !service.isActive } 
          : service
      )
    );
  };

  const handleDeleteService = (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
      // In a real app, this would delete via an API
      setServicesOffered(prev => prev.filter(service => service.id !== serviceId));
    }
  };

  const handleViewRequest = (request) => {
    setSelectedRequest(request);
    setShowRequestDetails(true);
  };

  const handleAcceptRequest = (requestId) => {
    // In a real app, this would send data to an API
    setServiceRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: 'accepted' } 
          : request
      )
    );
    
    if (selectedRequest && selectedRequest.id === requestId) {
      setSelectedRequest(prev => ({ ...prev, status: 'accepted' }));
    }
  };

  const handleCompleteRequest = (requestId) => {
    // In a real app, this would send data to an API
    setServiceRequests(prev => 
      prev.map(request => 
        request.id === requestId 
          ? { ...request, status: 'completed' } 
          : request
      )
    );
    
    if (selectedRequest && selectedRequest.id === requestId) {
      setSelectedRequest(prev => ({ ...prev, status: 'completed' }));
    }
  };

  const handleRejectRequest = (requestId, reason = 'Request rejected by vendor') => {
    // In a real app, this would send data to an API
    setServiceRequests(prev => 
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

  const renderServiceForm = () => (
    <div className="service-form-container">
      <h3>{editingServiceId ? 'Edit Service' : 'Add New Service'}</h3>
      <form className="service-form" onSubmit={editingServiceId ? handleUpdateService : handleAddService}>
        <div className="form-group">
          <label htmlFor="name">Service Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={serviceForm.name}
            onChange={handleServiceInputChange}
            placeholder="Enter service name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={serviceForm.category}
            onChange={handleServiceInputChange}
            required
          >
            <option value="">Select a category</option>
            {serviceCategories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={serviceForm.description}
            onChange={handleServiceInputChange}
            placeholder="Describe your service"
            rows={3}
            required
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="pricing">Pricing</label>
          <input
            type="text"
            id="pricing"
            name="pricing"
            value={serviceForm.pricing}
            onChange={handleServiceInputChange}
            placeholder="Enter pricing details"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="availability">Availability</label>
          <select
            id="availability"
            name="availability"
            value={serviceForm.availability}
            onChange={handleServiceInputChange}
            required
          >
            {availabilityOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Service Areas</label>
          <div className="areas-options">
            {areaOptions.map(area => (
              <label key={area} className="area-checkbox">
                <input
                  type="checkbox"
                  checked={serviceForm.areas.includes(area)}
                  onChange={() => handleAreaToggle(area)}
                />
                {area}
              </label>
            ))}
          </div>
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={() => {
            setShowAddForm(false);
            setEditingServiceId(null);
            setServiceForm({
              name: '',
              category: '',
              description: '',
              pricing: '',
              availability: 'weekdays',
              areas: []
            });
          }}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            {editingServiceId ? 'Update Service' : 'Add Service'}
          </button>
        </div>
      </form>
    </div>
  );

  const renderMyServices = () => (
    <div className="my-services-container">
      <div className="services-header">
        <h3>My Services</h3>
        <button 
          className="add-service-button"
          onClick={() => setShowAddForm(true)}
        >
          Add New Service
        </button>
      </div>
      
      {servicesOffered.length > 0 ? (
        <div className="services-list">
          {servicesOffered.map(service => (
            <div className={`service-card ${!service.isActive ? 'inactive' : ''}`} key={service.id}>
              <div className="service-header">
                <h4>{service.name}</h4>
                <div className="service-actions">
                  <button 
                    className={`toggle-status-button ${service.isActive ? 'deactivate' : 'activate'}`}
                    onClick={() => handleToggleServiceActive(service.id)}
                  >
                    {service.isActive ? 'Deactivate' : 'Activate'}
                  </button>
                  <button 
                    className="edit-button"
                    onClick={() => handleEditService(service.id)}
                  >
                    Edit
                  </button>
                  <button 
                    className="delete-button"
                    onClick={() => handleDeleteService(service.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              
              <div className="service-details">
                <p className="service-category">
                  <strong>Category:</strong> {
                    serviceCategories.find(c => c.value === service.category)?.label || service.category
                  }
                </p>
                <p className="service-description">{service.description}</p>
                <p className="service-pricing"><strong>Pricing:</strong> {service.pricing}</p>
                <p className="service-availability">
                  <strong>Available:</strong> {
                    availabilityOptions.find(o => o.value === service.availability)?.label || service.availability
                  }
                </p>
                
                <div className="service-areas">
                  <strong>Service Areas:</strong>
                  <div className="areas-list">
                    {service.areas.map(area => (
                      <span key={area} className="area-tag">{area}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-services">
          <p>You haven't added any services yet.</p>
          <p>Click the "Add New Service" button to get started.</p>
        </div>
      )}
    </div>
  );

  const renderRequestDetails = () => (
    <div className="request-details-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Service Request Details</h3>
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
            <h4>Service Information</h4>
            <p><strong>Service:</strong> {selectedRequest.serviceName}</p>
            <p><strong>Estimated Price:</strong> ₹{selectedRequest.estimatedPrice.toLocaleString('en-IN')}</p>
            <p><strong>Address:</strong> {selectedRequest.address}</p>
          </div>
          
          <div className="detail-group">
            <h4>Request Information</h4>
            <p><strong>Request Date:</strong> {selectedRequest.requestDate}</p>
            <p><strong>Required Date:</strong> {selectedRequest.requiredDate}</p>
            <p><strong>Required Time:</strong> {selectedRequest.requiredTime}</p>
            <p><strong>Status:</strong> <span className={`status-${selectedRequest.status}`}>
              {selectedRequest.status === 'pending' ? 'Pending' : 
               selectedRequest.status === 'accepted' ? 'Accepted' : 
               selectedRequest.status === 'completed' ? 'Completed' : 'Rejected'}
            </span></p>
            {selectedRequest.rejectionReason && (
              <p><strong>Rejection Reason:</strong> {selectedRequest.rejectionReason}</p>
            )}
            {selectedRequest.feedback && (
              <div className="feedback-info">
                <p><strong>Rating:</strong> {selectedRequest.feedback.rating}/5</p>
                <p><strong>Comment:</strong> "{selectedRequest.feedback.comment}"</p>
              </div>
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
                className="accept-button"
                onClick={() => handleAcceptRequest(selectedRequest.id)}
              >
                Accept
              </button>
            </>
          )}
          
          {selectedRequest.status === 'accepted' && (
            <button 
              className="complete-button"
              onClick={() => handleCompleteRequest(selectedRequest.id)}
            >
              Mark as Completed
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderServiceRequests = () => {
    const filteredRequests = serviceRequests.filter(request => {
      const service = servicesOffered.find(s => s.id === request.serviceId);
      return service && service.isActive;
    });
    
    return (
      <div className="service-requests-container">
        <h3>Service Requests</h3>
        
        {filteredRequests.length > 0 ? (
          <div className="requests-table-container">
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Required Date & Time</th>
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
                    <td>{request.serviceName}</td>
                    <td>
                      {request.requiredDate}<br/>
                      {request.requiredTime}
                    </td>
                    <td className={`status-${request.status}`}>
                      {request.status === 'pending' ? 'Pending' : 
                       request.status === 'accepted' ? 'Accepted' : 
                       request.status === 'completed' ? 'Completed' : 'Rejected'}
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
                            className="accept-button"
                            onClick={() => handleAcceptRequest(request.id)}
                          >
                            Accept
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
                      
                      {request.status === 'accepted' && (
                        <button 
                          className="complete-button"
                          onClick={() => handleCompleteRequest(request.id)}
                        >
                          Complete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-requests">
            <p>No service requests found.</p>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return <div className="loading-message">Loading services data...</div>;
  }

  if (showAddForm) {
    return renderServiceForm();
  }

  return (
    <div className="provide-services-container">
      <h2>Provide Services</h2>
      
      <div className="services-tabs">
        <button 
          className={activeTab === 'myServices' ? 'active' : ''}
          onClick={() => setActiveTab('myServices')}
        >
          My Services
        </button>
        <button 
          className={activeTab === 'requests' ? 'active' : ''}
          onClick={() => setActiveTab('requests')}
        >
          Service Requests
        </button>
      </div>
      
      <div className="tab-content">
        {activeTab === 'myServices' ? renderMyServices() : renderServiceRequests()}
      </div>
      
      {showRequestDetails && selectedRequest && renderRequestDetails()}
    </div>
  );
};
