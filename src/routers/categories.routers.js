import express from "express";
import { AddCategory, ShowCategories } from "../controllers/categories.controller.js";
import validateCategorySchema from "../middlewares/categories/categories.middleware.js";
import isCategoryExists from "../middlewares/categories/categoryExistance.middleware.js";

const router = express.Router();
router.get("/categories", ShowCategories);
router.post("/categories", validateCategorySchema, isCategoryExists, AddCategory);

export default router;
