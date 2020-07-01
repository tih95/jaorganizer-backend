require('dotenv').config({
  path: '../.env' 
});
const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('connected to MongoDB');
  })
  .catch(e => {
    console.log(e);
  })

const jobSchema = new mongoose.Schema({
  title: String,
  jobLink: String,
  status: String,
  company: String,
  location: String,
  dateApplied: Date
})

const Job = mongoose.model('Job', jobSchema);

const newJob = new Job({
  title: 'Junior Front End Engineer',
  jobLink: 'http://linkedin.com',
  status: 'Interviewing',
  company: 'Google',
  location: '2433 W 229th Pl',
  dateApplied: new Date()
})

newJob.save().then(result => {
  console.log('job saved');
  mongoose.connection.close();
})