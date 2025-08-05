import React, { useEffect, useState } from "react";
import InputField from "../Components/InputField";
import { useFormik } from "formik";
import { HotelSchema } from "../../Schema/HotelShema";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

import axios from "axios";
import { baseApi } from "../../BaseApi";
import HotelCard from "../Components/HotelCard";
import { AsteriskIcon } from "lucide-react";
// import { notify } from "../../../../Backend/Routers/HotelRouter";
const HotelRooms = () => {
  const Notify = (message) => {
    toast(message);
  };
  const InputData = [
    {
      dataType: "text",
      lableName: "Hotel Name",
      name: "hotelname",
    },
    {
      dataType: "text",
      lableName: "Hotel Location",
      name: "location",
    },
    {
      dataType: "number",
      lableName: "Total Single Bed Rooms",
      name: "singlebed",
    },
    {
      dataType: "number",
      lableName: "Total Double Bed Rooms",
      name: "doublebed",
    },
    {
      dataType: "number",
      lableName: "Single Bed Price",
      name: "singlebedprice",
    },
    {
      dataType: "number",
      lableName: "Double Bed Price",
      name: "doublebedprice",
    },
    {
      dataType: "file",
      lableName: "Single Bed Rooms Image",
      name: "singlebedimage",
      multiple: true,
    },
    {
      dataType: "file",
      lableName: "Double Bed Rooms Image",
      name: "doublebedimage",
      multiple: true,
    },

    {
      dataType: "checkbox",
      lableName: "Pets",
      name: "pets",
    },
    {
      dataType: "checkbox",
      lableName: "Parking",
      name: "parking",
    },
  ];
  const [isShow, setShow] = useState(false);

  const handleShow = () => {
    setShow(!isShow);
  };
  const handleClose = () => {
    setShow(!isShow);
    Formik.resetForm()
    isEdit(false)
  };
  const InitialValues = {
    hotelname: "",
    doublebed: 0,
    singlebed: 0,
    singlebedimage: [],
    doublebedimage: [],
    singlebedprice: 0,
    doublebedprice: 0,
    location: "",
    parking: false,
    pets: false,
  };
  const [isTOken, setIsToken] = useState("");
  useEffect(() => {
    const token = Cookies.get("adminToken");
    setIsToken(token);
  }, []);
  const Formik = useFormik({
    initialValues: InitialValues,
    validationSchema: HotelSchema,
    onSubmit: (value) => {
      console.log("value", value);

      console.log("isedit", isEdit);
      if (isEdit) {
        axios
          .patch(`${baseApi}/hotel/update/${Id}`, value, {
            headers: {
              Authorization: `Bearer ${isTOken}`,
            },
            withCredentials: true,
          })

          .then((response) => {
            console.log("response", response);
            GetAllHotelData();
          })
          .catch((e) => console.log("error", e));
      } else {
        const fd = new FormData();
        fd.append("hotelname", value.hotelname);
        fd.append("doublebed", value.doublebed);
        fd.append("singlebed", value.singlebed);
        fd.append("location", value.location);
        fd.append("parking", value.parking);
        fd.append("pets", value.pets);
        fd.append("singlebedprice", value.singlebedprice);
        fd.append("doublebedprice", value.doublebedprice);
        value?.singlebedimage.forEach((file) => {
          fd.append("singlebedimage", file);
        });

        value?.doublebedimage.forEach((file) => {
          fd.append("doublebedimage", file);
        });
        axios
          .post(`${baseApi}/hotel/new-hotel`, fd, {
            headers: {
              Authorization: `Bearer ${isTOken}`,
            },
            withCredentials: true,
          })
          .then((resp) => {
            console.log("response", resp);
            Notify("Hotel Added Succefully");
            GetAllHotelData();
          })
          .catch((error) => {
            console.error("error", error);
            Notify("Faild ! Hotel Added");
          });
      }
    },
  });
  //Edite
  const [isEdit, setIsEdit] = useState(false);

  const [Id, setId] = useState("");
  const HandleEdit = (e) => {
    setId(e._id);
    setIsEdit(true);
    setShow(true);
    console.log("value", e);
    Formik.setValues({
      hotelname: e.name,
      doublebed: e.doubleBedRooms,
      singlebed: e.singleBedRooms,
      location: e.location,
      parking: e.amenities?.parking,
      pets: e.amenities?.petsAllowed,
      singlebedprice: e.singleBedRoomsPrice,
      doublebedprice: e.doubleBedRoomsPrice,
    });
  };
  // Get all hotel data
  const [HotelData, setHotelData] = useState([]);
  const GetAllHotelData = () => {
    axios
      .get(`${baseApi}/hotel/get-all`)
      .then((resp) => {
        console.log(resp);
        setHotelData(resp.data.hotel);
      })
      .catch((e) => console.log("error", e));
  };
  useEffect(GetAllHotelData, []);
  const HandelDeleteOneHotel = (id) => {
    axios
      .delete(`${baseApi}/hotel/delete/${id}`)
      .then((resp) => {
        console.log("response", resp);
        GetAllHotelData();
      })
      .catch((e) => {
        console.log("error", e);
      });
  };
  return (
    <div className="w-full">
      <ToastContainer />
      {!isShow && (
        <button
          style={{
            backgroundColor: " #d2c83cff",
            maxWidth: 200,
            padding: 5,
            borderRadius: 10,
          }}
          onClick={handleShow}
        >
          {" "}
          Add New Hotel
        </button>
      )}
      {isShow && (
        <div
          style={{
            border: "2px solid black",
            boxShadow: "2px 2px 6px 1px",
            maxWidth: 400,
            margin: "auto",
            borderRadius: 10,
            marginBottom: 10,
            marginTop: 10,
          }}
        >
          {isEdit ? (
            <h3 style={{ textAlign: "center", margin: 2 }}>Edit HOTEL</h3>
          ) : (
            <h3 style={{ textAlign: "center", margin: 2 }}>NEW HOTEL</h3>
          )}
          <form onSubmit={Formik.handleSubmit} enctype="multipart/form-data">
            <div className="grid gap-4 px-4 py-2  ">
              {InputData.map((item, i) => {
                return <InputField item={item} key={i} Formik={Formik} />;
              })}
            </div>
            {/* { Formik.touched} */}
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <button type="submit" className="custom_btn">
                Submit
              </button>
              <button
                style={{
                  backgroundColor: " #d6d6e7ff",
                  maxWidth: 200,
                  padding: 5,
                  borderRadius: 10,
                }}
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      <div
        className="grid grid-cols-12 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-4   p-4"
        style={{ display: "flex", gap: 1 }}
      >
        {HotelData.map((hotel, i) => (
          <HotelCard
            key={i}
            hotel={hotel}
            HandleEdit={HandleEdit}
            HandelDeleteOneHotel={HandelDeleteOneHotel}
          />
        ))}
      </div>
    </div>
  );
};

export default HotelRooms;
