const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const pool = require('../db');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const { authorizeToken } = require('../middleware/authorizeToken');

usersRouter.get('/', authorizeToken, async (req, res) => {
  try {
    const result = pool.query(
      `SELECT * FROM users`
    )

    res.json(result.rows[0]);
  } 
  catch (error) {
    console.log(error);
  }
})

usersRouter.post('/signup', async (req, res) => {
  const body = req.body;

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  try {
    const result = await pool.query(
      `INSERT INTO 
        users (name, email, "passwordHash") 
        VALUES ($1, $2, $3) 
        RETURNING *`,
      [body.name, body.email, passwordHash]
    )

    const user = result.rows[0];
    
    const userForToken = {
      id: user.id,
      email: user.email
    }

    const token = jwt.sign(userForToken, config.SECRET);

    res.status(200).send({ token, name: user.name, email: user.email })
  } 
  catch (error) {
    res.status(400).json({error})
  }
})

usersRouter.post('/login', async (req, res) => {
  const body = req.body;

  try {
    const result = await pool.query(
      "SELECT * from users WHERE email = $1",
      [body.email]
    )
    const user = result.rows[0];

    const passwordCorrect = user === null
      ? false
      : await bcrypt.compare(body.password, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return res.status(401).send({
        error: 'Invalid username or password'
      })
    }

    const userForToken = {
      email: user.email,
      id: user.id
    }

    const token = jwt.sign(userForToken, config.SECRET);

    res.status(200).send({ token, email: user.email, name: user.name});
  }
  catch(e) {

  }
})

module.exports = usersRouter;