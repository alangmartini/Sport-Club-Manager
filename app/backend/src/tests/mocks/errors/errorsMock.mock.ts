import IExpressErrorOutput   from '../../../interfaces/errors/IExpressErrorOutput.interface'

const badImplementationError: IExpressErrorOutput = {
  statusCode: 500,
  error: 'Internal Server Error',
  message: 'An internal server error occurred'
}

const notFoundError: IExpressErrorOutput = {
  statusCode: 404,
  error: 'Not Found',
  message: 'Time não encontrado'
}

export default { badImplementationError, notFoundError };
