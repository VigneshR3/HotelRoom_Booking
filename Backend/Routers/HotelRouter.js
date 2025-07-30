// routes/hotel.js
const express = require('express');
const { NewHotelCreate, GetAllHotel, UpdateOneHotel, DeleteOneHotel } = require('../Controllers/HotelController');
const Router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
// require('../../Frontend/public/uploads') 
// Ensure uploads dir exists
 
const uploadDir = path.join(__dirname, '../../Frontend/public/', 'uploads'); // ← stable
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `${unique}${path.extname(file.originalname)}`);
  },
});


// Optionally restrict to images only
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) return cb(null, true);
  cb(new Error('Only image files are allowed'));
};

const upload = multer({ storage, fileFilter });
console.log(upload)
// ⬇️ Expect these exact field names from the frontend
Router.post(
  "/new-hotel",
  upload.fields([
    { name: "singlebedimage", maxCount: 5 },
    { name: "doublebedimage", maxCount: 5 }
  ]),
  NewHotelCreate
);
Router.get('/get-all',GetAllHotel)
Router.patch('/update/:id',UpdateOneHotel)
Router.delete('/delete/:id',DeleteOneHotel)
module.exports = Router;
