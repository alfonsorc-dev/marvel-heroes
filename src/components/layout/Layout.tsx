import { Outlet } from "react-router-dom";
import Navbar from "@/components/navbar/Navbar";
import "./Layout.scss";

export default function Layout() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
