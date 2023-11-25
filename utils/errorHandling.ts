import { NextApiResponse } from 'next';
import { ErrorResponse } from '@/types/type'

export default function errorHandling (err: any, res: NextApiResponse<ErrorResponse>): void {
  console.error("Error Handling:", err.name);

  switch (err.name) {

    case "Product Not Found":
      res.status(404).json({
          message: err.name
        });
      break;
    
    case "Supplier Not Found":
      res.status(404).json({
          message: err.name
        });
      break;
    
    case "input error":
      res.status(400).json({
        message: "Please provide values for all required fields."
      })
      break;

    default:
      res.status(500).json({
        message: "Internal Server Error",
      });
      break;
  }
}

