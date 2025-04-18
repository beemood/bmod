import { format } from 'node:util';

export class NotConstrcutorDecoratorError extends Error {
  static message = `%s decorator is not a constructor decorator but used in %s class`;
  constructor(decoratorName: string, className: string) {
    super(
      format(NotConstrcutorDecoratorError.message, decoratorName, className)
    );
  }
}
