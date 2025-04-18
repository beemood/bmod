import { createConstructorParameterDecorator } from './constructor-parameter-decorator.js';

describe('createConstructorParameterDecorator', () => {
  it('should create decorator', () => {
    type DecoratorOptions = [
      first?: { type: string },
      second?: { type: string }
    ];

    const { decorator, getMetaData } =
      createConstructorParameterDecorator<DecoratorOptions>('some');

    class Some {
      constructor(
        @decorator({ type: 'string' }, { type: 'number' })
        firstName: string,
        @decorator({ type: 'string' }, { type: 'number' })
        lastName: string
      ) {}
    }

    expect(getMetaData(Some.prototype)).toEqual({
      classType: Some,
      methods: {
        constructor: {
          parameters: {
            0: [{ type: 'string' }, { type: 'number' }],
            1: [{ type: 'string' }, { type: 'number' }],
          },
        },
      },
    });
  });
});
