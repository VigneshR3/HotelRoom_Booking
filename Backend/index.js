const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const UserRouter = require("./Routers/UserRouter")
const HotelRouter = require("./Routers/HotelRouter")
const BookingRouter = require("./Routers/BookingRouter")
const path = require('path')
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
app.use("/uploads", express.static(path.join(__dirname,"uploads" ) ))
const url = ['http://localhost:5173','http://localhost:5174']
app.use(cors({
    origin: url,
    credentials:true,
}))
const PORT = process.env.PORT
// api
app.use('/api/auth/',UserRouter)
app.use('/api/hotel/',HotelRouter)
app.use('/api/booking/',BookingRouter)

app.listen(PORT , ()=>{ console.log("Server Run on PORT "+PORT)})