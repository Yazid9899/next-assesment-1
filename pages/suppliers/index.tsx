import SideBar from "@/components/SideBar";
import SupplierModal from "@/components/modal/SupplierModal";
import { Supplier } from "@/utils/type";
import React, { useState, useEffect } from "react";

const Suppliers = () => {
  const [data, setData] = useState<Array<Supplier> | null>(null);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [editData, setEditData] = useState<Supplier | null>(null);
  const fetchSupplier = async () => {
    try {
      const response = await fetch("api/suppliers");
      const data = await response.json();
      setData(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteSupplier = async (id: number) => {
    try {
      const response = await fetch(`api/suppliers/${id}`, {
        method: "DELETE",
      });
      fetchSupplier();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchSupplier();
  }, []);

  return (
    <>
      <div className="ml-5">
        <div className="w-full  mb-12 px-4 mx-auto mt-24">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-5xl text-blueGray-700">
                    SUPPLIER LIST
                  </h3>
                </div>
                <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                  <button
                    className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                      setShowSupplierModal(true);
                    }}
                  >
                    Add supplier
                  </button>
                </div>
              </div>
            </div>

            <div className="block w-full overflow-x-auto">
              <table className="items-center bg-transparent w-full border-collapse ">
                <thead>
                  <tr>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      id
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Name
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      Address
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                      email
                    </th>
                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>
                  </tr>
                </thead>

                <tbody>
                  {data?.map((supplier) => (
                    <tr key={supplier.id_suplier}>
                      <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                        {supplier.id_suplier}
                      </th>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                        {supplier.nama_suplier}
                      </td>
                      <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {supplier.alamat}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        {supplier.email}
                      </td>
                      <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                        <div className="flex justify-end gap-4">
                          <button
                            onClick={() => {
                              setEditData(supplier);
                              setShowSupplierModal(true);
                            }}
                            className="bg-indigo-900 text-white active:bg-indigo-600 text-xs font-bold px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          >
                            edit
                          </button>
                          <button
                            onClick={() => {
                              deleteSupplier(supplier.id_suplier);
                            }}
                            className="bg-gray-500 text-white active:bg-indigo-600 text-xs font-bold px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                          >
                            delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <SupplierModal
        isVisible={showSupplierModal}
        close={() => {
          setShowSupplierModal(false);
          fetchSupplier();
        }}
        editData={editData}
      />
    </>
  );
};

export default Suppliers;
