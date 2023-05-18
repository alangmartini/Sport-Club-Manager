import EnumValidation from '../enums/validation.enum';
import IValidationProvider from '../interfaces/validation/IValidationProvider.interface';
import TValidateResult from '../types/TValidateResult.type';
import TRuleSet from '../types/TRuleSet.type';
import BasedError from '../errors/BasedError.class';
import EnumErrorHTTP from '../enums/HTTPerror.enum';
import IExistenceProvider from '../interfaces/existence/IExistenceProvider.interface';
import EnumExistenceError from '../enums/ExistenceError.enum';

class ExistenceProvider<T>
  implements IExistenceProvider<T>
{
  object: T;
  typeOfError: EnumExistenceError;

  constructor(object: T, typeOfError: string) {
    this.object = object;
    this.typeOfError = typeOfError;
  }

  assertExist(dataToValidate: T): TValidateResult {
    if (!this._schema) {
      const type = EnumErrorHTTP.BAD_IMPLEMENTATION;

      return new BasedError('No schema', type);
    }

    const result: JOI.ValidationResult =
    this._schema.validate(dataToValidate);
    
    if (result.error) {
      const type = this.typeOfError;

      const error = new BasedError('', type);
      
      return error;
    }

    return true;
  }

}

export default ExistenceProvider;
