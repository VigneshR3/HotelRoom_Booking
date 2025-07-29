 
const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  singleBedRooms: { type: Number, required: true },
  doubleBedRooms: { type: Number, required: true },
  doubleBedRoomsPrice: { type: Number, required: true },
  singleBedRoomsPrice: { type: Number, required: true },
  images: {
    single: [String], 
    double: [String],  
  },
  amenities: {
    parking: { type: Boolean, default: false },
    petsAllowed: { type: Boolean, default: false },
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Hotel", HotelSchema);
