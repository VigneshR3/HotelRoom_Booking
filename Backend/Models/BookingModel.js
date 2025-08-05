const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  hotelId: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  hotelName: { type: String, required: true },
  name: { type: String, required: true }, // guest name
  email: { type: String, required: true },

  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },

  roomType: { type: String, enum: ["single", "double"], required: true },
  rooms: { type: Number, default: 1 },
  price: { type: Number, required: true },

  adults: { type: Number, default: 1 },
  children: { type: Number, default: 0 },
  withPets: { type: Boolean, default: false },
  isRead:{ type: Boolean, default: false },

  location: { type: String },
  status: { type: String, enum: ["confirmed", "cancelled"], default: "confirmed" },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Booking", BookingSchema);

