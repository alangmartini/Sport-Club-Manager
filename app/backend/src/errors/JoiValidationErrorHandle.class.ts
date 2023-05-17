import * as Joi from 'joi';
import EnumError from '../enums/error.enum';
import TStatusCode from '../types/TStatusCode.type';
import IExpressErrorOutput from '../interfaces/errors/IExpressErrorOutput.interface';
import IErrorHandle from '../interfaces/errors/IErrorHandle.interface';
import EnumValidation from '../enums/validation.enum';

// Arrumar incongruência no parametro do constrcutor
// pois se ele entrar no JoiValidationErrorHandle, com certeza é do tipo ValidationError
// mas isso deve estar sincronizado com o BoomErrorHandle.


// Commitar mudanças

class JoiValidationErrorHandle implements IErrorHandle {
  statusCode!: TStatusCode;
  output!: IExpressErrorOutput;

  private _validationError: Joi.ValidationError;

  constructor(error: Joi.ValidationError)  {
    switch(error.name) {
      case EnumValidation.EMAIL_AND_PASSWORD:
        const emailorPassword = error.details[0].path;


        break;
    }

    this.updateStatusAndOutput(this._validationError);
  }

  updateStatusAndOutput(validationError: Joi.ValidationError) {
    this.statusCode = boomError.output
      .statusCode;

    this.output = boomError.output.payload;
  }
}

export default JoiValidationErrorHandle;
