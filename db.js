const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/feedbackApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to LOCAL MongoDB'))
.catch(err => console.error('❌ MongoDB connection failed:', err));
