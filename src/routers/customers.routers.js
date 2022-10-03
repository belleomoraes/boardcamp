import express from "express";
import { AddCustomer, Showcustomers, ShowSelectedCustomerById, UpdateCustomer } from "../controllers/customers.controller.js";
import validatecustomerschema from "../middlewares/customers/customers.middleware.js";
import isCPFExists from "../middlewares/customers/checkCPF.middleware.js";
import isCustomerExists from "../middlewares/customers/customerExistance.middleware.js";

const router = express.Router();
router.get("/customers", Showcustomers);
router.get("/customers/:idCustomer", ShowSelectedCustomerById);
router.post("/customers", validatecustomerschema, isCPFExists, AddCustomer);
router.put("/customers/:idCustomer", validatecustomerschema, isCPFExists, isCustomerExists, UpdateCustomer);

export default router;
