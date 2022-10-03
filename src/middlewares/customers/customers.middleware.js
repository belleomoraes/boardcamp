import joi from "joi";

const customersSchema = joi.object({
  name: joi.string().trim().required(),
  phone: joi.string().min(10).max(11).pattern(/^[0-9]+$/).required(),
  cpf: joi.string().length(11).pattern(/^[0-9]+$/).required(),
  birthday: joi.date().less('now').required(),
});

function validatecustomerschema(req, res, next) {
  const validation = customersSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    return res.status(400).send({ message: validation.error.message });
  }
  next();
}

export default validatecustomerschema;
