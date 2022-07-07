import { ProductModel } from "./daos/products.dao";
import express from "express";
import multerUploadService from "../common/services/multer.service";

const router = express.Router();

router.post(
  "/",
  multerUploadService.array("images", 5),
  async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    let newProduct = new ProductModel({
      name: req.body.name,
      price: req.body.price,
      images: req.files,
    });
    await newProduct.save();
    res.send(newProduct);
  }
);
export { router as ProductRoutes };
