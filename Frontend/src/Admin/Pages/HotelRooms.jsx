import React from "react";
import InputField from "../Components/InputField";
import { useFormik } from "formik";
import { HotelSchema } from "../../Schema/HotelShema";
import { Form } from "react-router-dom";
import { Axis3D } from "lucide-react";
import axios from "axios";
import { baseApi } from "../../BaseApi";
const HotelRooms = () => {
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

  const Formik = useFormik({
    initialValues: InitialValues,
    validationSchema: HotelSchema,
    onSubmit: (value) => {
      console.log("value", value);
      const fd = new FormData();
      fd.append("hotelname", value.hotelname);
      fd.append("doublebed", value.doublebed);
      fd.append("singlebed", value.singlebed);
      fd.append("location", value.location);
      fd.append("parking", value.parking);
      fd.append("pets", value.pets);
      fd.append("singlebedprice", value.singlebedprice);
      fd.append("doublebedprice", value.doublebedprice);
      value.singlebedimage.forEach((file) => {
        fd.append("singlebedimage", file);
      });

      value.doublebedimage.forEach((file) => {
        fd.append("doublebedimage", file);
      });

      axios
        .post(`${baseApi}/hotel/new-hotel`, fd, { withCredentials: true })
        .then((resp) => {
          console.log("response", resp);
        })
        .catch((e) => console.log("Error", e));
    },
  });
  return (
    <div>
      <div
        style={{
          border: "2px solid black",
          boxShadow: "2px 2px 6px 1px",
          maxWidth: 400,
          margin: "auto",
          borderRadius: 10,
        }}
      >
        <h3 style={{ textAlign: "center", margin: 2 }}>NEW HOTEL</h3>
        <form onSubmit={Formik.handleSubmit} enctype="multipart/form-data">
          <div style={{ margin: 6 }}>
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
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HotelRooms;
