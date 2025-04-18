import { setName } from './set.js';

describe('set', () => {
  it('should work', () => {
    expect(setName(''));
    expect(() => setName('')).toThrowError();
  });
});
