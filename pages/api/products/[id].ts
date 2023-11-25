import type { NextApiRequest, NextApiResponse } from 'next'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import errorHandling from '@/utils/errorHandling'
import { ErrorResponse, ProductResponse } from '@/types/type';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductResponse | ErrorResponse>
) {
  try {
    const { id } = req.query;
    const db = await open({
      filename: 'test.db',
      driver: sqlite3.Database,
    });

    const product = await db.get('SELECT * FROM produk WHERE id = ?', id);
    if (!product) throw {name: "Product Not Found"};

    if (req.method === "GET") {
      await db.close();
      res.status(200).json({
        data: product, 
        message: "Product Found"
      });
    };

    if (req.method === "DELETE") {
      await db.run('DELETE FROM produk WHERE id = ?', id);

      await db.close();

      res.status(200).json({ 
        data: product,
        message: `Product ${product.name} deleted successfully` 
      });
    };

    if (req.method === "PATCH") {
      const { nama, deskripsi, harga, stok, foto, suplier_id } = req.body;

      if (!nama || !deskripsi || !harga || !stok || !foto || !suplier_id) throw {name: "input error"};

      await db.run(
        'UPDATE produk SET nama = ?, deskripsi = ?, harga = ?, stok = ?, foto = ?, suplier_id = ? WHERE id = ?',
        [nama, deskripsi, harga, stok, foto, suplier_id, id]
      );

      const updatedProduct = await db.get('SELECT * FROM produk WHERE id = ?', id);
      await db.close();
  
      res.status(200).json({ 
          data: updatedProduct, 
          message: `Product with id ${id} updated successfully` 
      });
    };

  } catch (error) {
    errorHandling(error, res);
  }
}