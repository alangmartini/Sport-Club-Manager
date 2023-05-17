import BasedError from '../../errors/BasedError.class';

interface IValidationProvider {
  validate(dataToValidate: unknown): true | BasedError;
}

export default IValidationProvider;
