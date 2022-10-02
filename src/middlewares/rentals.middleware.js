import joi from "joi";

const rentalSchema = joi.object({
  customerId: joi.number().min(1).required(),
  gameId: joi.number().min(1).required(),
  daysRented: joi.number().greater(0).required(),
});

function validateRentalSchema(req, res, next) {
  const validation = rentalSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    return res.status(400).send({ message: validation.error.message });
  }
  next();
}

export default validateRentalSchema;
