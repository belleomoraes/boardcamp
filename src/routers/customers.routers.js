import express from "express";
import { AddCustomer, Showcustomers, ShowSelectedCustomerById } from "../controllers/customers.controller.js";
import validatecustomerschema from "../middlewares/customers.middleware.js";

const router = express.Router();
router.get("/customers", Showcustomers);
router.get("/customers/:idCustomer", ShowSelectedCustomerById);
router.post("/customers", validatecustomerschema, AddCustomer);
//router.put("/customers", validatecustomerschema, RefreshCostumer);

export default router;
