import React from "react";
import { Outlet } from "react-router-dom";

const ViewLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ViewLayout;
