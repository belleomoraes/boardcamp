import express from "express";
import { AddGame, ShowGames } from "../controllers/games.controller.js";
import validateGameSchema from "../middlewares/games/games.middleware.js";
import isCategoryExists from "../middlewares/games/categoryFromGameExistance.middleware.js";
import isGameExists from "../middlewares/games/gameExistance.middleware.js";
const router = express.Router();
router.get("/games", ShowGames);
router.post("/games", validateGameSchema, isCategoryExists, isGameExists, AddGame);

export default router;
