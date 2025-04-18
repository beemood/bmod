import { format } from 'node:util';

export class ConstrcutorDecoratorError extends Error {
  static message = `%s decorator is a constructor decorator but used in %s class`;
  constructor(decoratorName: string, parameterPath: string) {
    super(
      format(ConstrcutorDecoratorError.message, decoratorName, parameterPath)
    );
  }
}
