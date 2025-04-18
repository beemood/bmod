import { Model } from './model.decorator.js';
import { Property } from './property.decorator.js';

describe('Property: decorator', () => {
  it('should define/get property metadata', () => {
    @Model({ type: 'object', required: [] })
    class Sample {
      @Property<string>({ type: 'string' }) lastname: string;
    }
  });
});
