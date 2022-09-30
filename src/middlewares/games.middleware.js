import joi from 'joi'

const GameSchema = joi.object({
    name: joi.string().min(1).required(),
    image: joi.string().uri().required(),
    stockTotal: joi.number().min(1).required(),
    categoryId:joi.string().min(1).required(),
    pricePerDay:joi.number().min(1).required(),
  });
  
  function validateGameSchema(req, res, next) {
    const validation = GameSchema.validate(req.body, { abortEarly: false });
    
    if (validation.error) {
        return res.status(400).send({ message: validation.error.message });
    }
    next();
  }
  
  export default validateGameSchema;