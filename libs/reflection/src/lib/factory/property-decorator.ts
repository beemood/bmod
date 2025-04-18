import { DuplicateDecoratorError } from '@bmod/errors';
import type { Any, ClassType } from '@bmod/types';
import 'reflect-metadata';

/**
 * Get metadata key.
 * @param decoratorName
 * @returns string
 */
export function getPropertyMetadataKey(decoratorName: string) {
  return Symbol(`design:property:${decoratorName}`);
}

export type PropertyDecoratorMetadataProperties<Args extends Array<Any>> =
  Record<string | symbol, Args>;

/**
 * Metadata type to be stored
 */
export type PropertyDecoratorMetadata<Args extends Array<Any>> = {
  /**
   * Target class type
   */
  classType: ClassType;

  /**
   * Provided metadata through the decorator
   */
  properties: PropertyDecoratorMetadataProperties<Args>;
};

/**
 * {@link createPropertyDecorator}'s return type
 */
export type PropertyDecoratorAndGetter<Args extends Array<Any>> = {
  /**
   * property decorator
   * @param args {@link Args}
   * @returns {@link PropertyDecorator}
   */
  decorator: (...args: Args) => PropertyDecorator;

  /**
   * get property decorator metadata
   * @param prototype
   * @returns property decorator metadata
   */
  getMetaData: (
    prototype: object
  ) => PropertyDecoratorMetadata<Args> | undefined;
};

/**
 *
 * @template Args destructed decorator parameters
 * @param decoratorName
 * @returns
 */
export function createPropertyDecorator<Args extends Array<Any>>(
  decoratorName: string
): PropertyDecoratorAndGetter<Args> {
  const key = getPropertyMetadataKey(decoratorName);

  /**
   * get decorator metadata
   * @param prototype class prototype
   * @returns the stored metadata {@link PropertyDecoratorMetadata}
   */
  function getMetaData(
    prototype: object
  ): PropertyDecoratorMetadata<Args> | undefined {
    return Reflect.getMetadata(key, prototype);
  }

  /**
   * property decorator
   * @param args {@link Args}
   * @returns
   */
  function decorator(...args: Args): PropertyDecorator {
    return (target, propertyKey) => {
      const targetName = target.constructor.name;
      const prototype = target.constructor.prototype;
      const propertyPath = `${targetName}.${propertyKey.toString()}`;

      const currentMetaData = getMetaData(prototype);
      const currentProperties = currentMetaData?.properties ?? {};

      if (currentProperties[propertyKey] != undefined) {
        throw new DuplicateDecoratorError(decoratorName, propertyPath);
      }

      Reflect.defineMetadata(
        key,
        {
          classType: target.constructor as unknown as ClassType,
          properties: { ...currentProperties, [propertyKey]: args },
        } as PropertyDecoratorMetadata<Args>,
        prototype
      );
    };
  }

  return {
    decorator,
    getMetaData,
  };
}
