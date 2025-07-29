import * as Yup from "yup";
const RegisterSchema = Yup.object({
  username: Yup.string()
    .max(8, "maximum 8 character")
    .required("user Name is requird"),
  email: Yup.string().email().required("email is required"),
  phonenumber: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits")
    .required("Phone number is required"),
  password: Yup.string().matches(
    /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/,
    "Password must start with an uppercase letter, contain at least 8 characters, and include at least one symbol."
  ).required("Password is required"),
  confirmpassword: Yup.string()
    .required("Password is required & 8 charater only")
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});
export default RegisterSchema;
