import * as Boom from '@hapi/boom';

function errorMiddleware(error) {
  return Boom.badImplementation()
}
export default errorMiddleware;