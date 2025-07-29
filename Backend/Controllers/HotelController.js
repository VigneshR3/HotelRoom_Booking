const Hotel = require("../Models/HotelModel");
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
    console.log(error)
    res
      .status(200)
      .json({ success: false, message: "Faild ! File is not uploaded" });
  }
};
module.exports = { NewHotelCreate };
