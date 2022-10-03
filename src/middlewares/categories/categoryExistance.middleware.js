import connection from "../../database/db.js";
async function isCategoryExists(req, res, next) {
  const { name } = req.body;

  const isCategoryExists = await connection.query("SELECT * FROM categories WHERE name = $1", [
    name,
  ]);

  if (isCategoryExists.rows) {
    return res.status(409).send({ message: "Esta categoria já existe" });
  }

  next();
}



export default isCategoryExists;
