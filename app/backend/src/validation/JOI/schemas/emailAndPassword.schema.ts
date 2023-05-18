import * as JOI from 'joi';
import IJOISchema from '../../../interfaces/validation/Joi/IJOISchema.interface';
import IUserBody  from '../../../interfaces/users/IUserBody.interface';

const rules = JOI.object({
  email: JOI.string().email().required(),
  password: JOI.string().min(7).required()
}).required();

class schemaEmailAndPassword implements IJOISchema {
  private _rules: JOI.ObjectSchema = rules;

  public get rules() {
    return this._rules;
  }

  validate(toValidate: IUserBody): JOI.ValidationResult {
    return this._rules.validate(toValidate);
  }
}

export default schemaEmailAndPassword;
