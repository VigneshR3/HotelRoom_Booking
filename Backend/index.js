const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const UserRouter = require("./Routers/UserRouter")
const HotelRouter = require("./Routers/HotelRouter")
//Database connection
const Database_Connetion = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/Hotel_Rooms_DB");
    console.log("Database is create");
  } catch (error) {
    console.log("Database is not create", error);
  }
};
Database_Connetion();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}))
const PORT = process.env.PORT
// api
app.use('/api/auth/',UserRouter)
app.use('/api/hotel/',HotelRouter)

app.listen(PORT , ()=>{ console.log("Server Run on PORT "+PORT)})