import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "@/components/Button";
import InputText from "@/components/InputText";
import { Product, Supplier } from "@/utils/type";

interface ProductModalProps {
  isVisible: boolean;
  close: () => void;
  editData: Product | null;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isVisible,
  close,
  editData,
}) => {
  const [suppliers, setSuppliers] = useState<Array<Supplier> | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<File | null>(null);

  const [productForm, setProductForm] = useState({
    nama: "",
    deskripsi: "",
    harga: "",
    stok: "",
    foto: "",
    suplier_id: "",
  });

  const handleChange = (
    e: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | any
    >
  ) => {
    const { value, name, type } = e.target;

    setProductForm((prevProductForm) => {
      let updatedValue = value;

      if (type === "file" && e.target instanceof HTMLInputElement) {
        const file = e.target.files && e.target.files[0];

        if (file) {
          const fileSizeInMB = file.size / (1024 * 1024);
          const maxFileSize = 2;

          if (fileSizeInMB > maxFileSize) {
            alert("File size exceeds the maximum limit of 2MB.");
            return prevProductForm;
          }

          setSelectedPhoto(file);
          updatedValue = file.name;
        }
      }

      if (name === "harga" || name === "stok") {
        updatedValue = value.replace(/[^0-9.]/g, "");
      }

      return {
        ...prevProductForm,
        [name]: updatedValue,
      };
    });
  };

  const fetchSuppliers = async () => {
    try {
      const response = await fetch("api/suppliers");
      const data = await response.json();
      setSuppliers(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (
        !productForm.nama ||
        !productForm.deskripsi ||
        !productForm.foto ||
        !productForm.harga ||
        !productForm.stok ||
        !productForm.suplier_id
      ) {
        alert("Please fill in all the required fields.");
        return;
      }

      if (editData) {
        await fetch(`api/products/${editData.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productForm),
        });
      } else {
        if (!selectedPhoto) {
          alert("Please select a photo.");
          return;
        }
        const uploadData = new FormData();
        uploadData.append("photo", selectedPhoto);

        const response = await fetch("api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productForm),
        });

        const jsonResponse = await response.json();
        await fetch(`api/uploads/${jsonResponse.data.id}`, {
          method: "POST",
          body: uploadData,
        });
      }

      close();
      clearForm();
    } catch (error) {
      console.error(error);
    }
  };

  const clearForm = () => {
    setProductForm({
      nama: "",
      deskripsi: "",
      harga: "",
      stok: "",
      foto: "",
      suplier_id: "",
    });
  };

  useEffect(() => {
    if (editData) {
      setProductForm({
        nama: editData.nama,
        deskripsi: editData.deskripsi,
        harga: editData.harga.toString(),
        stok: editData.stok.toString(),
        foto: editData.foto,
        suplier_id: editData.suplier_id.toString(),
      });
    } else {
      clearForm();
    }

    fetchSuppliers();
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
          onSubmit={submitForm}
          className="w-full bg-white p-5 px-9 mx-auto rounded-lg"
        >
          <h1 className="text-5xl mb-4 font-extrabold text-gray-700 leading-[120%]">
            Product Form
          </h1>
          <InputText
            onChange={handleChange}
            value={productForm.nama}
            type="text"
            name="nama"
            label="Product Name"
            placeholder="Nama Produk"
          />

          <div className="mb-3">
            <label
              htmlFor="deskripsi"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Description
            </label>
            <div className="mt-1">
              <textarea
                onChange={handleChange}
                value={productForm.deskripsi}
                id="deskripsi"
                name="deskripsi"
                rows={2}
                className="block w-full rounded-md p-1.5 input-form"
              ></textarea>
            </div>
            <p className="mt-1 text-sm leading-6 text-indigo-600">
              Write a few sentences about this product.
            </p>
          </div>

          <div className="mb-3 flex justify-between gap-1">
            <InputText
              onChange={handleChange}
              value={productForm.harga}
              type="text"
              name="harga"
              label="Price"
              placeholder="IDR"
            />

            <InputText
              onChange={handleChange}
              value={productForm.stok}
              type="text"
              name="stok"
              label="Stock"
              placeholder="0"
            />

            <div className="flex flex-col">
              <label
                htmlFor="suplier_id"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                supplier
              </label>
              <select
                onChange={handleChange}
                value={productForm.suplier_id}
                id="suplier_id"
                name="suplier_id"
                className="py-2 px-3 block w-full rounded-md border-0 input-form"
              >
                <option value="">Select here</option>
                {suppliers?.map((supplier) => (
                  <option value={supplier.id_suplier}>
                    {supplier.nama_suplier}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-3">
            <label
              htmlFor="cover-photo"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Product Photo
            </label>
            <div className="mt-1 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                  <label
                    htmlFor="foto"
                    className="relative cursor-pointer bg-white font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="foto"
                      name="foto"
                      type="file"
                      onChange={handleChange}
                      accept=".jpg, .jpeg"
                      className="hidden"
                    />
                  </label>
                  <p className="pl-1">Select a File</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  {productForm?.foto ? productForm.foto : "JPG up to 2MB"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <Button
              submit={true}
              onClick={() => {}}
              label={editData ? "Save Changes" : "Add Product"}
              bgColor="bg-indigo-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
