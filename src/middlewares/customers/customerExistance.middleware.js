import connection from "../../database/db.js";
async function isCustomerExists(req, res, next) {
    const { idCustomer } = req.params;
    const selectedCustomers = await connection.query("SELECT * FROM customers WHERE id = $1", [
        idCustomer,
      ]);
    
      if (selectedCustomers.rows.length === 0) {
        return res.status(404).send({ message: "Este usuário não existe" });
      }
      
    next();
  
}

export default isCustomerExists