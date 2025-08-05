import { useState } from "react";

export default function BookingConfirmForm({ hotel }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    startDate: "",
    endDate: "",
    roomType: "single",
    withPets: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const getPrice = () => {
    return form.roomType === "single"
      ? hotel.singleBedRoomsPrice
      : hotel.doubleBedRoomsPrice;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking confirmed!", form);
    alert("Booking Confirmed!");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow mt-8 border">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">Confirm Your Booking</h2>

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
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium">End Date</label>
            <input
              type="date"
              name="endDate"
              value={form.endDate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Room Type */}
        <div>
          <label className="block font-medium">Room Type</label>
          <select
            name="roomType"
            value={form.roomType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="single">Single Bed - ₹{hotel.singleBedRoomsPrice}</option>
            <option value="double">Double Bed - ₹{hotel.doubleBedRoomsPrice}</option>
          </select>
        </div>

        {/* With Pets */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="withPets"
            checked={form.withPets}
            onChange={handleChange}
          />
          <label>Travelling with pets?</label>
        </div>

        {/* Hotel Info */}
        <div className="bg-gray-50 border rounded p-4">
          <p><strong>Hotel:</strong> {hotel.name}</p>
          <p><strong>Location:</strong> {hotel.location}</p>
          <p><strong>Price/night:</strong> ₹{getPrice()}</p>
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
