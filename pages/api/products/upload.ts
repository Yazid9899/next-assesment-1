import formidable from 'formidable'
import fs from 'fs/promises';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import path from 'path';

export const config = {
  api : {
    bodyParser: false,
  }
}
 
const readFile = (req: NextApiRequest, saveLocally: boolean )
:Promise<{ fields: formidable.Fields; files: formidable.Files}> => {
  const option: formidable.Options = {};
  if (saveLocally) {
    
    option.uploadDir = path.join(process.cwd(), "public/uploads/products")
    option.filename = (name, ext, path, form) => {
      console.log(path.originalFilename);
      console.log("ASDASDASDASD");
      console.log(name);
      return name + ".jpg";
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
  try {
    await fs.readdir(path.join(process.cwd() + "/public", "/uploads", "/products"))
  } catch (error) {
    console.log(error);
    await fs.mkdir(path.join(process.cwd() + "/public", "/uploads", "/products"))
  }
    const data = await readFile(req, true);
    res.status(200).json({
      data: data,
      message: "uploads success" 
    });
    

}

export default handler;
