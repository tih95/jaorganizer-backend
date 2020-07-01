const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: String,
  jobLink: String,
  status: String,
  company: String,
  location: String,
  dateApplied: Date
})

jobSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Job = mongoose.model('Job', jobSchema);

module.exports = { Job };
