const express = require('express')
const { CreateNewBooking, FetchAllbooking, FetchOnebookingDetails } = require('../Controllers/BookingController')
const  Router = express.Router()

Router.post('/create',CreateNewBooking)
Router.get('/get-all',FetchAllbooking)
Router.get('/one/:id',FetchOnebookingDetails)
module.exports = Router