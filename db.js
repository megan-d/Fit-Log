// const Pool = require('pg').Pool;
//   const pool = new Pool({
//       host : '127.0.0.1',
//       user : process.env.PG_USER,
//       password : process.env.PG_PS,
//       port: 5432,
//       database : 'fit_ally'
//   });

//   module.exports = pool;

const Pool = require('pg').Pool;
const Client = require('pg').Client;

const pool = new Pool({
  connectionString:
    'postgres://gjbnsjqkpebvfb:ed80cb007c6645d7fee8dbd046afc6258c49344945d76eeed17a5e0570cc7cb5@ec2-3-231-241-17.compute-1.amazonaws.com:5432/d9uae9l4hf5gms',
  host: process.env.HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PS,
  port: 5432,
  database: process.env.PG_DATABASE,
    ssl: {
            rejectUnauthorized: false
          }
});

const client = new Client({
  connectionString:
    'postgres://gjbnsjqkpebvfb:ed80cb007c6645d7fee8dbd046afc6258c49344945d76eeed17a5e0570cc7cb5@ec2-3-231-241-17.compute-1.amazonaws.com:5432/d9uae9l4hf5gms',
  host: process.env.HOST,
  user: process.env.PG_USER,
  password: process.env.PG_PS,
  port: 5432,
  database: process.env.PG_DATABASE,
  ssl: {
            rejectUnauthorized: false
          }
});
pool.connect();
console.log('connected to DB!');

exports.pool = pool;
exports.client = client;

// const Pool = require('pg').Pool;

// const pool = new Pool({
// connectionString: process.env.DATABASE_URL,
// //   ssl: {
// //           rejectUnauthorized: true
// //         }
// });
// pool.connect();

// pool.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     console.log(JSON.stringify(row));
//   }
//   pool.end();
// });

// module.exports = pool;

// const Pool = require('pg').Pool;

// //connect to postgresql heroku database
// const pool = new Pool({
//     connectionString: process.env.DATABASE_URL,
//     user: process.env.PG_USER,
//     password: process.env.PG_PS,
//     database: process.env.PG_DATABASE
//     // ssl: {
//     //   rejectUnauthorized: false
//     // }
//   });
//   client.connect();
//   client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//     if (err) throw err;
//     console.log('Connected to DB');
//     for (let row of res.rows) {
//     //   console.log('Connected to DB');
//     }
//     client.end();
//   });

//   module.exports = pool;
