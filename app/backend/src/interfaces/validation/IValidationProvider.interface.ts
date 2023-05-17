import IJOISchema from './Joi/IJOISchema.interface';

interface IValidationProvider {
  validate(dataToValidate: unknown): true | Error;
}

export default IValidationProvider;
