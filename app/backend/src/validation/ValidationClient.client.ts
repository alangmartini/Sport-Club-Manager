import EnumTypeOfValidation from '../enums/TypeOfValidation.enum';
import EnumValidation from '../enums/validation.enum';
import IValidationProvider from '../interfaces/validation/IValidationProvider.interface';
import TRuleSet from '../types/TRuleSet.type';
import TValidateResult from '../types/TValidateResult.type';
import ExistenceAssertionProvider from './ExistenceAssertion/ExistenceAssertionProvider.provider';
import JOIProvider from './JOI/JOIProvider.provider';

/*
  Decide which validation provider to use.
  This makes easy to change validation method in the future. You just have to
  create a new provider and insert here.
*/

class validationClient<T> {
  validationProvider: IValidationProvider;

  constructor (ruleSet: TRuleSet, typeOfError: string, typeOfValidation: string) {
    if (typeOfValidation === EnumTypeOfValidation.INVALIDATION) {
      this.validationProvider = new JOIProvider(ruleSet, typeOfError);
      return
    }

    this.validationProvider = new ExistenceAssertionProvider(ruleSet, typeOfError);
  }

  validate(dataToValidate: T): TValidateResult {
    return this.validationProvider.validate(dataToValidate);
  };
}

export default validationClient;