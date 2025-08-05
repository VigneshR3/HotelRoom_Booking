const Booking = require("../Models/BookingModel");
const CreateNewBooking = async (req, res) => {
  try {
    const {
      name,
      email,
      startdate,
      enddate,
      roomtype,
      withpats,
      adults,
      children,
      rooms,
      hotel,
      location,
      price,
      hotelid,
      userid
    } = req.body;

    const newBooking = new Booking({
      userId: userid,
      hotelId: hotelid,
      name,
      email,
      checkIn: new Date(startdate),
      checkOut: new Date(enddate),
      roomType: roomtype,
      withPets: withpats,
      adults,
      children,
      rooms,
      location,
      price,
      hotelName:hotel
    });

    const saved = await newBooking.save();
    console.log(saved)
    res.status(201).json({ message: "Booking created successfully", booking: saved });
  } catch (err) {
    console.error("Booking Save Error:", err);
    res.status(500).json({ message: "Failed to create booking", error: err.message });
  }
};

const FetchAllbooking = async(req ,res)=>{
  try {
    const booking = await Booking.find().sort({_id:-1})
    res.status(200).json({ message: "Fetch all Booking", booking });
    
  } catch (error) {
    console.error("Booking Save Error:", error);
    res.status(500).json({ message: "Failed to create booking", error });
  }
}
const FetchOnebookingDetails = async(req ,res)=>{
  try {
    const {id} = req.params 
    const update = await Booking.updateOne({_id:id},{$set:{isRead:true}})
    console.log(update)
    const booking = await Booking.findById(id)
    res.status(200).json({ message: "Fetch all Booking", booking });
    
  } catch (error) {
    console.error("Booking Save Error:", error);
    res.status(500).json({ message: "Failed to create booking", error });
  }
}
module.exports = {CreateNewBooking , FetchAllbooking,FetchOnebookingDetails}
