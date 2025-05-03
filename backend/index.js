// index.js (or app.js)
require('dotenv').config();           // ← Moved to top!
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const Routes = require('./routes/route.js');

const PORT = process.env.PORT || 8700;
const MONGO_URL = process.env.MONGO_URL;

async function startServer() {
  const app = express();

  app.use(express.json({ limit: '10mb' }));
  //to allow different origins
  app.use(cors());

  // --- connect to MongoDB ---
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1); // stop if DB connection fails
  }

  // --- mount routes ---
  app.use('/', Routes);

  // --- start listening ---
  app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
  });
}

startServer();
