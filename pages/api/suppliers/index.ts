import type { NextApiRequest, NextApiResponse } from 'next'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import errorHandling from '@/utils/errorHandling'
import { Response,ErrorResponse } from '@/types/type'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | ErrorResponse>
) {
  try {
    const db = await open({
      filename: 'test.db',
      driver: sqlite3.Database
    })

    if (req.method === "GET"){
      const result = await db.all('SELECT * FROM suplier')
      await db.close()
      
      res.status(200).json({
        data: result, 
        message: "fetching supliers success" 
      });
    };

    if (req.method === "POST"){
      const { nama_suplier, alamat, email } = req.body;

      if (!nama_suplier || !alamat || !email) throw {name: "input error"};

      const insertQuery =await db.run(
        'INSERT INTO suplier (nama_suplier, alamat, email) VALUES (?, ?, ?)',
        nama_suplier,
        alamat,
        email
      );
      const newSupplier = await db.get('SELECT * FROM suplier WHERE id_suplier = ?', insertQuery.lastID)
      await db.close()

      res.status(200).json({
        data: newSupplier,
        message: 'Supplier ditambah'
      })
    }

  } catch (error) {
    errorHandling(error, res);
  }
}
