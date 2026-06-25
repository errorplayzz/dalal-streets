# Dalal Streets

Dalal Streets is a full-stack web application designed to connect tenants looking for PG (paying guest) accommodations with PG owners and service providers. 

The project consists of a React frontend built with Vite and a Node.js/Express backend server.

## Features

### For Clients (Renters)
* **Search & Filter:** Find PGs based on location and amenities.
* **PG Listings:** Browse detailed PG descriptions, pricing, and ratings.
* **Rent Payments:** Pay rent through an integrated mockup payment gateway.
* **Service Requests:** Book additional services and raise complaints.

### For Vendors (PG Owners / Service Providers)
* **Property Management:** Add, edit, and manage PG details and rooms.
* **Booking Requests:** Accept or reject booking requests from clients.
* **Tenant Tracker:** Keep track of current tenants and their payment status.
* **Service Management:** Offer specialized services to tenants.

### Shared Features
* **Chat System:** In-app real-time style chat between tenants and vendors.
* **Notifications:** Alerts for rent due dates, booking updates, and messages.
* **Reviews & Ratings:** System to rate properties and leave feedback.

---

## Tech Stack

* **Frontend:** React 19, Vite, Vanilla CSS
* **Backend:** Node.js, Express, Cors, Dotenv
* **Database:** In-memory database for tracking logs and sessions (expandable to MongoDB/SQL)

---

## Project Structure

* `/src` - React frontend code
  * `/components` - Modular UI components for client, vendor, and admin panels
  * `/pages` - Core page layouts (Auth, Dashboard)
  * `/context` - App-wide state management
* `/server` - Express backend server
* `/public` - Static assets (icons, background pattern, video assets)

---

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed.

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/errorplayzz/dalal-streets.git
   cd dalal-streets
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (optional):
   Create a `.env` file in the root directory and specify the port (defaults to 5000):
   ```env
   PORT=5000
   NODE_ENV=development
   ```

### Running the App

You can run both the frontend and backend concurrently using:
```bash
npm start
```

Alternatively, you can run them individually:

* **Start Frontend Dev Server:**
  ```bash
  npm run dev
  ```

* **Start Backend Server:**
  ```bash
  npm run server
  ```
