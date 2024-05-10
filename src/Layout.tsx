import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="w-full text-2xl text-center font-bold">
      <h1>react-router-dom-demo</h1>
      <Outlet />
    </div>
  );
}
