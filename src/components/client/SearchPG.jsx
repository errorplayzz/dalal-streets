import { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { RatingStars } from '../common/RatingAndReviews';
import './ClientComponents.css';

const SearchPG = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    priceMin: '',
    priceMax: '',
    gender: 'any',
    roomType: 'any',
    amenities: [],
    rating: 0
  });

  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mapView, setMapView] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  
  const { addNotification } = useAppContext();

  // Available amenities
  const availableAmenities = [
    { id: 'wifi', name: 'WiFi', icon: '📶' },
    { id: 'ac', name: 'Air Conditioning', icon: '❄️' },
    { id: 'food', name: 'Food Available', icon: '🍽️' },
    { id: 'laundry', name: 'Laundry', icon: '👕' },
    { id: 'parking', name: 'Parking', icon: '🅿️' },
    { id: 'security', name: 'Security', icon: '👮' },
    { id: 'gym', name: 'Gym', icon: '💪' },
    { id: 'power', name: 'Power Backup', icon: '🔋' },
    { id: 'cleaning', name: 'Room Cleaning', icon: '🧹' },
    { id: 'visitors', name: 'Visitors Allowed', icon: '👥' }
  ];

  // Room types
  const roomTypes = [
    { id: 'any', name: 'Any Type' },
    { id: 'single', name: 'Single Room' },
    { id: 'double', name: 'Double Sharing' },
    { id: 'triple', name: 'Triple Sharing' },
    { id: 'dormitory', name: 'Dormitory' }
  ];

  // Mock function to fetch location suggestions
  const fetchLocationSuggestions = async (query) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock suggestions
    const mockLocations = [
      'Koramangala, Bangalore',
      'HSR Layout, Bangalore',
      'BTM Layout, Bangalore',
      'Indiranagar, Bangalore',
      'Electronic City, Bangalore'
    ];
    
    return mockLocations.filter(loc => 
      loc.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Handle location input change
  const handleLocationChange = async (e) => {
    const value = e.target.value;
    setSearchParams(prev => ({ ...prev, location: value }));
    
    if (value.length > 2) {
      const suggestions = await fetchLocationSuggestions(value);
      setSuggestions(suggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Handle location suggestion selection
  const handleSuggestionSelect = (location) => {
    setSearchParams(prev => ({ ...prev, location }));
    setSuggestions([]);
    setSelectedLocation(location);
  };

  // Toggle amenity selection
  const toggleAmenity = (amenityId) => {
    setSearchParams(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  // Handle search
  const handleSearch = async () => {
    setLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock search results
      const mockResults = [
        {
          id: 1,
          name: 'Comfort PG for Men',
          location: 'Koramangala, Bangalore',
          price: 12000,
          rating: 4.5,
          reviewCount: 28,
          roomType: 'double',
          amenities: ['wifi', 'ac', 'food', 'laundry'],
          gender: 'male',
          images: ['https://example.com/pg1.jpg'],
          available: true
        },
        {
          id: 2,
          name: 'Ladies Paradise PG',
          location: 'HSR Layout, Bangalore',
          price: 15000,
          rating: 4.8,
          reviewCount: 42,
          roomType: 'single',
          amenities: ['wifi', 'ac', 'food', 'security'],
          gender: 'female',
          images: ['https://example.com/pg2.jpg'],
          available: true
        }
        // Add more mock results as needed
      ];
      
      // Filter results based on search params
      const filteredResults = mockResults.filter(pg => {
        const matchesLocation = !searchParams.location || 
          pg.location.toLowerCase().includes(searchParams.location.toLowerCase());
          
        const matchesPrice = (!searchParams.priceMin || pg.price >= parseInt(searchParams.priceMin)) &&
          (!searchParams.priceMax || pg.price <= parseInt(searchParams.priceMax));
          
        const matchesGender = searchParams.gender === 'any' || pg.gender === searchParams.gender;
        
        const matchesRoomType = searchParams.roomType === 'any' || pg.roomType === searchParams.roomType;
        
        const matchesAmenities = searchParams.amenities.length === 0 || 
          searchParams.amenities.every(amenity => pg.amenities.includes(amenity));
          
        const matchesRating = searchParams.rating === 0 || pg.rating >= searchParams.rating;
        
        return matchesLocation && matchesPrice && matchesGender && 
               matchesRoomType && matchesAmenities && matchesRating;
      });
      
      setResults(filteredResults);
      
      // Show notification
      addNotification({
        title: 'Search Complete',
        message: `Found ${filteredResults.length} PGs matching your criteria`,
        type: 'info'
      });
      
    } catch (error) {
      console.error('Search error:', error);
      addNotification({
        title: 'Search Failed',
        message: 'Unable to complete search. Please try again.',
        type: 'alert'
      });
    } finally {
      setLoading(false);
    }
  };

  // Reset search filters
  const resetFilters = () => {
    setSearchParams({
      location: '',
      priceMin: '',
      priceMax: '',
      gender: 'any',
      roomType: 'any',
      amenities: [],
      rating: 0
    });
    setSelectedLocation(null);
    setSuggestions([]);
  };

  return (
    <div className="search-pg-container">
      <div className="search-filters">
        <div className="search-header">
          <h2>Find Your Perfect PG</h2>
          <div className="view-toggle">
            <button
              className={!mapView ? 'active' : ''}
              onClick={() => setMapView(false)}
            >
              📋 List View
            </button>
            <button
              className={mapView ? 'active' : ''}
              onClick={() => setMapView(true)}
            >
              🗺️ Map View
            </button>
          </div>
        </div>

        <div className="filters-container">
          <div className="location-filter">
            <label>Location</label>
            <div className="location-input-container">
              <input
                type="text"
                value={searchParams.location}
                onChange={handleLocationChange}
                placeholder="Enter area or locality"
              />
              {suggestions.length > 0 && (
                <div className="location-suggestions">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="suggestion-item"
                      onClick={() => handleSuggestionSelect(suggestion)}
                    >
                      📍 {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="price-filter">
            <label>Price Range (₹)</label>
            <div className="price-inputs">
              <input
                type="number"
                value={searchParams.priceMin}
                onChange={(e) => setSearchParams(prev => ({ ...prev, priceMin: e.target.value }))}
                placeholder="Min"
              />
              <span>to</span>
              <input
                type="number"
                value={searchParams.priceMax}
                onChange={(e) => setSearchParams(prev => ({ ...prev, priceMax: e.target.value }))}
                placeholder="Max"
              />
            </div>
          </div>

          <div className="gender-filter">
            <label>Gender</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="any"
                  checked={searchParams.gender === 'any'}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, gender: e.target.value }))}
                />
                Any
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={searchParams.gender === 'male'}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, gender: e.target.value }))}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={searchParams.gender === 'female'}
                  onChange={(e) => setSearchParams(prev => ({ ...prev, gender: e.target.value }))}
                />
                Female
              </label>
            </div>
          </div>

          <div className="room-type-filter">
            <label>Room Type</label>
            <select
              value={searchParams.roomType}
              onChange={(e) => setSearchParams(prev => ({ ...prev, roomType: e.target.value }))}
            >
              {roomTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>

          <div className="amenities-filter">
            <label>Amenities</label>
            <div className="amenities-grid">
              {availableAmenities.map(amenity => (
                <label key={amenity.id} className="amenity-checkbox">
                  <input
                    type="checkbox"
                    checked={searchParams.amenities.includes(amenity.id)}
                    onChange={() => toggleAmenity(amenity.id)}
                  />
                  <span className="amenity-icon">{amenity.icon}</span>
                  <span className="amenity-name">{amenity.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="rating-filter">
            <label>Minimum Rating</label>
            <RatingStars
              rating={searchParams.rating}
              editable={true}
              onChange={(rating) => setSearchParams(prev => ({ ...prev, rating }))}
            />
          </div>
        </div>

        <div className="search-actions">
          <button className="reset-button" onClick={resetFilters}>
            Reset Filters
          </button>
          <button className="search-button" onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search PGs'}
          </button>
        </div>
      </div>

      <div className="search-results">
        {loading ? (
          <div className="loading-state">
            <div className="loader"></div>
            <p>Finding the best PGs for you...</p>
          </div>
        ) : results.length > 0 ? (
          <div className={`results-container ${mapView ? 'map-view' : 'list-view'}`}>
            {!mapView ? (
              results.map(pg => (
                <div key={pg.id} className="pg-card">
                  <div className="pg-image">
                    <img src={pg.images[0]} alt={pg.name} />
                    {!pg.available && (
                      <div className="unavailable-badge">Fully Occupied</div>
                    )}
                  </div>
                  <div className="pg-details">
                    <h3>{pg.name}</h3>
                    <p className="pg-location">📍 {pg.location}</p>
                    <div className="pg-rating">
                      <RatingStars rating={pg.rating} />
                      <span className="review-count">({pg.reviewCount} reviews)</span>
                    </div>
                    <div className="pg-amenities">
                      {pg.amenities.map(amenityId => {
                        const amenity = availableAmenities.find(a => a.id === amenityId);
                        return amenity ? (
                          <span key={amenityId} className="amenity-tag">
                            {amenity.icon} {amenity.name}
                          </span>
                        ) : null;
                      })}
                    </div>
                    <div className="pg-price">
                      <span className="price">₹{pg.price.toLocaleString()}</span>
                      <span className="per-month">/month</span>
                    </div>
                    <button className="view-details-button">
                      View Details
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="map-container">
                {/* Map implementation will go here */}
                <p className="map-placeholder">Map view coming soon!</p>
              </div>
            )}
          </div>
        ) : (
          <div className="no-results">
            <p>No PGs found matching your criteria</p>
            <button className="reset-button" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPG;
