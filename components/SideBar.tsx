import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const SideBar = () => {
  const router = useRouter();

  return (
    <div className="md:fixed left-0 top-0 p-4 h-full bg-gray-900">
      <div className=" p-4 pb-6 mb-7 flex justify-center gap-4 border-b border-b-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="3"
          stroke="#93c5fd"
          className="w-[36px] h-[36px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"
          />
        </svg>

        <h1 className="text-5xl font-bold text-slate-50">Brand</h1>
      </div>
      <ul className="flex justify-center gap-5 md:flex-col">
        <li
          className={`mb-4 ${
            router.pathname === "/products" ? "active group" : ""
          }`}
        >
          <Link href="/products" className="side-bar-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#f1f5f9"
              className="w-[25px] h-[25px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>

            <span>Products</span>
          </Link>
        </li>
        <li
          className={`mb-4 ${
            router.pathname === "/suppliers" ? "active group" : ""
          }`}
        >
          <Link href="/suppliers" className="side-bar-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#f1f5f9"
              className="w-[25px] h-[25px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
              />
            </svg>

            <span>Supliers</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
