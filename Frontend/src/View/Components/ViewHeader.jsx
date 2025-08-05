import { useState } from "react";
import { FaBed, FaUser } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";

export default function ViewHeader() {
  const [location, setLocation] = useState("Bengaluru");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [guests, setGuests] = useState({
    adults: 2,
    children: 0,
    rooms: 1,
    withpats: false,
    startdate: "",
    enddate: "",
  });
  console.log("logd", guests, startDate);
  const adjustGuest = (type, delta) => {
    setGuests((prev) => ({
      ...prev,
      [type]: Math.max(1, prev[type] + delta),
    }));
  };

  return (
    <div className="bg-[#003580] text-white px-6 py-4">
      {/* Top Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">My Booking</h2>
        <div className="space-x-3">
          <button className="bg-white text-[#003580] px-4 py-1 rounded hover:bg-gray-100">
            Register
          </button>
          <button className="bg-white text-[#003580] px-4 py-1 rounded hover:bg-gray-100">
            <Link to={"/login"}>Login </Link>
          </button>
        </div>
      </div>

      {/* Search Box */}
      <div className="bg-white rounded-md p-2 flex flex-wrap items-center gap-2 shadow-md text-black border-4 border-yellow-400">
        {/* Location */}
        <div className="flex items-center gap-2 px-4 py-2 flex-1 border-r border-gray-300">
          <FaBed className="text-gray-500" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="outline-none w-full"
            placeholder="Where are you going?"
          />
          <MdOutlineClose
            className="cursor-pointer text-gray-500"
            onClick={() => setLocation("")}
          />
        </div>

        {/* Date Picker */}
        <div className="flex items-center gap-2 px-4 py-2 flex-1 border-r border-gray-300">
          <FiCalendar className="text-gray-500" />
          <div className="flex flex-col">
            <input
              type="date"
              value={guests.startdate}
              onChange={(e) => {
                setGuests((pre) => ({ ...pre, startdate: e.target.value }));
              }}
              className="text-sm text-gray-700"
            />
            <input
              type="date"
              value={guests.enddate}
              onChange={(e) => {
                setGuests((pre) => ({ ...pre, enddate: e.target.value }));
              }}
              className="text-sm text-gray-700"
            />
          </div>
        </div>

        {/* Guests Dropdown */}
        <div className="relative flex-1">
          <div
            className="flex items-center gap-2 px-4 py-2 border-r border-gray-300 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <FaUser className="text-gray-500" />
            <span className="text-gray-700">
              {guests.adults} adults · {guests.children} children ·{" "}
              {guests.rooms} room .{guests.withpats && <span>withPats</span>}
            </span>
          </div>

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute top-16 right-0 bg-white shadow-lg rounded-md p-4 w-72 z-50">
              {["adults", "children", "rooms"].map((type) => (
                <div
                  key={type}
                  className="flex justify-between items-center py-2"
                >
                  <span className="capitalize">{type}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => adjustGuest(type, -1)}
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <span>{guests[type]}</span>
                    <button
                      onClick={() => adjustGuest(type, 1)}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <div className="flex items-center justify-between mt-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={guests.withpats}
                    checked={guests.withpats}
                    onClick={(e) => {
                      setGuests((pre) => ({
                        ...pre,
                        withpats: e.target.checked,
                      }));
                    }}
                  />
                  <span className="text-sm">Travelling with pets?</span>
                </label>
              </div>
              <button
                onClick={() => setDropdownOpen(false)}
                className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Done
              </button>
            </div>
          )}
        </div>

        {/* Search Button */}
        <button className="bg-[#0071c2] text-white px-6 py-2 rounded hover:bg-[#005fa3]">
          Search
        </button>
      </div>
    </div>
  );
}
