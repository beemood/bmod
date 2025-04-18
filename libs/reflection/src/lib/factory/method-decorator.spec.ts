import { createMethodDecorator } from './method-decorator.js';

describe('createMethodDecorator', () => {
  it('should create decorator', () => {
    type DecoratorOptions = [
      first?: { type: string },
      second?: { type: string }
    ];

    const { decorator, getMetaData } =
      createMethodDecorator<DecoratorOptions>('some');

    class Some {
      @decorator({ type: 'string' }, { type: 'number' })
      firstName() {
        //
      }

      @decorator({ type: 'string' }, { type: 'number' })
      lastName() {
        //
      }
    }

    expect(getMetaData(Some.prototype)).toEqual({
      classType: Some,
      methods: {
        firstName: [{ type: 'string' }, { type: 'number' }],
        lastName: [{ type: 'string' }, { type: 'number' }],
      },
    });
  });
});
