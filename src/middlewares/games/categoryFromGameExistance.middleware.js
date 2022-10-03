import connection from "../../database/db.js";
async function isCategoryExists(req, res, next) {
    const { categoryId } = req.body;
    const isCategoryExists = await connection.query("SELECT * FROM categories WHERE id = $1", [
      categoryId,
    ]);
    if (isCategoryExists.rows.length === 0) {
      return res.status(400).send({ message: "Esta categoria de jogo não existe" });
    }

  next();
}



export default isCategoryExists;