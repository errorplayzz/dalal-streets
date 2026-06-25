import { useState } from 'react';
import './ClientComponents.css';

export const Complaints = ({ user }) => {
  const [activeTab, setActiveTab] = useState('new');
  const [complaint, setComplaint] = useState({
    type: '',
    subject: '',
    description: '',
    urgency: 'medium',
    attachments: null
  });
  
  // Mock complaints data - in a real app, this would come from a database
  const mockComplaints = [
    {
      id: 'COMP1001',
      date: '2025-03-15',
      subject: 'Water heater not working',
      description: 'The water heater in my bathroom has stopped working. There is no hot water for the past two days.',
      type: 'Maintenance',
      urgency: 'High',
      status: 'In Progress',
      response: 'We have assigned a technician to check the water heater. They will visit your PG tomorrow between 10 AM and 12 PM.'
    },
    {
      id: 'COMP1000',
      date: '2025-03-10',
      subject: 'WiFi connectivity issues',
      description: 'The WiFi connection has been very slow and keeps disconnecting in the evenings.',
      type: 'Internet',
      urgency: 'Medium',
      status: 'Resolved',
      response: 'Our technician has reset the router and upgraded the bandwidth. Please let us know if you still face any issues.'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComplaint(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setComplaint(prev => ({
      ...prev,
      attachments: e.target.files
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!complaint.type || !complaint.subject || !complaint.description) {
      alert('Please fill in all required fields');
      return;
    }
    
    // In a real app, this would submit to a backend API
    alert('Complaint submitted successfully. In a real app, this would be sent to the system administrators.');
    
    // Reset form after submission
    setComplaint({
      type: '',
      subject: '',
      description: '',
      urgency: 'medium',
      attachments: null
    });
  };

  const renderNewComplaintTab = () => (
    <div className="new-complaint-tab">
      <h3>Submit a New Complaint or Feedback</h3>
      
      <form className="complaint-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="type">Complaint Type</label>
          <select
            id="type"
            name="type"
            value={complaint.type}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Cleanliness">Cleanliness</option>
            <option value="Security">Security</option>
            <option value="Internet">Internet/WiFi</option>
            <option value="Food">Food</option>
            <option value="Behavior">Staff Behavior</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={complaint.subject}
            onChange={handleInputChange}
            placeholder="Brief subject of your complaint"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={complaint.description}
            onChange={handleInputChange}
            placeholder="Describe your issue in detail"
            rows={5}
            required
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="urgency">Urgency Level</label>
          <select
            id="urgency"
            name="urgency"
            value={complaint.urgency}
            onChange={handleInputChange}
          >
            <option value="low">Low - Can be addressed in a week</option>
            <option value="medium">Medium - Needs attention in 2-3 days</option>
            <option value="high">High - Requires immediate attention</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="attachments">Attachments (Optional)</label>
          <input
            type="file"
            id="attachments"
            name="attachments"
            onChange={handleFileChange}
            multiple
          />
          <small>Upload photos or documents related to your complaint (max 5MB each)</small>
        </div>
        
        <button type="submit" className="submit-complaint-button">
          Submit Complaint
        </button>
      </form>
    </div>
  );
  
  const renderComplaintHistoryTab = () => (
    <div className="complaint-history-tab">
      <h3>Your Complaint History</h3>
      
      {mockComplaints.length > 0 ? (
        <div className="complaints-list">
          {mockComplaints.map(item => (
            <div className="complaint-card" key={item.id}>
              <div className="complaint-header">
                <span className="complaint-id">{item.id}</span>
                <span className={`complaint-status ${item.status.toLowerCase().replace(' ', '-')}`}>
                  {item.status}
                </span>
              </div>
              
              <div className="complaint-content">
                <h4>{item.subject}</h4>
                <p className="complaint-meta">
                  <span className="complaint-type">{item.type}</span>
                  <span className="complaint-date">
                    {new Date(item.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                  <span className={`complaint-urgency ${item.urgency.toLowerCase()}`}>
                    {item.urgency} Priority
                  </span>
                </p>
                <p className="complaint-description">{item.description}</p>
                
                {item.response && (
                  <div className="complaint-response">
                    <h5>Response from Management:</h5>
                    <p>{item.response}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-complaints">
          <p>You haven't submitted any complaints yet.</p>
        </div>
      )}
    </div>
  );

  return (
    <div className="complaints-container">
      <div className="complaints-tabs">
        <button
          className={activeTab === 'new' ? 'active' : ''}
          onClick={() => setActiveTab('new')}
        >
          New Complaint
        </button>
        <button
          className={activeTab === 'history' ? 'active' : ''}
          onClick={() => setActiveTab('history')}
        >
          Complaint History
        </button>
      </div>
      
      <div className="complaints-content">
        {activeTab === 'new' ? renderNewComplaintTab() : renderComplaintHistoryTab()}
      </div>
    </div>
  );
};
