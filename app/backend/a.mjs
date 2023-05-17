import Joi from 'joi';

const a = Joi.object({
  email: Joi.string().email()
});

const b = a.validate({ email: 'example'})

console.log(b.error)