const jobsRouter = require('./controllers/jobs');
const usersRouter = require('./controllers/users');
const express = require('express');
const cors = require('cors');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use('/api/jobs', jobsRouter);
app.use('/api/users', usersRouter);

app.get('/', (req, res) => {
  res.send('home');
})

module.exports = app;