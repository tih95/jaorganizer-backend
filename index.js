require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { Job } = require('./models/job');

const app = express();

// connecting backend to database
const url = process.env.MONGODB_URI;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch(e => {
    console.log(e);
  })

// middleware
app.use(express.json());
app.use(cors());

// routes
app.get('/', (req, res) => {
  res.send('home');
})

app.get('/api/jobs', async (req, res) => {
  try {
    const result = await Job.find({});
    console.log(result);
  
    res.json(result);
  }
  catch(e) {
    console.log(e);
  }
  
})

app.get('/api/jobs/:id', async (req, res) => {
  try {
    const result = await Job.findById(req.params.id);

    res.json(result);
  }
  catch(e) {
    res.status(404).json({error: 'Job does not exist'});
  }
  
})

app.post('/api/jobs', async (req, res) => {
  const body = req.body;

  const newJob = new Job({
    title: body.title,
    jobLink: body.jobLink,
    status: body.status,
    company: body.company,
    location: body.location,
    dateApplied: body.dateApplied
  });

  try {
    const result = await newJob.save();

    res.json(result);
  }
  catch(e) {
    console.log(e);
  }
})

app.put('/api/jobs/:id', async (req, res) => {
  const body = req.body;

  const editedJob = {
    title: body.title,
    jobLink: body.jobLink,
    status: body.status,
    company: body.company,
    location: body.location
  }

  try {
    const result = await Job.findByIdAndUpdate(req.params.id, editedJob, { new: true });

    res.json(result);
  }
  catch(e) {
    console.log(e);
  }
})

app.delete('/api/jobs/:id', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);

    res.status(204).end();
  }
  catch(e) {
    console.log(e);
  }
})

// starting server
const PORT = process.env.PORT || 3001;
app.listen(PORT,  () => {
  console.log(`server running on port ${PORT}`);
})