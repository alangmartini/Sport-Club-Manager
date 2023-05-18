import EnumValidation from '../enums/validation.enum';

/*
  RuleSet is a typing for EnumValidation. Is how Middlewares
  communicates to ValidationProviders which type of validation
  must be done.
*/

type TRuleSet = EnumValidation;

export default TRuleSet;
