import connection from "../database/db.js";
import dayjs from 'dayjs'

async function AddRent(req, res) {
  const { customerId, gameId, daysRented } = req.body;
  const isCustomerExists = await connection.query('SELECT * FROM customers WHERE id = $1', [
    customerId,
  ]);
  if (isCustomerExists.rows.length === 0) {
    return res.status(400).send({ message: "Esta cliente não existe" });
  }
  const isGameExists = await connection.query('SELECT * FROM games WHERE id = $1', [gameId]);

  if (isGameExists.rows.length === 0) {
    return res.status(409).send({ message: "Este jogo não existe" });
  }

  const gameStock = await connection.query('SELECT "stockTotal" FROM games WHERE id = $1', [gameId]);

  if(gameStock.rows === 0) {
    res.status(400).send({message: "Este jogo não está disponível"})
  }
  const rentDate = dayjs().format("YYYY/M/D")
  const gamePrice = await connection.query('SELECT "pricePerDay" FROM games WHERE id = $1', [gameId]);
  const originalPrice = gamePrice.rows[0].pricePerDay * daysRented
 
  try {
    const rentInsertion = await connection.query(
      'INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [customerId, gameId, daysRented, rentDate, originalPrice, null, null]
    );
    res.sendStatus(201);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function ShowRentals(req, res) {
  const { customerId, gameId } = req.query;

  if (customerId) {
    try {
      const selectedRentals = await connection.query(
        'SELECT * FROM rentals JOIN customers ON rentals."customerId" = customer.id JOIN games ON rentals."gameId" = game.id WHERE rentals.customerId = $1',
        [customerId]
      );
      if (selectedRentals.rows.length !== 0) {
        return res.status(201).send(selectedRentals.rows);
      } else return res.status(400).send({ message: "Este usuário ainda não alugou um jogo" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }

  if (gameId) {
    try {
      const selectedRentals = await connection.query(
        'SELECT * FROM rentals JOIN customers ON rentals."customerId" = customer.id JOIN games ON rentals."gameId" = game.id WHERE rentals.gameId = $1',
        [gameId]
      );
      if (selectedRentals.rows.length !== 0) {
        return res.status(201).send(selectedRentals.rows);
      } else return res.status(400).send({ message: "Este usuário ainda não alugou um jogo" });
    } catch (error) {
      return res.status(500).send({ message: error.message });
    }
  }
  try {
    const allRentals = await connection.query(
      'SELECT * FROM rentals'
    );
    res.status(201).send(allRentals.rows);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function ConcludeRent(req, res) {
  const { idCustomer } = req.params;
  const { name, phone, cpf, birthday } = req.body;

  const selectedCustomers = await connection.query("SELECT * FROM customers WHERE id = $1", [
    idCustomer,
  ]);

  if (selectedCustomers.rows.length === 0) {
    return res.status(404).send({ message: "Este usuário não existe" });
  }

  const isCustomerExists = await connection.query("SELECT * FROM customers WHERE cpf = $1", [cpf]);

  if (isCustomerExists.rows.length !== 0) {
    return res.status(409).send({ message: "Este cpf já está cadastrado" });
  }

  try {
    const updatedData = await connection.query(
      `UPDATE customers SET name = '${name}', phone = '${phone}', cpf = '${cpf}', birthday = '${birthday}' WHERE id = $1`,
      [idCustomer]
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}

async function DeleteRent(req, res) {
  const { idCustomer } = req.params;
  const { name, phone, cpf, birthday } = req.body;

  const selectedCustomers = await connection.query("SELECT * FROM customers WHERE id = $1", [
    idCustomer,
  ]);

  if (selectedCustomers.rows.length === 0) {
    return res.status(404).send({ message: "Este usuário não existe" });
  }

  const isCustomerExists = await connection.query("SELECT * FROM customers WHERE cpf = $1", [cpf]);

  if (isCustomerExists.rows.length !== 0) {
    return res.status(409).send({ message: "Este cpf já está cadastrado" });
  }

  try {
    const updatedData = await connection.query(
      `UPDATE customers SET name = '${name}', phone = '${phone}', cpf = '${cpf}', birthday = '${birthday}' WHERE id = $1`,
      [idCustomer]
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}
export { DeleteRent, ConcludeRent, ShowRentals, AddRent };
