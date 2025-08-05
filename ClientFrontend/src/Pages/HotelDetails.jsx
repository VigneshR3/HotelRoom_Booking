import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { baseApi } from "../BaseApi";
import { FaParking, FaDog, FaBed } from "react-icons/fa";

 

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState({});
  const FetchOneHotel = () => {
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
  useEffect(FetchOneHotel, []);
  console.log("details");
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-2">{hotel.name}</h1>
      <p className="text-gray-600 text-sm mb-6">📍 {hotel.location}</p>

      {/* Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <img
          src={`http://localhost:3000/uploads/${hotel.images?.single[0]}`}
          alt="Single Room"
          className="rounded shadow"
        />
        <img
          src={`http://localhost:3000/uploads/${hotel.images?.double[0]}`}
          alt="Double Room"
          className="rounded shadow"
        />
      </div>

      {/* Room Details */}
      <div className="grid sm:grid-cols-2 gap-6 mb-8">
        {/* Single Bed Room */}
        <div className="border rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">Single Bed Rooms</h2>
          <p className="text-gray-700">Available: {hotel.singleBedRooms}</p>
          <p className="text-gray-700">
            Price: ₹{hotel.singleBedRoomsPrice} / night
          </p>
        </div>

        {/* Double Bed Room */}
        <div className="border rounded-lg p-4 shadow">
          <h2 className="text-xl font-semibold mb-2">Double Bed Rooms</h2>
          <p className="text-gray-700">Available: {hotel.doubleBedRooms}</p>
          <p className="text-gray-700">
            Price: ₹{hotel.doubleBedRoomsPrice} / night
          </p>
        </div>
      </div>

      {/* Amenities */}
      <div className="border rounded-lg p-4 mb-8 shadow">
        <h2 className="text-xl font-semibold mb-4">Amenities</h2>
        <ul className="space-y-2">
          <li className="flex items-center gap-2">
            <FaParking className="text-gray-700" />
            <span>
              {hotel.amenities?.parking
                ? "Free Parking Available"
                : "No Parking"}
            </span>
          </li>
          <li className="flex items-center gap-2">
            <FaDog className="text-gray-700" />
            <span>
              {hotel.amenities?.petsAllowed
                ? "Pets Allowed"
                : "No Pets Allowed"}
            </span>
          </li>
        </ul>
      </div>

      <div style={{ justifyContent: "center", display: "flex" }}>
        <button
          style={{
            border: "1px solid black",
            padding: "5px",
            borderRadius: "8px",
            backgroundColor: "#7cf50bff",
            color: "white",
          }}
        >
          <Link to={"/booking/" + hotel._id}>Booking Now</Link>
        </button>
      </div>
      {/* Created Date */}
      {/* <div className="text-sm text-gray-500">
        🕒 Listed on: {new Date(hotel.createdAt).toLocaleDateString()}
      </div> */}
    </div>
  );
}
