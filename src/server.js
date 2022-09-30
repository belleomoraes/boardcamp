import express from "express";
import cors from "cors";
import connection from "./database/db.js";

const server = express();

server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.send("ok");
});

server.post('/', async (req, res) => {
  const { name } = req.body
  const categorias = await connection.query('INSERT INTO categories (name) VALUES ($1)', [name]) 
  res.send("lalala")
  })

const port = process.env.PORT || 4000;
 
server.listen(port,
  ()=> { console.log("Server running on port " + port); });
