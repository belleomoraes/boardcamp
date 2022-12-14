import express from "express";
import cors from "cors";
import categoriesRouter from './routers/categories.routers.js'
import gamesRouter from './routers/games.routers.js'
import customersRouter from './routers/customers.routers.js'
import rentalsRouter from './routers/rentals.routers.js'


const server = express();

server.use(cors());
server.use(express.json());

server.use(categoriesRouter);
server.use(gamesRouter);
server.use(customersRouter);
server.use(rentalsRouter);

const port = process.env.PORT || 4000;
 
server.listen(port,
  ()=> { console.log("Server running on port " + port); });
