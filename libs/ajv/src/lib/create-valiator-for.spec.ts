import { createValidatorFor } from './create-validator-for.js';
import { Model } from './model.decorator.js';
import { Property } from './property.decorator.js';

describe('createValidatorFor', () => {
  it('should create validator for', () => {
    @Model<Sample>({ type: 'object', required: ['username'] })
    class Sample {
      @Property<string>({ type: 'string', minLength: 3 }) username: string;
    }

    const validateSample = createValidatorFor<Sample>(Sample, {
      allErrors: true,
    });

    const result = validateSample({});

    console.log(result, validateSample.errors);
  });
});
