import TValidateResult from '../../types/TValidateResult.type';
import IExistenceProvider from './IExistenceProvider.interface';

interface IExistenceClient<T> {
  existenceProvider: IExistenceProvider<T>;

  assertExist(): TValidateResult;
};

export default IExistenceClient;