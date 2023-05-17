import IBasedError from '../interfaces/errors/IBasedError.interface';

/*
  This error is basically an abstract error. It will
  carry the information so Error Providers of different kinds
  can properly create parse and create capilar errors accordinly
  to the situation.
*/

class BasedError extends Error {
  type: string;

  constructor(message: string, type: string) {
    super(message);
    this.type = type;
  }
}

export default BasedError;