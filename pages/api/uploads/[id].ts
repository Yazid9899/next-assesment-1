import formidable from 'formidable'
import fs from 'fs/promises';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import path from 'path';

export const config = {
  api : {
    bodyParser: false,
  }
}
type fileName = string
 
const readFile = (req: NextApiRequest, saveLocally: boolean, fileName:any )
:Promise<{ fields: formidable.Fields; files: formidable.Files}> => {
  const option: formidable.Options = {};
  if (saveLocally) {
    option.uploadDir = path.join(process.cwd(), "public/uploads/products")
    option.filename = (name, ext, path, form) => {
    return fileName + ".jpg"
    }
  }
  

  const form = formidable(option);

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    })
  })
}

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST"){
  try {
    console.log("SSSSSSSSSSSSSSSSSSSSSSSSSSSs");
    await fs.readdir(path.join(process.cwd() + "/public", "/uploads", "/products"))
  } catch (error) {
    console.log(error);
    await fs.mkdir(path.join(process.cwd() + "/public", "/uploads", "/products"))
  }
  try {
    const fileName= req.query.id;
      await readFile(req, true, fileName);
    
      res.status(200).json({
        message: "uploads success" 
      });
    
  } catch (error) {
    console.log(error);
    console.error(error);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
}
}

export default handler;
