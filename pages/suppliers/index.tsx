import React, { useState, useEffect } from "react";
import Button from "@/components/Button";
import SupplierModal from "@/components/modal/SupplierModal";
import { Supplier } from "@/utils/type";

const Suppliers = () => {
  const [data, setData] = useState<Array<Supplier> | null>(null);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [editData, setEditData] = useState<Supplier | null>(null);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch("api/suppliers");
      const data = await response.json();
      setData(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSupplier = async (id: number) => {
    try {
      await fetch(`api/suppliers/${id}`, {
        method: "DELETE",
      });
      fetchSuppliers();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleSupplierModalClose = () => {
    setShowSupplierModal(false);
    fetchSuppliers();
  };

  return (
    <>
      <div className="main-container mr-3">
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="header-text">SUPPLIER LIST</h3>
              </div>
              <div className="relative w-full max-w-full flex-grow flex-1 text-right">
                <Button
                  onClick={() => setShowSupplierModal(true)}
                  label="ADD SUPPLIER"
                  bgColor="bg-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse ">
              <thead>
                <tr>
                  <th className="th-text">ID</th>
                  <th className="th-text">Name</th>
                  <th className="th-text">Address</th>
                  <th className="th-text">Email</th>
                  <th className="th-text">Action</th>
                </tr>
              </thead>

              <tbody>
                {data?.map((supplier) => (
                  <tr key={supplier.id_suplier}>
                    <td className="td-text text-left">{supplier.id_suplier}</td>
                    <td className="td-text">{supplier.nama_suplier}</td>
                    <td className="td-text">{supplier.alamat}</td>
                    <td className="td-text">{supplier.email}</td>
                    <td className="td-text">
                      <div className="flex gap-4">
                        <Button
                          onClick={() => {
                            setEditData(supplier);
                            setShowSupplierModal(true);
                          }}
                          label="Edit"
                          bgColor="bg-indigo-800"
                        />
                        <Button
                          onClick={() => deleteSupplier(supplier.id_suplier)}
                          label="Delete"
                          bgColor="bg-gray-600"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <SupplierModal
        isVisible={showSupplierModal}
        close={handleSupplierModalClose}
        editData={editData}
      />
    </>
  );
};

export default Suppliers;
