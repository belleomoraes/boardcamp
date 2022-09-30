import express from 'express'
import { AddCategory, ShowCategories } from '../controllers/categories.controller.js';
import validateCategorySchema from '../middlewares/categories.middleware.js'

const router = express.Router()
router.get("/categories", ShowCategories)
router.post("/categories", validateCategorySchema, AddCategory);


export default router;