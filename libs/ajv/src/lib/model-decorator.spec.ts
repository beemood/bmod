import { getModelMetaData, Model } from './model.decorator.js';
describe('Model: decorator', () => {
  it('should define and get metadata', () => {
    @Model({})
    class Base {}

    @Model<Sample>({ required: [''] })
    class Sample {
      firstName: string;
      lastName: string;
    }

    const metadata = getModelMetaData(Sample.prototype);

    expect(metadata).toEqual({
      classType: Sample,
      classMetaData: [
        {
          type: 'object',
          allOf: [Base],
        },
      ],
    });
  });
});
