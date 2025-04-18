import { ClassDecoratorMetadata, createClassDecorator } from '@bmod/reflection';
import { Any } from '@bmod/types';
import { JSONSchemaType, SchemaObject } from 'ajv';

export const { decorator: __Model, getMetaData: __getModelMetaData } =
  createClassDecorator<Any>('Model');

export function Model<T extends object>(
  options: SchemaObject | (JSONSchemaType<T> & { type?: 'object' })
): ClassDecorator {
  return (...args) => {
    __Model(options)(...args);
  };
}

export function getModelMetaData<T>(prototype: object) {
  return __getModelMetaData(prototype) as ClassDecoratorMetadata<
    [SchemaObject | (JSONSchemaType<T> & { type?: 'object' })]
  >;
}
