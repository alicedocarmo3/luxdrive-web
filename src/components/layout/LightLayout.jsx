import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../Footer";

function LightLayout() {
  return (
    <div className="light-layout">
      <Navbar variant="light" />
      <main className="layout-content light">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default LightLayout;