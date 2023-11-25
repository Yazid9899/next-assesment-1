export type Supplier = {
  id_suplier: number;
  nama_suplier: string;
  alamat: string;
  email: string;
};

export type SupplierResponse = {
  data: Supplier[];
  message: string | any;
};

export type Product = {
  nama: string
  deskkripsi: string
  harga: number
  stok: number
  foto: string
  suplier_id: number
}

export type ProductResponse = {
  data: Product[];
  message: string;
};

export type ErrorResponse = {
  message: string;
};