import * as Boom from '@hapi/boom';

function errorMiddleware(error) {
  return Boom.badImplementation(new Error('oi'))
}

console.log(errorMiddleware('hi'))
console.log(typeof errorMiddleware('hi').output.payload.error)


// const error = new Error('Internal Error');
// error.name = 'badImplementation'
// console.log('error.name is:', error.name);