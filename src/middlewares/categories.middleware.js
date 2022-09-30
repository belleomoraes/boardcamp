import joi from 'joi'

const CategorySchema = joi.object({
    name: joi.string().min(1).required(),
  });
  
  function validateCategorySchema(req, res, next) {
    const validation = CategorySchema.validate(req.body, { abortEarly: false });
    
    if(req.body.value === null || req.body.itens === 0){
        return res.status(401).send({ message: validation.error.message });
    }
    if (validation.error) {
        return res.status(400).send({ message: validation.error.message });
    }
    next();
  }
  
  export default validateCategorySchema;