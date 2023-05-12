import BoomErrorHandle from './BoomErrorHandle.class';

class ErrorCLient {
  private errorClient = new BoomErrorHandle();

  getStatus(): number {
    return this.errorClient.statusCode;
  }

  getOutput(): IExpressErrorOutput {
    return this.errorClient.output;
  }
}