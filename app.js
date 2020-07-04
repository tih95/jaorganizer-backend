const { MONGODB_URI } = require('./utils/config');
const jobsRouter = require('./controllers/jobs');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// connecting backend to database
const url = MONGODB_URI;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch(e => {
    console.log(e);
  })

// middleware
app.use(cors());
app.use(express.json());

app.use('/api/jobs', jobsRouter);

app.get('/', (req, res) => {
  res.send('home');
})

module.exports = app;