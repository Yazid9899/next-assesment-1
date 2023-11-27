import { Product } from "@/utils/type";
import Image from "next/image";
import React from "react";
import Button from "@/components/Button";

interface ProductProps {
  product: Product;
  onEdit: () => void;
  refresh: () => void;
}

const ProductCard = ({ product, onEdit, refresh }: ProductProps) => {
  const deleteProduct = async () => {
    try {
      await fetch(`api/products/${product.id}`, {
        method: "DELETE",
      });
      refresh();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex flex-col p-4 justify-center items-start text-black-100 bg-primary-blue-100 bg-white hover:shadow-md rounded-3xl">
      <div className="relative w-full h-40 my-3 object-contain">
        <Image
          src={"/uploads/products/" + product.id + ".jpg"}
          alt={product.nama}
          fill
          priority
          className="object-contain"
        />
      </div>
      <div className="w-full flex justify-between items-start mb-1">
        <h2 className="text-2xl leading-[26px] font-bold text-gray-800">
          {product.nama}
        </h2>
      </div>
      <p className="leading-[17px] mb-2 text-gray-800 text-sm">
        {product.deskripsi}
      </p>
      <div className="flex justify-between w-full mb-3">
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
      <div className="flex justify-between gap-3 w-full text-gray-700 text-[13px]">
        <div className="flex justify-center items-center gap-1">
          <Button
            onClick={() => {
              deleteProduct();
            }}
            label="delete"
            bgColor="bg-gray-700"
          />
          <Button onClick={onEdit} label="edit" bgColor="bg-indigo-800" />
        </div>
        <div className="flex gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-[20px] h-[20px] align-middle self-center "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819"
            />
          </svg>

          <p className="text-[13px] font-[500] items-center flex">
            {product.nama_suplier}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
