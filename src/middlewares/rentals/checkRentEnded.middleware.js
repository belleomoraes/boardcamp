import connection from "../../database/db.js";
async function isRentFinished(req, res, next) {
    const { id } = req.params;

    const selectedRentals = await connection.query("SELECT * FROM rentals WHERE id = $1", [id]);
  
    if (selectedRentals.rows[0].returnDate !== null && selectedRentals.rows[0].delayFee === 0) {
      return res.status(400).send({ message: "Este aluguel já foi finalizado" });
    }
      
    next();
  
}

export default isRentFinished