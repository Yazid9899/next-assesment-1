import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/modal/ProductModal";
import { Product, Supplier } from "@/utils/type";

const Products = () => {
  const [products, setProducts] = useState<Array<Product> | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editData, setEditData] = useState<Product | null>(null);

  const fetchProduct = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="rounded-t mb-0 px-5 py-3 border-dotted border-b flex flex-wrap items-center">
          <div>
            <h1 className="header-text">PRODUCT LIST</h1>
            <p className="text-gray-400 ml-1">Welcome to the product list</p>
          </div>
          <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
            <Button
              onClick={() => setShowProductModal(true)}
              label="ADD PRODUCT"
              bgColor="bg-indigo-500"
            />
          </div>
        </div>

        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-14">
          {products?.map((product) => {
            return (
              <ProductCard
                product={product}
                key={product.id}
                onEdit={() => {
                  setEditData(product);
                  setShowProductModal(true);
                }}
                refresh={fetchProduct}
              />
            );
          })}
        </div>
      </div>
      <ProductModal
        isVisible={showProductModal}
        close={() => {
          setShowProductModal(false);
          fetchProduct();
        }}
        editData={editData}
      />
    </>
  );
};

export default Products;
