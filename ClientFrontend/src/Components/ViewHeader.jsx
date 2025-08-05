import { useContext, useState } from "react";
import { FaBed, FaUser } from "react-icons/fa";
import { FiCalendar } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { MyBookingContext } from "../MyBookingContext";
import Avater from "./Avater";

export default function ViewHeader() {
  const [location, setLocation] = useState("Bengaluru");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { form, setForm, User } = useContext(MyBookingContext);
  // const [guests, setGuests] = useState({
  //   adults: 2,
  //   children: 0,
  //   rooms: 1,
  //   withpats: false,
  //   startdate: "",
  //   enddate: "",
  // });
  console.log("logd", form);
  const adjustGuest = (type, delta) => {
    setForm((prev) => ({
      ...prev,
      [type]: Math.max(1, prev[type] + delta),
    }));
  };
  console.log("header", User);
  return (
    <div className="bg-[#003580] text-white px-6 py-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4 sm:gap-0">
        <h2 className="text-3xl font-bold text-white-800">My Booking</h2>

        <div className="flex items-center gap-3">
          <Link
            to="/register"
            className="bg-white text-[#003580] border border-[#003580] px-5 py-2 rounded-md hover:bg-[#f0f8ff] transition"
          >
            Register
          </Link>

          
            <Link
              to="/login"
              className="bg-white text-[#003580] border border-[#003580] px-5 py-2 rounded-md hover:bg-[#f0f8ff] transition"
            >
              Login
            </Link>
          

          <Avater />
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
              value={form.startdate}
              onChange={(e) => {
                setForm((pre) => ({ ...pre, startdate: e.target.value }));
              }}
              className="text-sm text-gray-700"
            />
            <input
              type="date"
              value={form.enddate}
              onChange={(e) => {
                setForm((pre) => ({ ...pre, enddate: e.target.value }));
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
              {form.adults} adults · {form.children} children · {form.rooms}{" "}
              room .{form.withpats && <span>withPats</span>}
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
                    <span>{form[type]}</span>
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
                    value={form.withpats}
                    checked={form.withpats}
                    onClick={(e) => {
                      setForm((pre) => ({
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
