import { ConstrcutorDecoratorError } from './constructor-decorator.js';

describe('ConstrcutorDecoratorError', () => {
  it('should return message', () => {
    const error = () => {
      throw new ConstrcutorDecoratorError('Some', 'Other.some');
    };
    expect(error).toThrowError(ConstrcutorDecoratorError);
    expect(error).toThrowError(
      'Some decorator is a constructor decorator but used in Other.some method'
    );
  });
});
