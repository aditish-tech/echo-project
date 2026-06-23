require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');

// 1. Validate Environment Variables on Startup
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET', 'GROQ_API_KEY'];
const missingEnvVars = [];

requiredEnvVars.forEach((varName) => {
  if (!process.env[varName] || process.env[varName].trim() === '') {
    missingEnvVars.push(varName);
  }
});

if (missingEnvVars.length > 0) {
  console.error('\n=========================================');
  console.error('FATAL STARTUP ERROR: Missing Environment Variables!');
  console.error(`Please define the following variables in your .env file:`);
  missingEnvVars.forEach((v) => console.error(`  - ${v}`));
  console.error('=========================================\n');
  process.exit(1);
}

// Log status warnings for placeholders
if (process.env.GROQ_API_KEY === 'your_groq_key_here') {
  console.warn('WARNING: GROQ_API_KEY is using the placeholder value. AI generation will run in offline simulation mode.');
}
if (process.env.MONGODB_URI === 'your_mongodb_connection_string_here') {
  console.warn('WARNING: MONGODB_URI is using the placeholder. Server will fail to connect to database until configured.');
}

const app = express();

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Connect Database
connectDB();

// 4. Routes registration
app.use('/api/auth', require('./routes/auth'));
app.use('/api/goal', require('./routes/goal'));
app.use('/api/journal', require('./routes/journal'));
app.use('/api/letter', require('./routes/letter'));
app.use('/api/schedule', require('./routes/schedule'));
app.use('/api/routine', require('./routes/routine'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date(),
    aiMode: process.env.GROQ_API_KEY === 'your_groq_key_here' ? 'simulated' : 'live'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// 5. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
