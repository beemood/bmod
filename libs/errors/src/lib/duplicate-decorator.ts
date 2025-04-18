import { format } from 'node:util';

export class DuplicateDecoratorError extends Error {
  static message = `%s decorator is already applied to %s`;
  constructor(decoratorName: string, targetPath: string) {
    super(format(DuplicateDecoratorError.message, decoratorName, targetPath));
  }
}
