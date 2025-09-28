const express = require('express');
const cors = require('cors');
const dotenv =require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
// Configure CORS explicitly here, and only here
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend's origin
    credentials: true, // Allow sending cookies/auth headers
}));
//database connection
mongoose.connect(process.env.MONGO_URL)
    .then(()=>console.log("Database connected"))
    .catch((err)=>console.log("Database not connected",err))

//routes
app.use('/', require('./routes/routes'));

app.get('/',(req,res)=>{
res.send('Backend is working');
}
);

const port = process.env.PORT || 8000;
app.listen(port, ()=>console.log(`Server is running on port ${port}`));
