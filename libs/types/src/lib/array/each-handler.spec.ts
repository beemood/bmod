import { EachHandler } from './each-handler.js';

describe('EachHandler', () => {
  it('should work', () => {
    const array: string[] = ['1', '2'];

    const handler0: EachHandler<string> = (_value, _index, _array) => {
      return '';
    };

    const handler1: EachHandler<string> = (value) => {
      return value;
    };

    array.forEach(handler0);
    array.forEach(handler1);
  });
});
