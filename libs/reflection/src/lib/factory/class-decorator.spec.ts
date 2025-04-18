import { createClassDecorator } from './class-decorator.js';

describe('createClassDecorator', () => {
  it('should create class decorator', () => {
    type DecoratorOptions = [
      first?: { type: string },
      second?: { type: string }
    ];

    const { decorator, getMetaData } =
      createClassDecorator<DecoratorOptions>('some');

    @decorator({ type: 'string' }, { type: 'number' })
    class Some {}

    expect(getMetaData(Some.prototype)).toEqual({
      classType: Some,
      classMetaData: [{ type: 'string' }, { type: 'number' }],
    });
  });
});
