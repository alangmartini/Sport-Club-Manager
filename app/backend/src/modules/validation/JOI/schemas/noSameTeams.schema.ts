import * as JOI from 'joi';
import IJOISchema from '../../../../interfaces/modules/validation/Joi/IJOISchema.interface';
import INewMatchBody from '../../../../interfaces/matches/INewMatchBody.interface';

const rules = JOI.object({
  homeTeamId: JOI.number().positive().required(), // O valor deve ser o id do time
  awayTeamId: JOI.number().positive().required(), // O valor deve ser o id do time
  homeTeamGoals: JOI.number().positive().required(),
  awayTeamGoals: JOI.number().positive().required(),
}).custom((schema: INewMatchBody, helpers) => {
  if (schema.awayTeamId === schema.homeTeamId) {
    return helpers.message({ message: 'awayTeamId and homeTeamId can\'t be the same' });
  }

  return schema;
}).required();

class SchemaNewMatch implements IJOISchema {
  private _rules: JOI.ObjectSchema = rules;

  public get rules() {
    return this._rules;
  }

  validate(toValidate: INewMatchBody): JOI.ValidationResult {
    return this._rules.validate(toValidate);
  }
}

export default SchemaNewMatch;
