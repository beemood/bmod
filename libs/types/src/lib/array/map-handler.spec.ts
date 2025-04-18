import { MapHandler } from './map-handler.js';

describe('MapHandler', () => {
  it('should work', () => {
    const array: string[] = ['1', '2'];

    const handler0: MapHandler<string> = (_value, _index, _array) => {
      return '';
    };

    const handler1: MapHandler<string> = (value) => {
      return value;
    };

    array.map(handler0);
    array.map(handler1);
  });
});
