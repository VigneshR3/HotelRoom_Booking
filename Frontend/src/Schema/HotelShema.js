import * as Yup from 'yup'

export const HotelSchema = Yup.object({
    hotelname: Yup.string().required("Hotel Name is required"),
    doublebed: Yup.number().positive().integer().required("Give How Many Number of Double bed Rooms ! * required"),
    singlebed: Yup.number().positive().integer().required("Give How Many Number of Single bed Rooms ! * required"),
    // singlebedimage: Yup.array().required("image is requied"),
    // doublebedimage: Yup.array().required("image is requied"),
    location: Yup.string().required("Hotel Location is required"),
     
})