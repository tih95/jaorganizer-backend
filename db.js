const config = require('./utils/config.js');
const Pool = require('pg').Pool;

const pool = new Pool({
  user: config.PG_USER,
  password: config.PG_PASSWORD,
  host: config.PG_HOST,
  port: config.PG_PORT,
  database: config.PG_DATABASE
})

module.exports = pool;