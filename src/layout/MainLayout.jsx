import { Outlet } from "react-router-dom";

// components
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useState } from "react";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="d-flex">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;
