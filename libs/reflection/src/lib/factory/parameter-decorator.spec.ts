import { createParameterDecorator } from './parameter-decorator.js';

describe('createParameterDecorator', () => {
  it('should create decorator', () => {
    type DecoratorOptions = [
      first?: { type: string },
      second?: { type: string }
    ];

    const { decorator, getMetaData } =
      createParameterDecorator<DecoratorOptions>('some');

    class Some {
      someMethod(
        @decorator({ type: 'string' }, { type: 'number' })
        firstName: string,
        @decorator({ type: 'string' }, { type: 'number' })
        lastName: string
      ) {}
    }

    expect(getMetaData(Some.prototype)).toEqual({
      classType: Some,
      methods: {
        someMethod: {
          parameters: {
            0: [{ type: 'string' }, { type: 'number' }],
            1: [{ type: 'string' }, { type: 'number' }],
          },
        },
      },
    });
  });
});
