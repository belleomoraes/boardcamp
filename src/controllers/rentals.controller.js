import connection from "../database/db.js";
import dayjs from "dayjs";

async function AddRent(req, res) {
  const { customerId, gameId, daysRented } = req.body;
  const isCustomerExists = await connection.query("SELECT * FROM customers WHERE id = $1", [
    customerId,
  ]);
  if (isCustomerExists.rows.length === 0) {
    return res.status(400).send({ message: "Este cliente não existe" });
  }
  const isGameExists = await connection.query("SELECT * FROM games WHERE id = $1", [gameId]);

  if (isGameExists.rows.length === 0) {
    return res.status(409).send({ message: "Este jogo não existe" });
  }

  if (isGameExists.rows[0].stockTotal === 0) {
    res.status(400).send({ message: "Este jogo não está disponível" });
  }
  const rentDate = dayjs().format("YYYY/M/D");
  const gamePrice = await connection.query('SELECT "pricePerDay" FROM games WHERE id = $1', [
    gameId,
  ]);
  const originalPrice = gamePrice.rows[0].pricePerDay * daysRented;

  try {
    const rentInsertion = await connection.query(
      'INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [customerId, gameId, daysRented, rentDate, originalPrice, null, null]
    );
    const updatedStock = isGameExists.rows[0].stockTotal - 1
    const updateGame = await connection.query(`UPDATE games SET "stockTotal" = $1 WHERE id = $2`,
    [updatedStock, gameId])
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
        'SELECT rentals.id, rentals."customerId", rentals."gameId", rentals."daysRented", rentals."rentDate", rentals."originalPrice", rentals."returnDate", rentals."delayFee", customers.id AS "customerId", customers.name, games.id AS "gameId", games.name, games."categoryId" FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id WHERE rentals."customerId" = $1',
        [customerId]
      );
      if (selectedRentals.rows.length !== 0) {
        return res.status(201).send(selectedRentals.rows);
      } else return res.status(400).send({ message: "Este usuário ainda não alugou um jogo" });
    } catch (error) {
      console.log(error)
      return res.status(500).send({ message: error.message });
    }
  }

  if (gameId) {
    try {
      const selectedRentals = await connection.query(
        'SELECT rentals.id, rentals."customerId", rentals."gameId", rentals."daysRented", rentals."rentDate", rentals."originalPrice", rentals."returnDate", rentals."delayFee", customers.id AS "customerId", customers.name, games.id AS "gameId", games.name, games."categoryId" FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id WHERE rentals."gameId" = $1',
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
      'SELECT rentals.id, rentals."customerId", rentals."gameId", rentals."daysRented", rentals."rentDate", rentals."originalPrice", rentals."returnDate", rentals."delayFee", customers.id AS "customerId", customers.name, games.id AS "gameId", games.name, games."categoryId" FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id'
    );

    res.status(201).send(allRentals.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}

async function ConcludeRent(req, res) {
  const { id } = req.params;

  const selectedRentals = await connection.query("SELECT * FROM rentals WHERE id = $1", [id]);

  if (selectedRentals.rows[0].returnDate === null && selectedRentals.rows[0].delayFee === 0) {
    return res.status(400).send({ message: "Este aluguel já foi finalizado" });
  }

  if (selectedRentals.rows.length === 0) {
    return res.status(404).send({ message: "Este aluguel não existe" });
  }
  const diasAlugados = (Date.now() - selectedRentals.rows[0].rentDate) / 1000 / 60 / 60 / 24;
  const dateToday = dayjs().format("YYYY-M-D");
  let debt;

  if (diasAlugados <= selectedRentals.rows[0].daysRented) {
    debt = 0;
  }
  if (diasAlugados > selectedRentals.rows[0].daysRented) {
    debt =
      (diasAlugados - parseInt(selectedRentals.rows[0].daysRented)) *
      selectedRentals.rows[0].delayFee;
  }

  try {
    const updatedData = await connection.query(
      `UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3  `,
      [dateToday, debt, id]
    );
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}

async function DeleteRent(req, res) {
  const { id } = req.params;
  const selectedRent = await connection.query("SELECT * FROM rentals WHERE id = $1", [id]);

  if (selectedRent.rows.length === 0) {
    return res.status(404).send({ message: "Este aluguel não existe" });
  }

  if (selectedRent.rows[0].returnDate !== null || selectedRent.rows[0].delayFee !== 0) {
    return res.status(400).send({ message: "Este aluguel ainda não foi finalizado" });
  }
  try {
    const deletedData = await connection.query("DELETE FROM rentals WHERE id = $1 LIMIT 1", [id]);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}
export { DeleteRent, ConcludeRent, ShowRentals, AddRent };
