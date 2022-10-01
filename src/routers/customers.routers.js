import express from "express";
import { AddCustomer, Showcustomers, ShowSelectedCustomerById, UpdateCustomer } from "../controllers/customers.controller.js";
import validatecustomerschema from "../middlewares/customers.middleware.js";

const router = express.Router();
router.get("/customers", Showcustomers);
router.get("/customers/:idCustomer", ShowSelectedCustomerById);
router.post("/customers", validatecustomerschema, AddCustomer);
router.put("/customers/:idCustomer", validatecustomerschema, UpdateCustomer);

export default router;
