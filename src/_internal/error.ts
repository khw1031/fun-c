export class AsyncFunctionException extends Error {
  static MESSAGE = `'Iterable' can not used with async function. If you want to deal with async function use 'toAsync'`;

  constructor(message = AsyncFunctionException.MESSAGE) {
    super(message);
  }
}
