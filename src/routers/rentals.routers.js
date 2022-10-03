import express from 'express'
import { DeleteRent, ConcludeRent, ShowRentals, AddRent } from '../controllers/rentals.controller.js';
import validateRentalSchema from '../middlewares/rentals/rentals.middleware.js'
import isCustomerExists from '../middlewares/rentals/custumerFromRentExistance.middleware.js';
import isGameExists from '../middlewares/rentals/gameFromRentExistance.middleware.js';
import isRentExists from '../middlewares/rentals/rentExistance.middleware.js';
import isRentFinished from '../middlewares/rentals/checkRentEnded.middleware.js';

const router = express.Router()
router.get("/rentals", ShowRentals)
router.post("/rentals", validateRentalSchema, isCustomerExists, isGameExists, AddRent);
router.post("/rentals/:id/return", isRentExists,isRentFinished, ConcludeRent);
router.delete("/rentals/:id", DeleteRent);

export default router;