import IExpressErrorOutput   from '../../../interfaces/errors/IExpressErrorOutput.interface'

const badImplementationError: IExpressErrorOutput = {
  statusCode: 500,
  error: 'Internal Server Error',
  message: 'An internal server error occurred'
}

export default { badImplementationError };
