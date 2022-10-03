import connection from "../database/db.js";
import dayjs from "dayjs";

async function AddRent(req, res) {
  const { customerId, gameId, daysRented } = req.body;
  const rentDate = dayjs().format("YYYY/M/D");
  const gamePrice = await connection.query('SELECT "pricePerDay" FROM games WHERE id = $1', [
    gameId,
  ]);
  const originalPrice = gamePrice.rows[0].pricePerDay * daysRented;
  const isGameExists = await connection.query("SELECT * FROM games WHERE name = $1", [gameId]);
  try {
    const rentInsertion = await connection.query(
      'INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [customerId, gameId, daysRented, rentDate, originalPrice, null, null]
    );
    const updatedStock = isGameExists.rows[0].stockTotal - 1;
    const updateGame = await connection.query(`UPDATE games SET "stockTotal" = $1 WHERE id = $2`, [
      updatedStock,
      gameId,
    ]);
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
        `SELECT rentals.*, JSON_BUILD_OBJECT('id', customers.id, 'name', customers.name) AS customer, JSON_BUILD_OBJECT('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id JOIN categories ON games."categoryId" = categories.id WHERE rentals."customerId" = $1`,
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
        `SELECT rentals.*, JSON_BUILD_OBJECT('id', customers.id, 'name', customers.name) AS customer, JSON_BUILD_OBJECT('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id JOIN categories ON games."categoryId" = categories.id WHERE rentals."gameId" = $1`,
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
      `SELECT rentals.*, JSON_BUILD_OBJECT('id', customers.id, 'name', customers.name) AS customer, JSON_BUILD_OBJECT('id', games.id, 'name', games.name, 'categoryId', games."categoryId", 'categoryName', categories.name) AS game FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id JOIN categories ON games."categoryId" = categories.id`
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

  const pricePerDayRented = await connection.query(
    'SELECT "pricePerDay" FROM games WHERE id = $1',
    [selectedRentals.rows[0].gameId]
  );
  const numberDaysRented = (Date.now() - selectedRentals.rows[0].rentDate) / 1000 / 60 / 60 / 24;
  const dateToday = dayjs().format("YYYY-M-D");
  let debt;

  if (numberDaysRented <= selectedRentals.rows[0].daysRented) {
    debt = 0;
  }
  if (numberDaysRented > selectedRentals.rows[0].daysRented) {
    debt =
      (numberDaysRented - parseInt(selectedRentals.rows[0].daysRented)) *
      pricePerDayRented.rows[0].pricePerDay;
  }

  const gameRent = await connection.query("SELECT * FROM games WHERE id = $1", [
    selectedRentals.rows[0].gameId,
  ]);
  const newStock = gameRent.rows[0].stockTotal + 1;
  try {
    const updatedDataRent = await connection.query(
      `UPDATE rentals SET "returnDate" = $1, "delayFee" = $2 WHERE id = $3  `,
      [dateToday, debt, id]
    );

    const updatedDataGame = await connection.query(
      `UPDATE games SET "stockTotal" = $1 WHERE id = $2  `,
      [newStock, selectedRentals.rows[0].gameId]
    );

    res.sendStatus(200);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}

async function DeleteRent(req, res) {
  const { id } = req.params;
  const selectedRent = await connection.query("SELECT * FROM rentals WHERE id = $1", [id]);

  if (selectedRent.rows.length === 0) {
    return res.status(404).send({ message: "Este aluguel não existe" });
  }

  if (selectedRent.rows[0].returnDate !== null && selectedRent.rows[0].delayFee !== 0) {
    return res.status(400).send({ message: "Este aluguel ainda não foi finalizado" });
  }
  try {
    const deletedData = await connection.query("DELETE FROM rentals WHERE id = $1", [id]);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
}
export { DeleteRent, ConcludeRent, ShowRentals, AddRent };
