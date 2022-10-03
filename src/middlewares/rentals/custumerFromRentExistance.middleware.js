import connection from "../../database/db.js";
async function isCustomerExists(req, res, next) {
  const { customerId } = req.body;
  const isCustomerExists = await connection.query("SELECT * FROM customers WHERE id = $1", [
    customerId,
  ]);
  if (isCustomerExists.rows.length === 0) {
    return res.status(400).send({ message: "Este cliente não existe" });
  }

  next();
}

export default isCustomerExists;
