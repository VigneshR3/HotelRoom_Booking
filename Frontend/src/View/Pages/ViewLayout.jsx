import React from "react";
import { Outlet } from "react-router-dom";
import ViewHeader from "../Components/ViewHeader";

const ViewLayout = () => {
  return (
    <div>
      <ViewHeader/>
      <Outlet />
    </div>
  );
};

export default ViewLayout;
