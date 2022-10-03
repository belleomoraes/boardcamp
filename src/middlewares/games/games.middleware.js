import joi from 'joi'

const GameSchema = joi.object({
    name: joi.string().trim().required(),
    image: joi.string().uri().required(),
    stockTotal: joi.number().greater(0).required(),
    categoryId:joi.number().greater(0).required(),
    pricePerDay:joi.number().greater(0).required(),
  });
  
  function validateGameSchema(req, res, next) {
    const validation = GameSchema.validate(req.body, { abortEarly: false });
    
    if (validation.error) {
        return res.status(400).send({ message: validation.error.message });
    }
    next();
  }
  
  export default validateGameSchema;