import type { NextApiRequest, NextApiResponse } from 'next'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import errorHandling from '@/utils/errorHandling'
import { ErrorResponse, SupplierResponse } from '@/utils/type';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SupplierResponse | ErrorResponse>
) {
  try {
    const { id } = req.query;
    const db = await open({
      filename: 'test.db',
      driver: sqlite3.Database,
    });

    const supplier = await db.get('SELECT * FROM suplier WHERE id_suplier = ?', id);
    if (!supplier) throw {name: "Supplier Not Found"};

    if (req.method === "GET") {
      await db.close();
      res.status(200).json({
        data: supplier,
        message: "Supplier Found"
      })
    };

    if (req.method === "DELETE") {
      await db.run('DELETE FROM suplier WHERE id_suplier = ?', id);

      await db.close();

      res.status(200).json({ 
        data: supplier,
        message: `${supplier.nama_suplier} successfully deleted`
      });
    };

    if (req.method === "PATCH") {
      const { nama_suplier, alamat, email } = req.body;
      const { id } = req.query;

      await db.run(
        'UPDATE suplier SET nama_suplier = ?, alamat = ?, email = ? WHERE id_suplier = ?',
        [nama_suplier, alamat, email, id]
      );
      
      const updatedSupplier = await db.get('SELECT * FROM suplier WHERE id_suplier = ?', id);
      await db.close();
  
      res.status(200).json({ 
        data: updatedSupplier,
        message: `Supplier with id ${id} successfully updated` 
      });
  };

  } catch (error) {
    errorHandling(error, res);
  }
}
