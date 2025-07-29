import axios from "axios";
import { useEffect, useState } from "react";
import { baseApi } from "../BaseApi";
import { Navigate } from "react-router-dom";

export const AdminProtecter = ({children}) => {
  const [isCheck, setIsCheck] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const UserIS_Admin = () => {
    axios
      .get(`${baseApi}/auth/is-admin`,{withCredentials:true})
      .then((response) => {
        console.log("response", response);
        if(response.data.success){
            setIsAdmin(true)
        }
      })
      .catch((e) => {
        console, log("Error", e);
        setIsAdmin(false)
      }).finally(()=>{ setIsCheck(true)})
  };
  useEffect(UserIS_Admin,[])
  if(!isCheck){
    return <p>Loading..</p>
  }
  if(!isAdmin){
    return <Navigate to={'/login'}/>
  }
  return children
};
