import { Outlet } from "react-router-dom";

import Navbar from "../components/header/Header"
import Footer from "../components/footer/Footer"


function MainLayout() {
  return (
    <>
     <Navbar/>
     <main>
      <Outlet />
      </main>
     <Footer/>
     
    </>
  );
}

export default MainLayout;