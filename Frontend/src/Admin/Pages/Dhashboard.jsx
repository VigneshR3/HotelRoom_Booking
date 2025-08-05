import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseApi } from "../../BaseApi";
import { Link } from "react-router-dom";

const Dhashboard = () => {
  const [BookingData, setBookingData] = useState([]);
  const fetchAllBooking = () => {
    axios
      .get(`${baseApi}/booking/get-all`)
      .then((res) => {
        console.log("response", res);
        setBookingData(res.data.booking);
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  useEffect(fetchAllBooking, []);
  return (
    <div>
      Dhashboard
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase tracking-wider">
                More Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {BookingData &&
              BookingData.map((item, i) => {
                return (
                  
                  <tr key={i} style={{fontWeight:`${!item.isRead?"bold":""}`}}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black-900">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
                      {item.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black-500">
                      {item.status}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Link to={'/admin/booking-details/'+item._id}>
                        <button style={{padding:4,backgroundColor:'#96ee63ff',color:'white',borderRadius:5}}>Details</button>
                      </Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dhashboard;
