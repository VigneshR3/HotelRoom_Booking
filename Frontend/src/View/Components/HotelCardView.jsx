import React from "react";
import {
  MapPin,
  BedDouble,
  BedSingle,
  ParkingCircle,
  PawPrint,
} from "lucide-react";
import { Link } from "react-router-dom";
// import imagepath from '../../../../Backend/uploads'
const HotelCardView = ({ hotel }) => {
  const {
    name,
    location,
    singleBedRoomsPrice,
    doubleBedRoomsPrice,
    images,
    amenities,
  } = hotel;

  const firstImage =
    images?.single?.[0] ||
    images?.double?.[0] ||
    "https://via.placeholder.com/300x200";

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full md:w-96 mx-auto border border-gray-200">
      {/* Hotel Image */}
      {/* Backend\uploads */}
      <Link to={`details/${hotel._id}`}>
      <img
        src={`http://localhost:3000/uploads/${firstImage}`}
        alt={name}
        className="h-48 w-full object-cover"
      />
      </Link>

      {/* Card Content */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500 flex items-center">
          <MapPin className="w-4 h-4 mr-1" /> {location}
        </p>

        {/* Prices */}
        <div className="mt-3 text-sm text-gray-700 space-y-1">
          <p className="flex items-center gap-2">
            <BedSingle className="w-4 h-4" />
            Single Bed: ₹{singleBedRoomsPrice}
          </p>
          <p className="flex items-center gap-2">
            <BedDouble className="w-4 h-4" />
            Double Bed: ₹{doubleBedRoomsPrice}
          </p>
        </div>

        {/* Amenities */}
        <div className="flex items-center gap-4 mt-4 text-gray-600 text-sm">
          {amenities?.parking && (
            <span className="flex items-center gap-1">
              <ParkingCircle className="w-4 h-4" />
              Parking
            </span>
          )}
          {amenities?.petsAllowed && (
            <span className="flex items-center gap-1">
              <PawPrint className="w-4 h-4" />
              Pets Allowed
            </span>
          )}
        </div>
      </div>
      {/* <div style={{ display: "flex", justifyContent: "space-around",margin:5 }}>
        <button
          style={{
            backgroundColor: " #b6d722ff",
            padding: 5,
            borderRadius: 10,
            width: 100,
          }}
          onClick={()=>{HandleEdit(hotel)}}
        >
          Edit
        </button>
        <button
        onClick={()=>{HandelDeleteOneHotel(hotel._id)}}
        style={{
            backgroundColor: " #e62121ff",
            color:"white",
            padding: 5,
            borderRadius: 10,
            width: 100,
          }}>Delete</button>
      </div> */}
    </div>
  );
};

export default HotelCardView;
