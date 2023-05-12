interface IError extends Error {
  status?: number;
}

interface IErrorHandle {
  handle(error: IError): IError;
}

export default IErrorHandle;
