import * as JOI from 'joi';
import schema from './schemas';
import IJOISchema from '../../interfaces/validation/Joi/IJOISchema.interface';
import EnumValidation from '../../enums/validation.enum';
import IValidationProvider from '../../interfaces/validation/IValidationProvider.interface';
import TValidateResult from '../../types/TValidateResult.type';
import TRuleSet from '../../types/TRuleSet.type';
import BasedError from '../../errors/BasedError.class';
import EnumError from '../../enums/error.enum';

class JOIProvider<T>
  implements IValidationProvider
{
  private _schema?: IJOISchema;
  ruleSet: TRuleSet;

  constructor(ruleSet: TRuleSet) {
    this.ruleSet = ruleSet;

    switch (ruleSet) {
      case EnumValidation.EMAIL_INVALID:
        this._schema = new schema
          .schemaEmailAndPassword();

        return;
      case EnumValidation.PASSWORD_INVALID:
        this._schema = new schema
          .schemaEmailAndPassword();

        return;
    }
  }

  validate(dataToValidate: T): TValidateResult {
    if (!this._schema) {
      const type = EnumError.BAD_IMPLEMENTATION;
      return new BasedError('No schema', type);
      
    }

    const result: JOI.ValidationResult =
      this._schema.validate(dataToValidate);
    
    // If error, create a generic BasedError
    // with the ruleSet applied on type.
    if (result.error) {
      const type = this.ruleSet;

      const error = new BasedError('', this.ruleSet);
      
      return error;
    }

    return true;
  }
}

export default JOIProvider;
