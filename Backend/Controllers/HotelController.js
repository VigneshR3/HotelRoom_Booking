const Hotel = require("../Models/HotelModel");
const fs = require("fs");
const path = require("path");
const NewHotelCreate = async (req, res) => {
  try {
    console.log("BOdy", req.body);
    // console.log("FIle", req.files);
    const singleRoomImages =
      req.files?.singlebedimage?.map((f) => f.filename) || [];
    const doubleRoomImages =
      req.files?.doublebedimage?.map((f) => f.filename) || [];

    // console.log("Single Bed Images:", singleRoomImages);
    // console.log("Double Bed Images:", doubleRoomImages);
    const newHodel = await Hotel.create({
      name: req.body.hotelname,
      singleBedRoomsPrice: req.body.singlebedprice,
      doubleBedRoomsPrice: req.body.doublebedprice,
      location: req.body.location,
      singleBedRooms: req.body.singlebed,
      doubleBedRooms: req.body.doublebed,
      images: { single: singleRoomImages, double: doubleRoomImages },
      amenities: {
        parking: req.body.parking,
        petsAllowed: req.body.pet,
      },
    });
    console.log("Double Bed Images:", newHodel);

    res.status(200).json({ success: true, message: "File is uploaded" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, message: "Faild ! File is not uploaded" });
  }
};
const GetAllHotel = async (req, res) => {
  try {
    const hotel = await Hotel.find();
    res
      .status(200)
      .json({ success: true, message: "Get all Hotel details", hotel: hotel });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Faild ! Get all Hotel details" });
  }
};
// name: { type: String, required: true },
//   location: { type: String, required: true },
//   singleBedRooms: { type: Number, required: true },
//   doubleBedRooms: { type: Number, required: true },
//   doubleBedRoomsPrice: { type: Number, required: true },
//   singleBedRoomsPrice: { type: Number, required: true },
//   images: {
//     single: [String],
//     double: [String],
//   },
//   amenities: {
//     parking: { type: Boolean, default: false },
//     petsAllowed: { type: Boolean, default: false },
//   },
const UpdateOneHotel = async (req, res) => {
  console.log("req", req.body);
  const data = req.body;
  const { id } = req.params;
  try {
    const Update = await Hotel.updateOne(
      { _id: id },
      {
        $set: {
          name: data.hotelname,
          location: data.location,
          amenities: { parking: data.parking, petsAllowed: data.pets },
          doubleBedRooms: data.doublebed,
          doubleBedRoomsPrice: data.doublebedprice,
          singleBedRoomsPrice: data.singlebedprice,
          singleBedRooms: data.singlebed,
        },
      }
    );
    console.log(Update);
    res.status(200).json({ success: true, message: "Updated" });
  } catch (error) {
    console.log("update", error);
    res.status(400).json({ success: true, message: "Faild ! , Updated" });
  }
};
const DeleteOneHotel = async (req, res) => {
  try {
    const { id } = req.params;

    // 1. Find hotel to get image paths
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return res.status(404).json({ success: false, message: "Hotel not found" });
    }

    // 2. Combine single & double image arrays
    const allImages = [...(hotel.images.single || []), ...(hotel.images.double || [])];

    // 3. Delete each image file from /uploads/ directory
    allImages.forEach((filename) => {
      const filePath = path.join(__dirname, '../uploads',filename);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`Failed to delete image: ${filename}`, err);
        }
      });
    });

    // 4. Delete hotel from DB
    await Hotel.deleteOne({ _id: id });

    return res.status(200).json({ success: true, message: "Hotel and images deleted successfully." });
  } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ success: false, message: "Server error while deleting hotel" });
  }
};
const FetchOneHotel = async(req, res)=>{
   try {
    console.log(req.params)
    const {id} =req.params
    const hotel = await Hotel.findById(id)
    return res.status(200).json({ success: true, message: "One Hotel Details Fetched",hotel });
     
   } catch (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ success: false, message: "Server error while deleting hotel" });
   }
}
module.exports = { NewHotelCreate, GetAllHotel, UpdateOneHotel ,DeleteOneHotel,FetchOneHotel};
