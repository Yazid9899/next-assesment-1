export type Supplier = {
  id_suplier: number;
  nama_suplier: string;
  alamat: string;
  email: string;
};

export type Response = {
  data: Supplier[];
  message: string | any;
};

export type ErrorResponse = {
  message: string;
};