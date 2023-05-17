import * as JOI from 'joi';
import schema from './schemas';
import IJOISchema from '../../interfaces/validation/Joi/IJOISchema.interface';
import EnumValidation from '../../enums/validation.enum';
import IValidationProvider from '../../interfaces/validation/IValidationProvider.interface';
import TValidateResult from '../../types/TValidateResult.type';

class JOIProvider<T> implements IValidationProvider{
  private _schema: IJOISchema;

  constructor(ruleSet: EnumValidation) {
    switch(ruleSet) {
      case EnumValidation.EMAIL_INVALID || EnumValidation.PASSWORD_INVALID:
        this._schema = new schema.schemaEmailAndPassword();
        break;
    }
  }

  validate(dataToValidate: T): TValidateResult  {
    const result: JOI.ValidationResult = this._schema.validate(dataToValidate);

    // Here is were the error will be created. It must have a 
    
    if (result.error) {

      return result.error;
    }

    return true;
  }
}

export default JOIProvider;