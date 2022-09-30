import express from "express";
import { AddCostumer, Showcustomers, ShowSelectedCustomerById } from "../controllers/customers.controller.js";
import validatecustomerschema from "../middlewares/customers.middleware.js";

const router = express.Router();
router.get("/customers", Showcustomers);
router.get("/customers/:idCustomer", ShowSelectedCustomerById);
router.post("/customers", validatecustomerschema, AddCostumer);
//router.put("/customers", validatecustomerschema, RefreshCostumer);

export default router;
