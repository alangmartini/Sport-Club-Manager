import EnumErrorValidation from '../../enums/ErrorValidation.enum';
import IValidationProvider from '../../interfaces/modules/validation/IValidationProvider.interface';
// import TRuleSet from '../../types/TRuleSet.type';
import TValidateResult from '../../types/TValidateResult.type';
import JOIProvider from './JOI/JOIProvider.provider';

/*
  Decide which validation provider to use.
  This makes easy to change validation method in the future. You just have to
  create a new provider and insert here.
*/

class validationClient<T> {
  validationProvider: IValidationProvider;

  constructor(typeOfError: EnumErrorValidation) {
    this.validationProvider = new JOIProvider(typeOfError);
  }

  validate(dataToValidate: T): TValidateResult {
    return this.validationProvider.validate(dataToValidate);
  }
}

export default validationClient;
