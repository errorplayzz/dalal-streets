import { useState } from 'react';
import './ClientComponents.css';

export const AdditionalServices = () => {
  const [serviceCategory, setServiceCategory] = useState('all');
  
  // Mock services data - in a real app, this would come from a database
  const mockServices = [
    {
      id: 1,
      name: 'Emergency Locksmith',
      category: 'household',
      price: 500,
      rating: 4.5,
      description: 'Locked out? Our emergency locksmith service is available 24/7 to help you gain access to your room.',
      image: 'https://via.placeholder.com/150?text=Locksmith',
      contactNumber: '+91 98765 43210'
    },
    {
      id: 2,
      name: 'Plumbing Services',
      category: 'household',
      price: 400,
      rating: 4.2,
      description: 'Fix leaking taps, clogged drains, and other plumbing issues in your accommodation.',
      image: 'https://via.placeholder.com/150?text=Plumbing',
      contactNumber: '+91 98765 43211'
    },
    {
      id: 3,
      name: 'Electrical Repairs',
      category: 'household',
      price: 450,
      rating: 4.3,
      description: 'Professional electricians to fix power issues, install fixtures, and ensure electrical safety.',
      image: 'https://via.placeholder.com/150?text=Electrical',
      contactNumber: '+91 98765 43212'
    },
    {
      id: 4,
      name: 'Home Cleaning',
      category: 'household',
      price: 600,
      rating: 4.1,
      description: 'Professional cleaning services for your room or apartment. Deep cleaning available on request.',
      image: 'https://via.placeholder.com/150?text=Cleaning',
      contactNumber: '+91 98765 43213'
    },
    {
      id: 5,
      name: 'Math Tutoring',
      category: 'education',
      price: 800,
      rating: 4.7,
      description: 'Expert math tutors for all levels from basic to advanced college mathematics.',
      image: 'https://via.placeholder.com/150?text=Math',
      contactNumber: '+91 98765 43214'
    },
    {
      id: 6,
      name: 'Language Classes',
      category: 'education',
      price: 750,
      rating: 4.6,
      description: 'Learn English, Hindi, French, German, and more with experienced language instructors.',
      image: 'https://via.placeholder.com/150?text=Language',
      contactNumber: '+91 98765 43215'
    },
    {
      id: 7,
      name: 'Laundry & Dry Cleaning',
      category: 'convenience',
      price: 300,
      rating: 4.4,
      description: 'Door pickup and delivery for all your laundry and dry cleaning needs.',
      image: 'https://via.placeholder.com/150?text=Laundry',
      contactNumber: '+91 98765 43216'
    },
    {
      id: 8,
      name: 'Food Delivery',
      category: 'convenience',
      price: 50,
      rating: 4.0,
      description: 'Special meals delivered to your doorstep. Discounted meal plans available.',
      image: 'https://via.placeholder.com/150?text=Food',
      contactNumber: '+91 98765 43217'
    },
    {
      id: 9,
      name: 'WiFi Installation',
      category: 'technology',
      price: 1000,
      rating: 4.8,
      description: 'High-speed WiFi setup and monthly plans for your personal use.',
      image: 'https://via.placeholder.com/150?text=WiFi',
      contactNumber: '+91 98765 43218'
    },
    {
      id: 10,
      name: 'Computer Repair',
      category: 'technology',
      price: 800,
      rating: 4.5,
      description: 'Fix laptop/desktop issues, system upgrades, and software installations.',
      image: 'https://via.placeholder.com/150?text=Computer',
      contactNumber: '+91 98765 43219'
    }
  ];

  const filteredServices = serviceCategory === 'all' 
    ? mockServices 
    : mockServices.filter(service => service.category === serviceCategory);

  const handleBookService = (serviceId) => {
    alert(`Service booking initiated for ID: ${serviceId}. In a real app, this would open a booking form.`);
  };

  return (
    <div className="additional-services-container">
      <div className="services-header">
        <h2>Additional Services</h2>
        <p>Find and book services to make your stay comfortable</p>
        
        <div className="service-categories">
          <button 
            className={serviceCategory === 'all' ? 'active' : ''}
            onClick={() => setServiceCategory('all')}
          >
            All Services
          </button>
          <button 
            className={serviceCategory === 'household' ? 'active' : ''}
            onClick={() => setServiceCategory('household')}
          >
            Household
          </button>
          <button 
            className={serviceCategory === 'education' ? 'active' : ''}
            onClick={() => setServiceCategory('education')}
          >
            Education
          </button>
          <button 
            className={serviceCategory === 'convenience' ? 'active' : ''}
            onClick={() => setServiceCategory('convenience')}
          >
            Convenience
          </button>
          <button 
            className={serviceCategory === 'technology' ? 'active' : ''}
            onClick={() => setServiceCategory('technology')}
          >
            Technology
          </button>
        </div>
      </div>
      
      <div className="services-grid">
        {filteredServices.map(service => (
          <div className="service-card" key={service.id}>
            <div className="service-image">
              <img src={service.image} alt={service.name} />
            </div>
            <div className="service-content">
              <div className="service-rating">
                <span>★ {service.rating}</span>
              </div>
              <h3>{service.name}</h3>
              <p className="service-description">{service.description}</p>
              <p className="service-price">Starting from ₹{service.price}</p>
              <p className="service-contact">Contact: {service.contactNumber}</p>
              <button 
                className="book-service-button"
                onClick={() => handleBookService(service.id)}
              >
                Book Service
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredServices.length === 0 && (
        <div className="no-services">
          <p>No services found in this category.</p>
        </div>
      )}
    </div>
  );
};
