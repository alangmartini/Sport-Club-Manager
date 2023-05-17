import * as JOi from 'joi'
import BasedError from './src/errors/BasedError.class';

const teste = JOi.object({
  email: JOi.string().email(),
  password: JOi.number()
})


const val = teste.validate({ email: 'example.example', password: '1234'})
const a = new BasedError('ola');