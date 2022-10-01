import connection from "../database/db.js";

async function AddGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  const isCategoryExists = await connection.query("SELECT * FROM categories WHERE id = $1", [
    categoryId,
  ]);
  if (isCategoryExists.rows.length === 0) {
    return res.status(400).send({ message: "Esta categoria de jogo não existe" });
  }
  const isGameExists = await connection.query("SELECT * FROM games WHERE name = $1", [name]);

  if (isGameExists.rows.length !== 0) {
    return res.status(409).send({ message: "Este jogo já existe" });
  }
  try {
    const gameInsertion = await connection.query(
      'INSERT INTO games ("name", "image", "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)',
      [name, image, stockTotal, categoryId, pricePerDay]
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function ShowGames(req, res) {
  const { name } = req.query;

  if (name) {
    try {
      const allGames = await connection.query(
        `SELECT * FROM games WHERE name LIKE '${name[0].toUpperCase()}${name
          .slice(1)
          .toLowerCase()}%'`
      );
      if (allGames.rows.length !== 0) {
        return res.status(201).send(allGames.rows);
      } else
        return res
          .status(400)
          .send({ message: "Não existem jogos cadastrados com estas iniciais" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
  try {
    const allGames = await connection.query(
      'SELECT games.id, games.name, games.image, games."stockTotal", games."categoryId", games."pricePerDay", categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id'
    );
    res.status(201).send(allGames.rows);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

export { AddGame, ShowGames };
