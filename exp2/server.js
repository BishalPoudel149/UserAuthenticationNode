const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const PORT = 3000;
const secretKey = 'bishalsecretkey2223232'; // Replace with your secret key

// Middleware to parse JSON bodies
app.use(express.json());

// Dummy user data for demonstration
const users = [];

// User registration route
app.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const existingUser = users.find(user => user.username === username);

    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: users.length + 1, username, password: hashedPassword, role };
    users.push(newUser);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, role: user.role }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: 'Error authenticating token' });
  }
}

// Middleware to check if user has admin role
function isAdmin(req, res, next) {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error checking admin role' });
  }
}

// Admin protected route
app.get('/admin', authenticateToken, isAdmin, (req, res) => {
  res.json({ message: 'Admin route accessed successfully' });
});

// User protected route
app.get('/user', authenticateToken, (req, res) => {
  res.json({ message: 'User route accessed successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
