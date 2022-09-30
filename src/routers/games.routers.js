import express from 'express'
import { AddGame, ShowGames } from '../controllers/games.controller.js';
import validateGameSchema from '../middlewares/games.middleware.js'

const router = express.Router()
router.get("/games", ShowGames)
router.post("/games", validateGameSchema, AddGame);


export default router;