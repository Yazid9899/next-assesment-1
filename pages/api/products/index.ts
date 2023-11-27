import type { NextApiRequest, NextApiResponse } from 'next'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import errorHandling from '@/utils/errorHandling'
import { ErrorResponse, ProductResponse } from '@/utils/type';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ProductResponse | ErrorResponse>
) {
  try {
    const db = await open({
      filename: 'test.db',
      driver: sqlite3.Database
    })

    if (req.method === "GET"){
      const result = await db.all(`
      SELECT produk.*, suplier.nama_suplier
      FROM produk
      JOIN suplier ON produk.suplier_id = suplier.id_suplier; 
      `)
      await db.close()
  
      res.status(200).json({
        data: result, 
        message: "Fetch Products success" 
      });
    }

    if (req.method === "POST"){
      const { nama, deskripsi, harga, stok, foto, suplier_id } = req.body;
      
      if (!nama || !deskripsi || !harga || !stok || !foto || !suplier_id) throw {name: "input error"}
  
      const insertQuery = await db.run(
        'INSERT INTO produk (nama, deskripsi, harga, stok, foto, suplier_id) VALUES (?, ?, ?, ?, ?, ?)',
        nama,
        deskripsi, 
        harga, 
        stok, 
        foto, 
        suplier_id
      );
      
      const newProduct = await db.get('SELECT * FROM produk WHERE id = ?', insertQuery.lastID);
      await db.close();
        
      res.status(200).json({ 
        data: newProduct,
        message: 'Product Added'
      })
    }
    
  } catch (error) {
    errorHandling(error, res);
  }
}
