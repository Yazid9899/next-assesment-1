import { Product, Supplier } from "@/utils/type";
import React, { ChangeEvent, useEffect, useState } from "react";

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
  const [data, setData] = useState<Array<Supplier> | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [selectedphoto, setSelectedPhoto] = useState<File>();
  const [productForm, setProductForm] = useState({
    nama: "",
    deskripsi: "",
    harga: "",
    stok: "",
    foto: "",
    suplier_id: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { value, name, type } = e.target;
    let updateValue = value;
    setProductForm((prevProductForm) => {
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
          updateValue = file.name;
        }
      }
      if (name === "harga" || name === "stok") {
        updateValue = value.replace(/[^0-9.]/g, "");
      }
      return {
        ...prevProductForm,
        [name]: updateValue,
      };
    });
  };

  const fetchSupplier = async () => {
    try {
      const response = await fetch("api/suppliers");
      const data = await response.json();
      setData(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!selectedphoto) return;
      const uploadData = new FormData();
      uploadData.append("photo", selectedphoto);
      let jsonResponse;

      if (editData) {
        await fetch(`api/products/${editData.id}`, {
          method: "PATCH",
        });
      } else {
        const response = await fetch("api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productForm),
        });

        jsonResponse = await response.json();
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
    editData
      ? setProductForm({
          nama: editData.nama,
          deskripsi: editData.deskripsi,
          harga: editData.harga.toString(),
          stok: editData.stok.toString(),
          foto: editData.foto,
          suplier_id: editData.suplier_id.toString(),
        })
      : clearForm();
    fetchSupplier();
  }, [editData]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center">
      <div className="md:w-[600px] w-[90%] flex flex-col">
        <button
          onClick={() => {
            close();
            clearForm();
          }}
          className="text-xl text-white place-self-end mr-2 font-semibold hover:text-indigo-600"
        >
          x
        </button>
        <form
          onSubmit={submitForm}
          className="w-full bg-white p-5 px-9 mx-auto rounded-lg"
        >
          <h1 className="text-5xl mb-4 font-extrabold text-gray-700 leading-[120%]">
            Product Form
          </h1>

          <div className="mb-3">
            <label
              htmlFor="nama"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Product Name
            </label>
            <input
              onChange={handleChange}
              value={productForm.nama}
              type="text"
              name="nama"
              id="nama"
              placeholder="Nama Produk"
              className=" mt-1 block w-full rounded-md p-1.5 input-form"
            />
          </div>

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
                className="block w-full rounded-md py-1.5 input-form"
              ></textarea>
            </div>
            <p className="mt-1 text-sm leading-6 text-indigo-600">
              Write a few sentences about this product.
            </p>
          </div>

          <div className="mb-3 flex justify-between">
            <div>
              <label
                htmlFor="harga"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">Rp</span>
                </div>
                <input
                  onChange={handleChange}
                  value={productForm.harga}
                  type="text"
                  name="harga"
                  id="harga"
                  className="block w-full rounded-md py-1.5 pl-9 input-form"
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="stok"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                stock
              </label>
              <div className="relative mt-2 rounded-md shadow-sm">
                <input
                  onChange={handleChange}
                  value={productForm.stok}
                  type="text"
                  name="stok"
                  id="stok"
                  className="block w-full rounded-md border-0 py-1.5 px-2 input-form"
                  placeholder="0"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="suplier_id" className="pl-2">
                supplier
              </label>
              <select
                onChange={handleChange}
                value={productForm.suplier_id}
                id="suplier_id"
                name="suplier_id"
                className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-4 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              >
                {data?.map((supplier) => (
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
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
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
                  <p className="pl-1">/ drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  {productForm?.foto ? productForm.foto : "JPG up to 2MB"}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="place-content-end rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
