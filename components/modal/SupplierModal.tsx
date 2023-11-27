import { Supplier } from "@/utils/type";
import React, { useState, useEffect, ChangeEvent } from "react";

interface ProductModalProps {
  isVisible: boolean;
  close: () => void;
  editData: Supplier | any;
}
const SupplierModal: React.FC<ProductModalProps> = ({
  isVisible,
  close,
  editData,
}) => {
  const [supplierForm, setSupplierForm] = useState({
    nama_suplier: "",
    alamat: "",
    email: "",
  });

  const clearForm = () => {
    setSupplierForm({
      nama_suplier: "",
      alamat: "",
      email: "",
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { value, name } = e.target;
    console.log(supplierForm);
    setSupplierForm({
      ...supplierForm,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (!editData) {
        const response = await fetch("api/suppliers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(supplierForm),
        });
      } else {
        const response = await fetch(`api/suppliers/${editData.id_suplier}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(supplierForm),
        });
      }
      close();
      clearForm();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (editData) {
      setSupplierForm({
        nama_suplier: editData.nama_suplier,
        alamat: editData.alamat,
        email: editData.email,
      });
      console.log(supplierForm);
    } else {
      clearForm();
    }
  }, [editData]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="md:w-[600px] w-[90%] flex flex-col">
        <button
          onClick={() => {
            close();
          }}
          className="text-xl text-white place-self-end mr-2 font-semibold hover:text-indigo-600"
        >
          x
        </button>
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white p-5 px-9 mx-auto rounded-lg"
        >
          <h1 className="text-5xl mb-4 font-extrabold text-gray-700 leading-[120%]">
            Supplier Form
          </h1>

          <div className="mb-3">
            <label
              htmlFor="nama_suplier"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Supplier Name
            </label>
            <input
              onChange={handleChange}
              value={supplierForm.nama_suplier}
              type="text"
              name="nama_suplier"
              id="nama_suplier"
              placeholder="nama supplier"
              className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <div className="flex justify-between gap-5">
            <div className="mb-3 w-full">
              <label
                htmlFor="alamat"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Address
              </label>
              <input
                onChange={handleChange}
                value={supplierForm.alamat}
                type="text"
                name="alamat"
                id="alamat"
                placeholder="Jakarta Barat"
                className="px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="mb-3 w-full">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <input
                onChange={handleChange}
                value={supplierForm.email}
                type="email"
                name="email"
                id="email"
                placeholder="example@example.com"
                className=" px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-indigo-500  text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
          >
            save
          </button>
        </form>
      </div>
    </div>
  );
};

export default SupplierModal;
