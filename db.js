const Pool = require('pg').Pool;
  const pool = new Pool({
      host : '127.0.0.1',
      user : process.env.PG_USER,
      password : process.env.PG_PS,
      port: 5432,
      database : 'fit_ally'
  });

  module.exports = pool;