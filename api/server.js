const express = require('express');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Import routes
const auth = require('./routes/auth');
const users = require('./routes/users');
const profile = require('./routes/profile');

dotenv.config();
const app = express();




//Connect to Database. Dotenv npm package gives access to .env
const connectDatabase = async () => {
    try {await mongoose.connect(
        process.env.MONGO_URI,
        { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
        () => console.log('Connected to DB'))
    } catch(err) {
        console.error(err);
        process.exit(1);
    };
}
connectDatabase();

//MIDDLEWARES
//To get access to req.body (no longer need body parser npm package)
app.use(express.json());

//Root route
app.get('/', async (req, res) => {
  res.send('API is running');
});

//Route middlewares
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/profile', profile);


//Listen on port
app.listen(port, () => console.log(`App is listening on port ${port}`));
