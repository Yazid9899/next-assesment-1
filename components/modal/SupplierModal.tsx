import { Supplier } from "@/utils/type";
import React, { useState, useEffect, ChangeEvent } from "react";
import Button from "@/components/Button";
import InputText from "@/components/InputText";

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
    const { alamat, email, nama_suplier } = supplierForm;

    if (!alamat || !email || !nama_suplier) {
      alert("Please fill in all the required fields.");
      return;
    }

    try {
      const method = editData ? "PATCH" : "POST";
      const apiUrl = editData
        ? `api/suppliers/${editData.id_suplier}`
        : "api/suppliers";

      const response = await fetch(apiUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(supplierForm),
      });

      if (response.ok) {
        close();
        clearForm();
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (editData) {
      setSupplierForm({
        nama_suplier: editData.nama_suplier,
        alamat: editData.alamat,
        email: editData.email,
      });
    } else {
      clearForm();
    }
  }, [editData]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="md:w-[600px] w-[90%] flex flex-col">
        <div className=" maxx-w-xs place-self-end">
          <Button
            onClick={() => {
              close();
            }}
            label="X"
            bgColor="bg-red-500"
          />
        </div>
        <form
          onSubmit={handleSubmit}
          className="w-full bg-white p-5 px-9 mx-auto rounded-lg"
        >
          <h1 className="text-5xl mb-4 font-extrabold text-gray-700 leading-[120%]">
            Supplier Form
          </h1>

          <InputText
            onChange={handleChange}
            value={supplierForm.nama_suplier}
            type="text"
            name="nama_suplier"
            label="Supplier Name"
            placeholder="nama supplier"
          />

          <div className="flex justify-between gap-5">
            <InputText
              onChange={handleChange}
              value={supplierForm.alamat}
              type="text"
              name="alamat"
              label="Address"
              placeholder="Alamat Suplier"
              style="w-full"
            />
            <InputText
              onChange={handleChange}
              value={supplierForm.email}
              type="text"
              name="email"
              label="Email"
              placeholder="example@example.com"
              style="w-full"
            />
          </div>
          <Button
            submit={true}
            onClick={() => {}}
            label={editData ? "Save Changes" : "Add Supplier"}
            bgColor="bg-indigo-500"
          />
        </form>
      </div>
    </div>
  );
};

export default SupplierModal;
