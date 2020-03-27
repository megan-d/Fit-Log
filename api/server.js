const express = require('express');
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//this is the develop branch - updated
//This branch is updated
//Now i'm updating develop so I need to pull



//Testing the git merge

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
app.use('/api/user', require('./routes/auth'));
app.use('/api/posts', require('./routes/posts'));


//Listen on port
app.listen(port, () => console.log(`App is listening on port ${port}`));
