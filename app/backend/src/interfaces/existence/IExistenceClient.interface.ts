import TValidateResult from '../../types/TValidateResult.type';
import IExistenceProvider from './IExistenceProvider.interface';

interface IExistenceClient<T> {
  existenceProvider: IExistenceProvider<T>;

  assertExist(dataToAssert: T): TValidateResult;
}

export default IExistenceClient;
