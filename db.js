const { Pool } = require('pg');
require('dotenv').config();

// //connect to postgresql hosted database
const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PS,
  database: process.env.PG_DATABASE,
  //   connectionString: process.env.PG_URL,
});

module.exports = pool;
