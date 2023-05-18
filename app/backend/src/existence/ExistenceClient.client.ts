import IExistenceClient from '../interfaces/existence/IExistenceClient.interface';
import IExistenceProvider from '../interfaces/existence/IExistenceProvider.interface';
import TValidateResult from '../types/TValidateResult.type';
import ExistenceProvider from './ExistenceProvider.provider';

/*
  Decide which existence provider to use.
  This makes easy to change validation method in the future. You just have to
  create a new provider and insert here.
*/

class ExistenceClient<T> implements IExistenceClient<T> {
  existenceProvider: IExistenceProvider<T>;

  constructor (object: T, typeOfError: string) {
      this.existenceProvider = new ExistenceProvider<T>(object, typeOfError);
  }

  assertExist(dataToAssert: T): TValidateResult {
    return this.existenceProvider.assertExist(dataToAssert);
  };
}

export default ExistenceClient;