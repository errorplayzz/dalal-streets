import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// In-memory database for login records
const loginRecords = [];
const failedLoginAttempts = [];

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Simple authentication logic
    if (email && password === 'password123') {
      // Create login record
      const loginRecord = {
        userId: `user-${Date.now()}`,
        email: email,
        timestamp: new Date().toISOString(),
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
        loginStatus: 'success',
        location: req.headers['x-forwarded-for'] || req.connection.remoteAddress
      };

      // Store in memory array
      loginRecords.push(loginRecord);

      console.log(`Successful login for user: ${email}`);
      
      res.json({
        token: `token-${Date.now()}`,
        user: {
          uid: loginRecord.userId,
          email: loginRecord.email,
          displayName: email.split('@')[0],
          role: email.includes('admin') ? 'admin' : 'user'
        }
      });
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error('Login error:', error);
    
    // Log failed attempt
    const failedLoginRecord = {
      email: req.body.email,
      timestamp: new Date().toISOString(),
      ipAddress: req.ip,
      userAgent: req.headers['user-agent'],
      loginStatus: 'failed',
      errorMessage: error.message
    };

    failedLoginAttempts.push(failedLoginRecord);

    res.status(401).json({
      message: 'Authentication failed'
    });
  }
});

// Endpoint to get login history
app.get('/api/auth/login-history', async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const records = loginRecords
      .filter(record => record.userId === userId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10);

    res.json(records);
  } catch (error) {
    console.error('Error fetching login history:', error);
    res.status(500).json({
      message: 'Failed to fetch login history'
    });
  }
});

// Endpoint to get all login records (for admin)
app.get('/api/auth/all-login-records', async (req, res) => {
  try {
    // In a real app, you would add authentication/authorization here
    res.json({
      successful: loginRecords.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 50),
      failed: failedLoginAttempts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 50)
    });
  } catch (error) {
    console.error('Error fetching all login records:', error);
    res.status(500).json({
      message: 'Failed to fetch login records'
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
