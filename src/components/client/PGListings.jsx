import { useState, useEffect } from 'react';
import './ClientComponents.css';

export const PGListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sortBy: 'price_low',
    propertyType: 'all'
  });

  // Mock listings data - in a real app, this would come from an API
  const mockListings = [
    {
      id: 1,
      name: 'Comfort PG for Men',
      location: 'Koramangala, Bangalore',
      price: 12000,
      roomType: 'Single',
      amenities: ['WiFi', 'AC', 'Food', 'Laundry'],
      rating: 4.2,
      image: 'https://via.placeholder.com/300x200?text=PG+Image',
      type: 'men',
      availability: 5
    },
    {
      id: 2,
      name: 'Budget PG for Women',
      location: 'HSR Layout, Bangalore',
      price: 9000,
      roomType: 'Shared (2 Person)',
      amenities: ['WiFi', 'Food'],
      rating: 3.8,
      image: 'https://via.placeholder.com/300x200?text=PG+Image',
      type: 'women',
      availability: 3
    },
    {
      id: 3,
      name: 'Luxury Stays Co-living',
      location: 'Indiranagar, Bangalore',
      price: 18000,
      roomType: 'Single',
      amenities: ['WiFi', 'AC', 'Food', 'Gym', 'Laundry'],
      rating: 4.7,
      image: 'https://via.placeholder.com/300x200?text=PG+Image',
      type: 'coliving',
      availability: 2
    },
    {
      id: 4,
      name: 'Family Apartment',
      location: 'Whitefield, Bangalore',
      price: 25000,
      roomType: '2 BHK',
      amenities: ['WiFi', 'AC', 'Power Backup', 'Parking', 'Security'],
      rating: 4.5,
      image: 'https://via.placeholder.com/300x200?text=PG+Image',
      type: 'family',
      availability: 1
    },
    {
      id: 5,
      name: 'Student Housing',
      location: 'Jayanagar, Bangalore',
      price: 8500,
      roomType: 'Shared (3 Person)',
      amenities: ['WiFi', 'Food', 'Study Room', 'Library'],
      rating: 4.0,
      image: 'https://via.placeholder.com/300x200?text=PG+Image',
      type: 'coliving',
      availability: 8
    }
  ];

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      let sortedListings = [...mockListings];
      
      // Apply sorting
      switch(filters.sortBy) {
        case 'price_low':
          sortedListings.sort((a, b) => a.price - b.price);
          break;
        case 'price_high':
          sortedListings.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          sortedListings.sort((a, b) => b.rating - a.rating);
          break;
        default:
          break;
      }
      
      // Apply filtering
      if (filters.propertyType !== 'all') {
        sortedListings = sortedListings.filter(listing => 
          listing.type === filters.propertyType
        );
      }
      
      setListings(sortedListings);
      setLoading(false);
    }, 1000);
  }, [filters]);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setLoading(true);
  };

  const handleViewDetails = (listingId) => {
    alert(`View details for PG ID: ${listingId}. In a real app, this would open a detailed view.`);
  };

  return (
    <div className="pg-listings-container">
      <div className="listings-header">
        <h2>Available PG Listings</h2>
        <div className="listings-filters">
          <div className="filter-group">
            <label htmlFor="sortBy">Sort By:</label>
            <select 
              id="sortBy" 
              name="sortBy" 
              value={filters.sortBy}
              onChange={handleFilterChange}
            >
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="propertyType">Property Type:</label>
            <select 
              id="propertyType" 
              name="propertyType" 
              value={filters.propertyType}
              onChange={handleFilterChange}
            >
              <option value="all">All Types</option>
              <option value="men">Men's PG</option>
              <option value="women">Women's PG</option>
              <option value="coliving">Co-living Space</option>
              <option value="family">Family Apartment</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="listings-content">
        {loading ? (
          <div className="loading-message">Loading listings...</div>
        ) : listings.length > 0 ? (
          <div className="listings-grid">
            {listings.map(listing => (
              <div className="listing-card" key={listing.id}>
                <div className="listing-image">
                  <img src={listing.image} alt={listing.name} />
                  <div className="listing-rating">
                    <span>★ {listing.rating}</span>
                  </div>
                </div>
                <div className="listing-details">
                  <h3>{listing.name}</h3>
                  <p className="listing-location">{listing.location}</p>
                  <p className="listing-price">₹{listing.price.toLocaleString('en-IN')} / month</p>
                  <p className="listing-room">{listing.roomType}</p>
                  <div className="listing-amenities">
                    {listing.amenities.slice(0, 3).map(amenity => (
                      <span key={amenity} className="amenity-tag">{amenity}</span>
                    ))}
                    {listing.amenities.length > 3 && (
                      <span className="amenity-tag">+{listing.amenities.length - 3} more</span>
                    )}
                  </div>
                  <div className="listing-availability">
                    <span>{listing.availability} {listing.availability === 1 ? 'room' : 'rooms'} available</span>
                  </div>
                  <button 
                    className="view-details-button"
                    onClick={() => handleViewDetails(listing.id)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-listings">
            <p>No properties found matching your criteria.</p>
            <p>Try changing your filters for more results.</p>
          </div>
        )}
      </div>
    </div>
  );
};
