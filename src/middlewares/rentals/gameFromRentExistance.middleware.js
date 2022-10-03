import connection from "../../database/db.js";
async function isGameExists(req, res, next) {
  const { gameId } = req.body;

  const isGameExists = await connection.query("SELECT * FROM games WHERE id = $1", [gameId]);

  if (isGameExists.rows.length === 0) {
    return res.status(409).send({ message: "Este jogo não existe" });
  }

  if (isGameExists.rows[0].stockTotal === 0) {
    res.status(400).send({ message: "Este jogo não está disponível" });
  }

  next();
}

export default isGameExists;
