import { Product } from "@/utils/type";
import Image from "next/image";
import React from "react";

interface ProductProps {
  product: Product;
}

const ProductCard = ({ product }: ProductProps) => {
  return (
    <div className="flex flex-col p-6 justify-center items-start text-black-100 bg-primary-blue-100 bg-white hover:shadow-md rounded-3xl">
      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src="/uploads/samurai.png"
          alt={product.nama}
          layout="fill"
          priority
          className="object-contain"
        />
      </div>
      <div className="w-full flex justify-between items-start mb-1">
        <h2 className="text-2xl leading-[26px] font-bold text-gray-800">
          {product.nama}
        </h2>
        <div className="flex justify-center items-center gap-2">
          <button className=" font-semibold hover:bg-gray-900 hover:text-white text-gray-900 rounded-md py-[2px] px-1 shadow-sm border-gray-900 border-2">
            Delete
          </button>
          <button className="font-semibold hover:bg-green-900 hover:text-white text-green-900 border-2 border-green-900 rounded-md py-[2px] px-3">
            Edit
          </button>
        </div>
      </div>
      <p className="leading-[17px] mb-2">{product.deskripsi}</p>
      <div className="flex justify-between w-full">
        <p className="flex gap-1">
          <span className="self-start text-[12px]">Rp</span>
          <span className="text-lg font-semibold">
            {product.harga.toLocaleString("en-US")}
          </span>
          <span className="self-end text-[12px]">/pcs</span>
        </p>
        <p className=" text-gray-600">
          {product.stok}
          <span className="text-[12px]"> pcs left</span>
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
