import EnumExistenceError from '../../enums/ExistenceError.enum';
import TValidateResult from '../../types/TValidateResult.type';

interface IExistenceProvider<T> {
  object: T;
  typeOfError: EnumExistenceError;

  assertExist(): TValidateResult;
}

export default IExistenceProvider;