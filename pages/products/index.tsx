import ProductCard from "@/components/ProductCard";
import { Product } from "@/utils/type";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Products = () => {
  const [data, setData] = useState<Array<Product> | null>(null);
  const [isLoading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();

      setData(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProduct();
  });
  return (
    <div className="ml-5 text-gray-950">
      <div>
        <h1 className="text-4xl font-semibold mb-1">Product Catalogue</h1>
        <p className="text-gray-400 ml-1">Welcome to product list</p>
      </div>

      {/* CARD GROUP */}
      <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-14">
        {/* CARD COMPONENT */}
        {data?.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};

export default Products;
