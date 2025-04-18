import { NotConstrcutorDecoratorError } from './not-constructor-decorator.js';

describe('NotConstrcutorDecoratorError', () => {
  it('should return message', () => {
    const error = () => {
      throw new NotConstrcutorDecoratorError('Some', 'Other');
    };
    expect(error).toThrowError(NotConstrcutorDecoratorError);
    expect(error).toThrowError(
      'Some decorator is not a constructor decorator but used in Other class'
    );
  });
});
