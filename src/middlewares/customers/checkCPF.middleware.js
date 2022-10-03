import connection from "../../database/db.js";
async function isCPFExists(req, res, next) {
  const { cpf } = req.body;

  const isCustomerExists = await connection.query("SELECT * FROM customers WHERE cpf = $1", [cpf]);

  if (isCustomerExists.rows.length !== 0) {
    return res.status(409).send({ message: "Este cpf já está cadastrado" });
  }
  next();
}

export default isCPFExists;
