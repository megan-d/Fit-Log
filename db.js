// const Pool = require('pg').Pool;
//   const pool = new Pool({
//       host : '127.0.0.1',
//       user : process.env.PG_USER,
//       password : process.env.PG_PS,
//       port: 5432,
//       database : 'fit_ally'
//   });

//   module.exports = pool;

const { Client } = require('pg');

//connect to postgresql heroku database
const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
  client.connect();
  client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
    if (err) throw err;
    console.log('Connected to DB');
    for (let row of res.rows) {
    //   console.log('Connected to DB');
    }
    client.end();
  });