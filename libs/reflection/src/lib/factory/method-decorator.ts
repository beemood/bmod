import { DuplicateDecoratorError } from '@bmod/errors';
import type { Any, ClassType } from '@bmod/types';
import 'reflect-metadata';

/**
 * Get metadata key.
 * @param decoratorName
 * @returns string
 */
export function getMethodMetadataKey(decoratorName: string) {
  return Symbol(`design:method:${decoratorName}`);
}

export type MethodDecoratorMetadataMethods<Args extends Array<Any>> = Record<
  string | symbol,
  Args
>;

/**
 * Metadata type to be stored
 */
export type MethodDecoratorMetadata<Args extends Array<Any>> = {
  /**
   * Target class type
   */
  classType: ClassType;

  /**
   * Provided metadata through the decorator
   */
  methods: MethodDecoratorMetadataMethods<Args>;
};

/**
 * {@link createMethodDecorator}'s return type
 */
export type MethodDecoratorAndGetter<Args extends Array<Any>> = {
  /**
   * method decorator
   * @param args {@link Args}
   * @returns {@link MethodDecorator}
   */
  decorator: (...args: Args) => MethodDecorator;

  /**
   * get method decorator metadata
   * @param prototype
   * @returns method decorator metadata
   */
  getMetaData: (prototype: object) => MethodDecoratorMetadata<Args> | undefined;
};

/**
 *
 * @template Args destructed decorator parameters
 * @param decoratorName
 * @returns
 */
export function createMethodDecorator<Args extends Array<Any>>(
  decoratorName: string
): MethodDecoratorAndGetter<Args> {
  const key = getMethodMetadataKey(decoratorName);

  /**
   * get decorator metadata
   * @param prototype class prototype
   * @returns the stored metadata {@link MethodDecoratorMetadata}
   */
  function getMetaData(
    prototype: object
  ): MethodDecoratorMetadata<Args> | undefined {
    return Reflect.getMetadata(key, prototype);
  }

  /**
   * method decorator
   * @param args {@link Args}
   * @returns
   */
  function decorator(...args: Args): MethodDecorator {
    return (target, methodKey) => {
      const targetName = target.constructor.name;
      const prototype = target.constructor.prototype;
      const methodPath = `${targetName}.${methodKey.toString()}`;

      const currentMetaData = getMetaData(prototype);
      const currentMethods = currentMetaData?.methods ?? {};

      if (currentMethods[methodKey] != undefined) {
        throw new DuplicateDecoratorError(decoratorName, methodPath);
      }

      Reflect.defineMetadata(
        key,
        {
          classType: target.constructor as unknown as ClassType,
          methods: { ...currentMethods, [methodKey]: args },
        } as MethodDecoratorMetadata<Args>,
        prototype
      );
    };
  }

  return {
    decorator,
    getMetaData,
  };
}
