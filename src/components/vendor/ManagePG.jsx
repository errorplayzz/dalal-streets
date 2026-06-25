import { useState, useEffect } from 'react';
import './VendorComponents.css';

export const ManagePG = ({ user }) => {
  const [pgProperties, setPgProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPropertyId, setEditingPropertyId] = useState(null);
  const [showRoomForm, setShowRoomForm] = useState(false);
  const [currentProperty, setCurrentProperty] = useState(null);
  
  const [propertyForm, setPropertyForm] = useState({
    name: '',
    address: '',
    description: '',
    propertyType: 'men',
    amenities: []
  });
  
  const [roomForm, setRoomForm] = useState({
    roomNumber: '',
    roomType: 'single',
    price: '',
    availability: true,
    occupancy: 1
  });

  // Mock PG properties - in a real app, this would come from a database
  const mockProperties = [
    {
      id: 1,
      name: 'Comfort PG for Men',
      address: '123 Main St, Koramangala, Bangalore',
      description: 'A comfortable PG for working professionals and students',
      propertyType: 'men',
      amenities: ['WiFi', 'AC', 'Food', 'Laundry'],
      rooms: [
        { id: 101, roomNumber: '101', roomType: 'single', price: 12000, availability: true, occupancy: 1 },
        { id: 102, roomNumber: '102', roomType: 'single', price: 12000, availability: false, occupancy: 1 },
        { id: 103, roomNumber: '103', roomType: 'shared', price: 8000, availability: true, occupancy: 2 }
      ]
    },
    {
      id: 2,
      name: 'Luxury Living Spaces',
      address: '456 Park Ave, HSR Layout, Bangalore',
      description: 'Premium co-living spaces with modern amenities',
      propertyType: 'coliving',
      amenities: ['WiFi', 'AC', 'Food', 'Gym', 'Parking', 'Security'],
      rooms: [
        { id: 201, roomNumber: '201', roomType: 'single', price: 18000, availability: true, occupancy: 1 },
        { id: 202, roomNumber: '202', roomType: 'single', price: 18000, availability: true, occupancy: 1 },
        { id: 203, roomNumber: '203', roomType: 'shared', price: 12000, availability: false, occupancy: 2 }
      ]
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch properties
    setTimeout(() => {
      setPgProperties(mockProperties);
      setLoading(false);
    }, 1000);
  }, []);

  const handlePropertyInputChange = (e) => {
    const { name, value } = e.target;
    setPropertyForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRoomInputChange = (e) => {
    const { name, value } = e.target;
    setRoomForm(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : 
              name === 'availability' ? value === 'true' : 
              name === 'occupancy' ? parseInt(value) : value
    }));
  };

  const handleAmenityToggle = (amenity) => {
    setPropertyForm(prev => {
      const currentAmenities = [...prev.amenities];
      
      if (currentAmenities.includes(amenity)) {
        return {
          ...prev,
          amenities: currentAmenities.filter(a => a !== amenity)
        };
      } else {
        return {
          ...prev,
          amenities: [...currentAmenities, amenity]
        };
      }
    });
  };

  const handleAddProperty = (e) => {
    e.preventDefault();
    
    // In a real app, this would send data to an API
    const newProperty = {
      id: pgProperties.length + 1,
      ...propertyForm,
      rooms: []
    };
    
    setPgProperties(prev => [...prev, newProperty]);
    setPropertyForm({
      name: '',
      address: '',
      description: '',
      propertyType: 'men',
      amenities: []
    });
    setShowAddForm(false);
  };

  const handleEditProperty = (propertyId) => {
    const property = pgProperties.find(p => p.id === propertyId);
    if (property) {
      setPropertyForm({
        name: property.name,
        address: property.address,
        description: property.description,
        propertyType: property.propertyType,
        amenities: [...property.amenities]
      });
      setEditingPropertyId(propertyId);
      setShowAddForm(true);
    }
  };

  const handleUpdateProperty = (e) => {
    e.preventDefault();
    
    // In a real app, this would update data via an API
    setPgProperties(prev => 
      prev.map(property => 
        property.id === editingPropertyId 
          ? { ...property, ...propertyForm } 
          : property
      )
    );
    
    setPropertyForm({
      name: '',
      address: '',
      description: '',
      propertyType: 'men',
      amenities: []
    });
    setEditingPropertyId(null);
    setShowAddForm(false);
  };

  const handleDeleteProperty = (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      // In a real app, this would delete via an API
      setPgProperties(prev => prev.filter(property => property.id !== propertyId));
    }
  };

  const handleAddRoom = (propertyId) => {
    setCurrentProperty(pgProperties.find(p => p.id === propertyId));
    setRoomForm({
      roomNumber: '',
      roomType: 'single',
      price: '',
      availability: true,
      occupancy: 1
    });
    setShowRoomForm(true);
  };

  const handleEditRoom = (propertyId, roomId) => {
    const property = pgProperties.find(p => p.id === propertyId);
    if (property) {
      const room = property.rooms.find(r => r.id === roomId);
      if (room) {
        setCurrentProperty(property);
        setRoomForm({
          id: room.id,
          roomNumber: room.roomNumber,
          roomType: room.roomType,
          price: room.price,
          availability: room.availability,
          occupancy: room.occupancy
        });
        setShowRoomForm(true);
      }
    }
  };

  const handleSubmitRoom = (e) => {
    e.preventDefault();
    
    if (!currentProperty) return;
    
    // In a real app, this would send/update data via an API
    if (roomForm.id) {
      // Editing existing room
      setPgProperties(prev => 
        prev.map(property => 
          property.id === currentProperty.id 
            ? {
                ...property,
                rooms: property.rooms.map(room => 
                  room.id === roomForm.id 
                    ? { ...roomForm } 
                    : room
                )
              } 
            : property
        )
      );
    } else {
      // Adding new room
      const newRoom = {
        id: Math.floor(Math.random() * 10000),
        ...roomForm
      };
      
      setPgProperties(prev => 
        prev.map(property => 
          property.id === currentProperty.id 
            ? {
                ...property,
                rooms: [...property.rooms, newRoom]
              } 
            : property
        )
      );
    }
    
    setShowRoomForm(false);
    setCurrentProperty(null);
    setRoomForm({
      roomNumber: '',
      roomType: 'single',
      price: '',
      availability: true,
      occupancy: 1
    });
  };

  const handleDeleteRoom = (propertyId, roomId) => {
    if (window.confirm('Are you sure you want to delete this room? This action cannot be undone.')) {
      // In a real app, this would delete via an API
      setPgProperties(prev => 
        prev.map(property => 
          property.id === propertyId 
            ? {
                ...property,
                rooms: property.rooms.filter(room => room.id !== roomId)
              } 
            : property
        )
      );
    }
  };

  const renderPropertyForm = () => (
    <div className="property-form-container">
      <h3>{editingPropertyId ? 'Edit Property' : 'Add New Property'}</h3>
      <form className="property-form" onSubmit={editingPropertyId ? handleUpdateProperty : handleAddProperty}>
        <div className="form-group">
          <label htmlFor="name">Property Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={propertyForm.name}
            onChange={handlePropertyInputChange}
            placeholder="Enter property name"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={propertyForm.address}
            onChange={handlePropertyInputChange}
            placeholder="Enter full address"
            rows={3}
            required
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={propertyForm.description}
            onChange={handlePropertyInputChange}
            placeholder="Describe your property"
            rows={3}
            required
          ></textarea>
        </div>
        
        <div className="form-group">
          <label htmlFor="propertyType">Property Type</label>
          <select
            id="propertyType"
            name="propertyType"
            value={propertyForm.propertyType}
            onChange={handlePropertyInputChange}
            required
          >
            <option value="men">Men's PG</option>
            <option value="women">Women's PG</option>
            <option value="coliving">Co-living Space</option>
            <option value="family">Family Apartment</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Amenities</label>
          <div className="amenities-options">
            {['WiFi', 'AC', 'Food', 'Laundry', 'Gym', 'TV', 'Power Backup', 'Parking', 'Security'].map(amenity => (
              <label key={amenity} className="amenity-checkbox">
                <input
                  type="checkbox"
                  checked={propertyForm.amenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                />
                {amenity}
              </label>
            ))}
          </div>
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={() => {
            setShowAddForm(false);
            setEditingPropertyId(null);
            setPropertyForm({
              name: '',
              address: '',
              description: '',
              propertyType: 'men',
              amenities: []
            });
          }}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            {editingPropertyId ? 'Update Property' : 'Add Property'}
          </button>
        </div>
      </form>
    </div>
  );

  const renderRoomForm = () => (
    <div className="room-form-container">
      <h3>{roomForm.id ? 'Edit Room' : 'Add New Room'}</h3>
      <p className="property-name">Property: {currentProperty?.name}</p>
      
      <form className="room-form" onSubmit={handleSubmitRoom}>
        <div className="form-group">
          <label htmlFor="roomNumber">Room Number</label>
          <input
            type="text"
            id="roomNumber"
            name="roomNumber"
            value={roomForm.roomNumber}
            onChange={handleRoomInputChange}
            placeholder="Enter room number"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="roomType">Room Type</label>
          <select
            id="roomType"
            name="roomType"
            value={roomForm.roomType}
            onChange={handleRoomInputChange}
            required
          >
            <option value="single">Single Room</option>
            <option value="shared">Shared Room</option>
            <option value="deluxe">Deluxe Room</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="price">Monthly Rent (₹)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={roomForm.price}
            onChange={handleRoomInputChange}
            placeholder="Enter monthly rent"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="occupancy">Occupancy</label>
          <select
            id="occupancy"
            name="occupancy"
            value={roomForm.occupancy}
            onChange={handleRoomInputChange}
            required
          >
            <option value="1">1 Person</option>
            <option value="2">2 Person</option>
            <option value="3">3 Person</option>
            <option value="4">4 Person</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="availability">Availability</label>
          <select
            id="availability"
            name="availability"
            value={roomForm.availability.toString()}
            onChange={handleRoomInputChange}
            required
          >
            <option value="true">Available</option>
            <option value="false">Occupied</option>
          </select>
        </div>
        
        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={() => {
            setShowRoomForm(false);
            setCurrentProperty(null);
          }}>
            Cancel
          </button>
          <button type="submit" className="submit-button">
            {roomForm.id ? 'Update Room' : 'Add Room'}
          </button>
        </div>
      </form>
    </div>
  );

  const renderProperties = () => (
    <div className="properties-list">
      {pgProperties.map(property => (
        <div className="property-card" key={property.id}>
          <div className="property-header">
            <h3>{property.name}</h3>
            <div className="property-actions">
              <button 
                className="edit-button"
                onClick={() => handleEditProperty(property.id)}
              >
                Edit
              </button>
              <button 
                className="delete-button"
                onClick={() => handleDeleteProperty(property.id)}
              >
                Delete
              </button>
            </div>
          </div>
          
          <div className="property-details">
            <p className="property-address"><strong>Address:</strong> {property.address}</p>
            <p className="property-description">{property.description}</p>
            <p className="property-type">
              <strong>Type:</strong> {
                property.propertyType === 'men' ? "Men's PG" : 
                property.propertyType === 'women' ? "Women's PG" : 
                property.propertyType === 'coliving' ? "Co-living Space" : 
                "Family Apartment"
              }
            </p>
            
            <div className="property-amenities">
              <strong>Amenities:</strong>
              <div className="amenities-list">
                {property.amenities.map(amenity => (
                  <span key={amenity} className="amenity-tag">{amenity}</span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="rooms-section">
            <div className="rooms-header">
              <h4>Rooms</h4>
              <button 
                className="add-room-button"
                onClick={() => handleAddRoom(property.id)}
              >
                Add Room
              </button>
            </div>
            
            {property.rooms.length > 0 ? (
              <div className="rooms-table-container">
                <table className="rooms-table">
                  <thead>
                    <tr>
                      <th>Room No</th>
                      <th>Type</th>
                      <th>Price</th>
                      <th>Occupancy</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {property.rooms.map(room => (
                      <tr key={room.id}>
                        <td>{room.roomNumber}</td>
                        <td>
                          {room.roomType === 'single' ? 'Single' : 
                           room.roomType === 'shared' ? 'Shared' : 'Deluxe'}
                        </td>
                        <td>₹{room.price.toLocaleString('en-IN')}</td>
                        <td>{room.occupancy} {room.occupancy === 1 ? 'Person' : 'Persons'}</td>
                        <td className={room.availability ? 'available' : 'occupied'}>
                          {room.availability ? 'Available' : 'Occupied'}
                        </td>
                        <td className="room-actions">
                          <button
                            className="edit-button small"
                            onClick={() => handleEditRoom(property.id, room.id)}
                          >
                            Edit
                          </button>
                          <button
                            className="delete-button small"
                            onClick={() => handleDeleteRoom(property.id, room.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="no-rooms">No rooms added to this property yet.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  if (showAddForm) {
    return renderPropertyForm();
  }

  if (showRoomForm && currentProperty) {
    return renderRoomForm();
  }

  return (
    <div className="manage-pg-container">
      <div className="manage-pg-header">
        <h2>Manage Your PG Properties</h2>
        <button 
          className="add-property-button"
          onClick={() => setShowAddForm(true)}
        >
          Add New Property
        </button>
      </div>
      
      {loading ? (
        <div className="loading-message">Loading your properties...</div>
      ) : pgProperties.length > 0 ? (
        renderProperties()
      ) : (
        <div className="no-properties">
          <p>You haven't added any properties yet.</p>
          <p>Click the "Add New Property" button to get started.</p>
        </div>
      )}
    </div>
  );
};
