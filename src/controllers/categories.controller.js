import connection from "../database/db.js";

async function AddCategory (req, res) {
    const { name } = req.body

    const isCategoryExists = await connection.query('SELECT * FROM categories WHERE name = $1', [name]) 

  if (isCategoryExists.rows) {
    return res.status(409).send({ message: "Esta categoria já existe" });
  }
    try {
        const categoryInsertion = await connection.query('INSERT INTO categories (name) VALUES ($1)', [name]) 
        res.sendStatus(201)
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }

  async function ShowCategories (req, res) {
    
    try {
     const allCategories = await connection.query('SELECT * FROM categories');
      res.status(201).send(allCategories.rows);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
  
  
  export { AddCategory, ShowCategories };
  