require('dotenv').config();

let PORT = process.env.PORT;
let PG_USER = process.env.PG_USER;
let PG_PASSWORD = process.env.PG_PASSWORD;
let PG_HOST = process.env.PG_HOST;
let PG_PORT = process.env.PG_PORT;
let PG_DATABASE = process.env.PG_DATABASE;
let SECRET = process.env.SECRET;
let DATABASE_URL = process.env.DATABASE_URL;

module.exports = {
  PORT, 
  PG_USER,
  PG_PASSWORD,
  PG_HOST,
  PG_DATABASE,
  PG_PORT,
  SECRET,
  DATABASE_URL
};