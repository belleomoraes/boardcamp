import express from "express";
import cors from "cors";
import categoriesRouter from './routers/categories.routers.js'
import connection from "./database/db.js";

const server = express();

server.use(cors());
server.use(express.json());

server.use(categoriesRouter)

const port = process.env.PORT || 4000;
 
server.listen(port,
  ()=> { console.log("Server running on port " + port); });
