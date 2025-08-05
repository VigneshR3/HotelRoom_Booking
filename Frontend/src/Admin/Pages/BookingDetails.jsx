import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseApi } from "../../BaseApi";

const BookingDetails = () => {
    const [booking, setBooking] = useState([]);
    const {id} = useParams()
      const fetchAllBooking = () => {
        axios
          .get(`${baseApi}/booking/one/`+id)
          .then((res) => {
            console.log("response", res);
            setBooking(res.data.booking);
          })
          .catch((e) => {
            console.log("error", e);
          });
      };
      useEffect(fetchAllBooking, []);
  return (
    <div>
       <div className="max-w-2xl mx-auto bg-white shadow rounded p-6 mt-6 border border-gray-200">
      <h2 className="text-2xl font-semibold text-blue-700 mb-4">
        Booking Details
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <span className="font-medium">Guest Name:</span> {booking.name}
        </div>
        <div>
          <span className="font-medium">Email:</span> {booking.email}
        </div>

        <div>
          <span className="font-medium">Hotel:</span> {booking.hotelName}
        </div>
        <div>
          <span className="font-medium">Location:</span> {booking.location}
        </div>

        <div>
          <span className="font-medium">Room Type:</span> {booking.roomType}
        </div>
        <div>
          <span className="font-medium">Rooms:</span> {booking.rooms}
        </div>

        <div>
          <span className="font-medium">Check-in:</span> {booking.checkIn}
        </div>
        <div>
          <span className="font-medium">Check-out:</span> {booking.checkOut}
        </div>

        <div>
          <span className="font-medium">Adults:</span> {booking.adults}
        </div>
        <div>
          <span className="font-medium">Children:</span> {booking.children}
        </div>

        <div>
          <span className="font-medium">With Pets:</span>{" "}
          {booking.withpats ? "Yes" : "No"}
        </div>
        <div>
          <span className="font-medium">Price:</span> ₹{booking.price}
        </div>
        <div>
          <span className="font-medium">Status:</span> ₹{booking.status}
        </div>
      </div>
    </div>
    </div>
  );
};

export default BookingDetails;
