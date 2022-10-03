import connection from "../../database/db.js";
async function isRentExists(req, res, next) {
  const { id } = req.params;

  const selectedRentals = await connection.query("SELECT * FROM rentals WHERE id = $1", [id]);

  if (selectedRentals.rows.length === 0) {
    return res.status(404).send({ message: "Este aluguel não existe" });
  }

  next();
}

export default isRentExists;
