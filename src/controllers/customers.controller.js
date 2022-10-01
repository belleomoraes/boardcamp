import connection from "../database/db.js";

async function AddCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;

  const isCustomerExists = await connection.query("SELECT * FROM customers WHERE cpf = $1", [cpf]);

  if (isCustomerExists.rows.length !== 0) {
    return res.status(409).send({ message: "Este cpf já está cadastrado" });
  }
  try {
    const customerInsertion = await connection.query(
      'INSERT INTO customers ("name", "phone", "cpf", "birthday") VALUES ($1, $2, $3, $4)',
      [name, phone, cpf, birthday]
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function Showcustomers(req, res) {
  const { cpfQuery } = req.query;

  if (cpfQuery) {
    try {
      const selectedCustomers = await connection.query(
        `SELECT * FROM customers WHERE cpf LIKE "${cpfQuery}%"`
      );
      return res.status(201).send(selectedCustomers.rows);
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
  try {
    const allcustomers = await connection.query("SELECT * FROM customers");
    res.status(201).send(allcustomers.rows);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function ShowSelectedCustomerById(req, res) {
  const { idCustomer } = req.query;

  try {
    const selectedCustomers = await connection.query("SELECT * FROM customers WHERE id = $1", [
      idCustomer,
    ]);
    if (selectedCustomers.rows.length === 0) {
      return res.status(404).send({ message: "Este usuário não existe" });
    }
    res.status(201).send(selectedCustomers.rows);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

export { AddCustomer, Showcustomers, ShowSelectedCustomerById };
