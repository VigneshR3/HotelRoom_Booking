import * as Yup from "yup";
const LoginSchema = Yup.object({
  email: Yup.string().email().required("email is required"),
  password: Yup.string().required("password is Requird").matches(/^[A-Z](?=.*[!@#$%^&]).{6,}$/).max(8,"maximum 8 charactors").min(8,) 
});
export default LoginSchema;
 
