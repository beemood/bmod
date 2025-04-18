import { createPropertyDecorator } from '@bmod/reflection';
import { Any } from '@bmod/types';
import { JSONSchemaType } from 'ajv';

export const { decorator: __Property, getMetaData: getPropertyMetaData } =
  createPropertyDecorator<Any>('Propery');

export function Property<T>(options: JSONSchemaType<T>): PropertyDecorator {
  return (...args) => {
    __Property(options)(...args);
  };
}
