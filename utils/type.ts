export interface Supplier {
  id_suplier: number;
  nama_suplier: string;
  alamat: string;
  email: string;
};

export interface SupplierResponse {
  data: Supplier[];
  message: string | any;
};

export interface Product {
  id: number
  nama: string
  deskripsi: string
  harga: number
  stok: number
  foto: string
  suplier_id: number
}

export interface ProductResponse {
  data: Product[];
  message: string;
};

export interface ErrorResponse {
  message: string;
};