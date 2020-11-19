const express = require('express');
const cors = require('cors');
const jobsRouter = require('./routes/jobsRouter');
const authRouter = require('./routes/authRouter');
const usersRouter = require('./routes/usersRouter');
const { logger } = require('./middleware/logger');

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(logger);

app.use('/api/jobs', jobsRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

module.exports = app;