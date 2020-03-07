const path = require('path');
const cors = require('cors');
const express= require('express');
const dotenv = require('dotenv')
const connectDb = require('./config/db')

dotenv.config({path: './config/config.env'})

const app = express();

app.use(express.json());

app.use(cors());

connectDb();

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/stores', require('./routes/stores'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>{
    console.log(`server running on ${process.env.NODE_ENV} mode on ${PORT}`)
})
