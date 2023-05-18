import TValidateResult from '../../types/TValidateResult.type';
import BasedError from '../../errors/BasedError.class';
import IExistenceProvider from '../../interfaces/existence/IExistenceProvider.interface';
import EnumExistenceError from '../../enums/ExistenceError.enum';

class ExistenceProvider<T>
implements IExistenceProvider<T> {
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
    const hasAllKeys = this.deepKeyEqual(this.object, dataToAssert);
    const isNonEmpty = this.verifyNoEmptyFields(dataToAssert);
    console.log('oi')
    if (
      hasAllKeys instanceof Error
      || isNonEmpty instanceof Error
    ) {
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

    if (keys1.length !== keys2.length) return new Error();

    for (let i = 0; i < keys1.length; i += 1) {
      if (keys1[i] !== keys2[i]) return new Error();

      if (typeof obj1[keys1[i]] === 'object'
          && obj1[keys1[i]] !== null
          && typeof obj2[keys2[i]] === 'object'
          && obj2[keys2[i]] !== null
          && !this.deepKeyEqual(obj1[keys1[i]], obj2[keys2[i]])
      ) {
        return new Error();
      }
    }

    return true;
  }

  isEmpty(value: any): boolean {
    if (typeof value === 'object' && value !== null) {
      return Object.keys(value).some((key) => this.isEmpty(value[key]));
    }
    return value === '' || value === undefined || value === null;
  }

  verifyNoEmptyFields(obj: unknown): true | Error {
    if (!this.isEmpty(obj)) {
      return true;
    }

    return new Error();
  }
}

export default ExistenceProvider;
