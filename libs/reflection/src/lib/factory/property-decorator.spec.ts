import { createPropertyDecorator } from './property-decorator.js';

describe('createPropertyDecorator', () => {
  it('should create decorator', () => {
    type DecoratorOptions = [
      first?: { type: string },
      second?: { type: string }
    ];

    const { decorator, getMetaData } =
      createPropertyDecorator<DecoratorOptions>('some');

    class Some {
      @decorator({ type: 'string' }, { type: 'number' })
      firstName: string;

      @decorator({ type: 'string' }, { type: 'number' })
      lastName: string;
    }

    expect(getMetaData(Some.prototype)).toEqual({
      classType: Some,
      properties: {
        firstName: [{ type: 'string' }, { type: 'number' }],
        lastName: [{ type: 'string' }, { type: 'number' }],
      },
    });
  });
});
