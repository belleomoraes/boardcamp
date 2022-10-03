import connection from "../../database/db.js";
async function isGameExists(req, res, next) {
    const { name } = req.body;
  
  const isGameExists = await connection.query("SELECT * FROM games WHERE name = $1", [name]);

  if (isGameExists.rows.length !== 0) {
    return res.status(409).send({ message: "Este jogo já existe" });
  }
      
    next();
  
}

export default isGameExists