import joi from "joi";

const customersSchema = joi.object({
  name: joi.string().trim().required(),
  phone: joi.number().min(10).max(11).required(),
  cpf: joi.number().min(11).max(11).required(),
  birthday: joi.date().required(),
});

function validatecustomerschema(req, res, next) {
  const validation = customersSchema.validate(req.body, { abortEarly: false });

  if (validation.error) {
    return res.status(400).send({ message: validation.error.message });
  }
  next();
}

export default validatecustomerschema;
