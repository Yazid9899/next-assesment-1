import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import ProductModal from "@/components/modal/ProductModal";
import { Product, Supplier } from "@/utils/type";

const Products = () => {
  const [products, setProducts] = useState<Array<Product> | null>(null);
  const [suppliers, setSuppliers] = useState<Array<Supplier> | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editData, setEditData] = useState<Product | null>(null);

  const fetchProduct = async () => {
    try {
      const response = await fetch("/api/products");
      const data = await response.json();
      setProducts(data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchSupplier = async () => {
    try {
      const response = await fetch("/api/suppliers");
      const data = await response.json();
      setSuppliers(data.data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchSupplier();
  }, []);

  return (
    <>
      <div className="ml-5 text-gray-950">
        <div className="flex gap-5">
          <div>
            <h1 className="text-4xl font-bold mb-1">PRODUCT LIST</h1>
            <p className="text-gray-400 ml-1">Welcome to the product list</p>
          </div>
          <button onClick={() => setShowProductModal(true)}>Add Product</button>
        </div>

        <div className="grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full gap-8 pt-14">
          {products?.map((product) => {
            const productSupplier = suppliers?.find(
              (supplier) => supplier.id_suplier === product.id
            );
            return (
              <ProductCard
                product={product}
                supplier={productSupplier?.nama_suplier}
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
