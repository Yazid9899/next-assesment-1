import type { NextApiRequest, NextApiResponse } from 'next'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { type } from 'os'
type Supplier = {
  id_suplier: number
  nama_suplier: string
  alamat: string
  email: string
}

type Response = {
  data: Supplier[];
  message: string;
};
type Data = {
  name: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response | Data>
) {
  try {
    const db = await open({
      filename: 'test.db',
      driver: sqlite3.Database
    })
    const result = await db.all('SELECT * FROM suplier')
    await db.close()
    
    res.status(200).json({
      data: result, 
      message: "fetching supliers success" 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({name: "Internal Server Error"});
  }
}
