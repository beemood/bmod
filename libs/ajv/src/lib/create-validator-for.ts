import { ClassType } from '@bmod/types';
import { Ajv, Options as ValidationOptions } from 'ajv';
import { getModelMetaData } from './model.decorator.js';
import { getPropertyMetaData } from './property.decorator.js';

export function createValidatorFor<T extends object>(
  classType: ClassType<T>,
  options?: ValidationOptions
) {
  const prototype = classType.prototype;

  const modelMetaData = getModelMetaData<T>(prototype);

  const propertiesMetaData = getPropertyMetaData(prototype);

  const modelOptions = modelMetaData.classMetaData[0];

  const properties = Object.entries(propertiesMetaData?.properties ?? {})
    .map(([key, value]) => ({ [key]: value[0] }))
    .reduce((p, c) => ({ ...p, ...c }), {});

  modelOptions.properties = properties;

  const ajvCompiler = new Ajv(options);

  return ajvCompiler.compile<T>(modelOptions);
}
