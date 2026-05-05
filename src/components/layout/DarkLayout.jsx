import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

function DarkLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default DarkLayout;