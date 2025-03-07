"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaChartBar, FaBox } from "react-icons/fa";

const Sidebar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 960); 
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <aside
      className={`${
        isMobile ? "w-16" : "w-64"
      } bg-gray-800 text-white h-full p-4 transition-all duration-300`}
    >
      <h2 className={`text-xl font-bold mb-4 ${isMobile ? "hidden" : "block"}`}>
       Sales Dashboard
      </h2>
      <ul>
        <li className="mb-2">
          <Link
            href="/dashboard/sales"
            className={`flex items-center gap-2 p-2 rounded transition-colors duration-200 ${
              pathname === "/dashboard/sales" ? "bg-gray-700" : "hover:bg-gray-700"
            }`} title="Sales">
            <FaChartBar size={20} />
            {!isMobile && <span>Sales</span>}
          </Link>
        </li>
        <li className="mb-2">
          <Link
            href="/dashboard/products"
            className={`flex items-center gap-2 p-2 rounded transition-colors duration-200 ${
              pathname === "/dashboard/products" ? "bg-gray-700" : "hover:bg-gray-700"
            }`} title="Products" >
            <FaBox size={20} />
            {!isMobile && <span>Products</span>}
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
