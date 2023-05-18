import TValidateResult from '../../types/TValidateResult.type';
import BasedError from '../../errors/BasedError.class';
import IExistenceProvider from '../../interfaces/existence/IExistenceProvider.interface';
import EnumExistenceError from '../../enums/ExistenceError.enum';

class ExistenceProvider<T>
  implements IExistenceProvider<T>
{
  object: T;
  typeOfError: EnumExistenceError;

  constructor(
    object: T,
    typeOfError: EnumExistenceError,
  ) {
    this.object = object;
    this.typeOfError = typeOfError;
  }

  assertExist(dataToAssert: T): TValidateResult {
    const result = this.deepKeyEqual(this.object, dataToAssert);

    if (result instanceof Error) {
      const type = this.typeOfError;

      const error = new BasedError('', type);

      return error;
    }

    return true;
  }

  // Verify if both objects have same props
  deepKeyEqual(obj1: any, obj2: any): true | Error {
    const keys1 = Object.keys(obj1).sort();
    const keys2 = Object.keys(obj2).sort();

    if (keys1.length !== keys2.length) {
      return new Error();
    }

    for (let i = 0; i < keys1.length; i++) {
      if (keys1[i] !== keys2[i]) {
        return new Error();
      }

      if (
        typeof obj1[keys1[i]] === 'object'
          && obj1[keys1[i]] !== null
          && typeof obj2[keys2[i]] === 'object'
          && obj2[keys2[i]] !== null
      ) {
        if (
          !this.deepKeyEqual(
            obj1[keys1[i]],
            obj2[keys2[i]],
          )
        ) {
          return new Error();
        }
      }
    }

    return true;
  }
}

export default ExistenceProvider;