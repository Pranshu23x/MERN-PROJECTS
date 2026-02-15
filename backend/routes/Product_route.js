
import express from "express"
import { Router } from "express"

import {getProducts ,createProduct,deleteProduct,updateProduct} from "../controller/product_controller.js"
const routes= express.Router();

routes.get("/" ,getProducts)
routes.post("/" , createProduct)
routes.put("/:id" ,updateProduct)
routes.delete("/:id" , deleteProduct)

export default routes;




