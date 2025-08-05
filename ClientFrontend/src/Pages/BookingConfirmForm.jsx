import { useContext, useEffect, useState } from "react";
import { MyBookingContext } from "../MyBookingContext";
import axios from "axios";
import { baseApi } from "../BaseApi";
import { useNavigate, useParams } from "react-router-dom";

export default function BookingConfirmForm() {
  // const [form, setForm] = useState({
  //   name: "",
  //   email: "",
  //   startDate: "",
  //   endDate: "",
  //   roomType: "single",
  //   withPets: false,
  // });
  const { form, setForm, User } = useContext(MyBookingContext);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log(name);
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const { id } = useParams();
  const [hotel, setHotel] = useState({});
  const FetchOneHotel = () => {
    setForm((pre) => ({ ...pre, hotelid: id }));
    axios
      .get(`${baseApi}/hotel/get-one/${id}`)
      .then((res) => {
        console.log(res);
        setHotel(res.data.hotel);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  useEffect(() => {
    if (hotel.name) {
      setForm((prev) => ({
        ...prev,
        hotel: hotel.name,
        location: hotel.location,
        price: getPrice(), // ✅ call the function
      }));
    }
  }, [form.roomtype, hotel]); // ✅ run when hotel is fetched

  useEffect(FetchOneHotel, []);
  const getPrice = () => {
    return form.roomtype === "single"
      ? hotel?.singleBedRoomsPrice * form.rooms
      : hotel?.doubleBedRoomsPrice * form.rooms;
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (User.email) {
      console.log("Booking confirmed!", form);
      axios
        .post(`${baseApi}/booking/create`, form)
        .then((res) => {
          alert("Booking Confirmed!");
          setForm({
            name: "",
            email: "",
            startdate: "",
            enddate: "",
            roomtype: "single",
            withpats: false,
            adults: 2,
            children: 0,
            rooms: 1,
            hotel: "",
            location: "",
            price: "",
            hotelid: "",
            userid: "",
          });
          console.log("Booking Response:", res.data); // Debug
        })
        .catch((e) => {
          alert("Failed to confirm booking!");
          console.error("Axios error:", e?.response?.data || e.message);
        });
    } else {
      alert("please Login");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8 border">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">
        Confirm Your Booking
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block font-medium">Your Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Dates */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block font-medium">Start Date</label>
            <input
              type="date"
              name="startdate"
              value={form.startdate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium">End Date</label>
            <input
              type="date"
              name="enddate"
              value={form.enddate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
        {/* Guests */}
        <div className="flex gap-4">
          {/* Adults */}
          <div className="flex-1">
            <label className="block font-medium">Adults</label>
            <input
              type="number"
              name="adults"
              value={form.adults}
              min={1}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Children */}
          <div className="flex-1">
            <label className="block font-medium">Children</label>
            <input
              type="number"
              name="children"
              value={form.children}
              min={0}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* With Pets */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="withpats"
            id="pets"
            checked={form?.withpats}
            onChange={handleChange}
          />
          <label htmlFor="pets">Travelling with pets?</label>
        </div>
        {/* Room Type */}
        <div>
          <label className="block font-medium">Room Type</label>
          <select
            name="roomtype" // ✅ Correct name
            value={form.roomtype}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="single">
              Single Bed - ₹{hotel?.singleBedRoomsPrice}
            </option>
            <option value="double">
              Double Bed - ₹{hotel?.doubleBedRoomsPrice}
            </option>
          </select>
          <div className="flex-1">
            <label className="block font-medium">Rooms</label>
            <input
              type="number"
              name="rooms"
              value={form.rooms}
              min={1}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Hotel Info */}
        <div className="bg-gray-50 border rounded p-4">
          <p>
            <strong>Hotel:</strong> {hotel?.name}
          </p>
          <p>
            <strong>Location:</strong> {hotel?.location}
          </p>
          <p>
            <strong>Price/night:</strong> ₹{getPrice()}
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
