// models/Room.js
const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  type: { type: String, enum: ["single", "double"], required: true },
  number: { type: String, required: true },
  isAvailable: { type: Boolean, default: true },
  price: { type: Number, required: true },
  amenities: [String],
});

module.exports = mongoose.model("Room", RoomSchema);
