import { DuplicateDecoratorError } from './duplicate-decorator.js';

describe('DuplicateDecoratorError', () => {
  it('should return message', () => {
    const error = () => {
      throw new DuplicateDecoratorError('Some', 'Other');
    };
    expect(error).toThrowError(DuplicateDecoratorError);
    expect(error).toThrowError('Some decorator is already applied to Other');
  });
});
