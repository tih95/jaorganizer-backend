const jobsRouter = require('express').Router();
const { Job } = require('../models/job');


jobsRouter.get('', async (req, res) => {
  try {
    const result = await Job.find({});
    console.log(result);
  
    res.json(result);
  }
  catch(e) {
    console.log(e);
  }
  
})

jobsRouter.get('/:id', async (req, res) => {
  try {
    const result = await Job.findById(req.params.id);

    res.json(result);
  }
  catch(e) {
    res.status(404).json({error: 'Job does not exist'});
  }
  
})

jobsRouter.post('/', async (req, res) => {
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

jobsRouter.put('/:id', async (req, res) => {
  const body = req.body;

  const editedJob = {
    title: body.title,
    jobLink: body.jobLink,
    status: body.status,
    company: body.company,
    location: body.location,
    dateApplied: body.dateApplied
  }

  try {
    const result = await Job.findByIdAndUpdate(req.params.id, editedJob, { new: true });

    res.json(result);
  }
  catch(e) {
    console.log(e);
  }
})

jobsRouter.delete('/:id', async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);

    res.status(204).end();
  }
  catch(e) {
    console.log(e);
  }
})

module.exports = jobsRouter;