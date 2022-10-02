import express from 'express'
import { DeleteRent, ConcludeRent, ShowRentals, AddRent } from '../controllers/rentals.controller.js';
import validateRentalSchema from '../middlewares/rentals.middleware.js'

const router = express.Router()
router.get("/rentals", ShowRentals)
router.post("/rentals", validateRentalSchema, AddRent);
router.post("/rentals/:id/return", ConcludeRent);
router.delete("/rentals/:id", DeleteRent);

export default router;