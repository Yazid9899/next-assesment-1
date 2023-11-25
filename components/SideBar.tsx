import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
const SideBar = () => {
  const router = useRouter();

  return (
    <div className="fixed left-0 top-0 w-64 p-4 h-full bg-gray-900">
      <div className="p-4 pb-6 mb-7 flex justify-left gap-4 border-b border-b-gray-200">
        <Image src="/icon/logo.svg" alt="product" width={34} height={34} />
        <h1 className="text-5xl font-bold text-slate-50">Brand</h1>
      </div>
      <ul>
        <li
          className={`mb-4 ${
            router.pathname === "/products" ? "active group" : ""
          }`}
        >
          <Link href="/products" className="side-bar-link">
            <Image
              src="/icon/product.svg"
              alt="product"
              width={25}
              height={25}
            />
            <span>Products</span>
          </Link>
        </li>
        <li
          className={`mb-4 ${
            router.pathname === "/suppliers" ? "active group" : ""
          }`}
        >
          <Link href="/suppliers" className="side-bar-link">
            <Image
              src="/icon/supplier.svg"
              alt="product"
              width={25}
              height={25}
            />
            <span>Supliers</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
