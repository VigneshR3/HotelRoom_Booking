// models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  roomType: { type: String, enum: ["single", "double"], required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["confirmed", "cancelled"], default: "confirmed" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", BookingSchema);
