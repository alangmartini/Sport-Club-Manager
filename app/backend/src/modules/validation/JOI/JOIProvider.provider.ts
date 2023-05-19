import * as JOI from 'joi';
import IJOISchema from '../../../interfaces/modules/validation/Joi/IJOISchema.interface';
import EnumValidation from '../../../enums/validation.enum';
import IValidationProvider
  from '../../../interfaces/modules/validation/IValidationProvider.interface';
import TValidateResult from '../../../types/TValidateResult.type';
import TRuleSet from '../../../types/TRuleSet.type';
import BasedError from '../../../errors/BasedError.class';
import EnumErrorHTTP from '../../../enums/HTTPerror.enum';
import SchemaEmailAndPassword from './schemas/emailAndPassword.schema';

class JOIProvider<T> implements IValidationProvider {
  private _schema?: IJOISchema;
  ruleSet: TRuleSet;
  typeOfError: string;

  constructor(ruleSet: TRuleSet, typeOfError: string) {
    this.ruleSet = ruleSet;
    this.typeOfError = typeOfError;

    switch (ruleSet) {
      case EnumValidation.EMAIL_AND_PASSWORD:
        this._schema = new SchemaEmailAndPassword();
        break;

      default:
        break;
    }
  }

  validate(dataToValidate: T): TValidateResult {
    if (!this._schema) {
      const type = EnumErrorHTTP.BAD_IMPLEMENTATION;

      return new BasedError('No schema', type);
    }

    const result: JOI.ValidationResult = this._schema.validate(dataToValidate);

    if (result.error) {
      const type = this.typeOfError;

      const error = new BasedError('', type);

      return error;
    }

    return true;
  }
}

export default JOIProvider;
