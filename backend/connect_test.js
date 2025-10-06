require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/permission_manager';

const safe = (u) => {
  if (!u) return u;
  // hide credentials if present
  return u.replace(/:\/\/.+@/, '://<credentials>@');
};

console.log('Attempting to connect using MONGO_URI:', safe(uri));

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    return mongoose.connection.close();
  })
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('MongoDB connection failed:');
    console.error(err && err.message ? err.message : err);
    process.exit(1);
  });
