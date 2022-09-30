import connection from "../database/db.js";

async function AddCostumer(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

  const isGameExists = await connection.query("SELECT * FROM games WHERE name = $1", [name]);

  if (isGameExists.rows.length !== 0) {
    return res.status(409).send({ message: "Este jogo já existe" });
  }
  try {
    const gameInsertion = await connection.query(
      "INSERT INTO games (name, image, stockTotal, categoryId, pricePerDay) VALUES ($1, $2, $3, $4, $5)",
      [name, image, stockTotal, categoryId, pricePerDay]
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
      const selectedCostumers = await connection.query(
        `SELECT * FROM customers WHERE cpf LIKE "${cpfQuery}%"`
      );
      return res.status(201).send(selectedCostumers.rows);
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
      const selectedCustomers = await connection.query("SELECT * FROM customers WHERE id = $1", [idCustomer]);
      if (selectedCustomers.rows.length === 0) {
        return res.status(404).send({message: "Este usuário não existe"})
      }
      res.status(201).send(selectedCustomers.rows);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

export { AddCostumer, Showcustomers, ShowSelectedCustomerById };
