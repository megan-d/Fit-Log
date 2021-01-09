const express = require('express');
const port = process.env.PORT || 5000;
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const { Client } = require('pg');

//Import routes
const auth = require('./api/routes/auth');
const users = require('./api/routes/users');
const profile = require('./api/routes/profile');

dotenv.config();
const app = express();

//connect to postgresql heroku database
const pool = require('./db');
// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });
// pool.connect();
// client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
//   if (err) throw err;
//   for (let row of res.rows) {
//     // console.log(JSON.stringify(row));
//   }
//   client.end();
// });

//MIDDLEWARES
//To get access to req.body (no longer need body parser npm package)
app.use(express.json());

//Route middlewares
    //Authenticate user and get token-
    app.use('/api/auth', auth);
    //Register new user 
    app.use('/api/users', users);
    //Create, update, and delete profile. Add activity to profile.
    app.use('/api/profile', profile);

// Serve static assets in production. Heroku will automatically default the NODE_ENV to production.
if (process.env.NODE_ENV === 'production') {
    // Set static folder (to be public folder). We want index.html to be our static file.
    app.use(express.static('client/build'));
    //Return all requests to react app
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

//Listen on port
app.listen(port, () => console.log(`App is listening on port ${port}`));

