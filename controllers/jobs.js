const jobsRouter = require('express').Router();
const pool = require('../db');

const { authorizeToken } = require('../middleware/authorizeToken');

jobsRouter.get('/', authorizeToken, async (req, res) => {
  const user = req.user;

  try {
    const result = await pool.query(
      `SELECT * FROM jobs WHERE user_id = $1`,
      [user.id]
    )
  
    res.json(result.rows);
  }
  catch(e) {
    console.log(e);
  }
})

jobsRouter.get('/:id', authorizeToken, async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM jobs WHERE id = $1`, 
      [id]
    )

    res.json(result.rows[0]);
  }
  catch(e) {
    res.status(404).json({error: 'Job does not exist'});
  }
})

jobsRouter.post('/', authorizeToken, async (req, res) => {
  const body = req.body;
  const user = req.user;

  try {
    const result = await pool.query(
      `INSERT INTO jobs 
        (title, \"jobLink\", \"dateApplied\", location, company, status, user_id, notes) 
        VALUES($1, $2, $3, $4, $5, $6, $7, $8) 
        RETURNING *`,
      [body.title, body.jobLink, body.dateApplied, 
        body.location, body.company, body.status, user.id, body.notes]
    )

    res.status(201).json(result.rows[0]);
  }
  catch(e) {
    res.status(400).json({error: 'invalid request'});
  }
})

jobsRouter.put('/:id', authorizeToken, async (req, res) => {
  const body = req.body;
  const { id } = req.params;

  try {
    const result = await pool.query(
      `UPDATE jobs SET 
        title = $1, \"jobLink\"= $2, status = $3, company = $4, \"dateApplied\" = $5, location = $6, notes = $7
        WHERE id = $8
        RETURNING *`,
      [body.title, body.jobLink, body.status, body.company, body.dateApplied, body.location, body.notes, id] 
    )

    res.json(result.rows[0]);
  }
  catch(e) {
    console.log(e);
  }
})

jobsRouter.delete('/:id', authorizeToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query(
      `DELETE FROM jobs WHERE id = $1`, 
      [id]
    )

    res.status(204).end();
  }
  catch(e) {
    res.status(400).json({error: e})
  }
})

module.exports = jobsRouter;