const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

// import routes
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');

dotenv.config();

// Connect to DB
const connectionString = process.env.DB_CONNECT || "mongodb://localhost:27017/hc?readPreference=primary&appname=HealthCoins&ssl=false";
const PORT = process.env.SERVER_PORT || 8080;
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => { console.log("Mongoose connected successfully "); },
        error => { console.log("Mongoose could not connect to database: " + error) });

app.use(cors());

// for CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
})

// Middleware
app.use(cors());
app.use(express.json());

// Route middleware
app.use('/api/user', authRoute);
app.use('/api/product', productRoute);

app.listen(PORT, () => console.log(`Server started on ${PORT}`));