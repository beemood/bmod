import { DuplicateDecoratorError } from '@bmod/errors';
import type { Any, ClassType } from '@bmod/types';
import 'reflect-metadata';

/**
 * Get metadata key.
 * @param decoratorName
 * @returns string
 */
export function getClassMetadataKey(decoratorName: string) {
  return Symbol(`design:class:${decoratorName}`);
}

/**
 * Metadata type to be stored
 */
export type ClassDecoratorMetadata<Args extends Array<Any>> = {
  /**
   * Target class type
   */
  classType: ClassType;

  /**
   * Provided metadata through the decorator
   */
  classMetaData: Args;
};

/**
 * {@link createClassDecorator}'s return type
 */
export type ClassDecoratorAndGetter<Args extends Array<Any>> = {
  /**
   * class decorator
   * @param args {@link Args}
   * @returns class decorator
   */
  decorator: (...args: Args) => ClassDecorator;

  /**
   * get class decorator metadata
   * @param prototype
   * @returns class decorator metadata
   */
  getMetaData: (prototype: object) => ClassDecoratorMetadata<Args> | undefined;
};

/**
 *
 * @template Args destructed decorator parameters
 * @param decoratorName
 * @returns
 */
export function createClassDecorator<Args extends Array<Any>>(
  decoratorName: string
): ClassDecoratorAndGetter<Args> {
  const key = getClassMetadataKey(decoratorName);

  /**
   * get decorator metadata
   * @param prototype class prototype
   * @returns the stored metadata {@link ClassDecoratorMetadata}
   */
  function getMetaData(
    prototype: object
  ): ClassDecoratorMetadata<Args> | undefined {
    return Reflect.getMetadata(key, prototype);
  }

  function decorator(...args: Args): ClassDecorator {
    return (target) => {
      if (getMetaData(target.prototype) != undefined)
        throw new DuplicateDecoratorError(decoratorName, target.name);

      Reflect.defineMetadata(
        key,
        {
          classType: target as unknown as ClassType,
          classMetaData: args,
        } as ClassDecoratorMetadata<Args>,
        target.prototype
      );
    };
  }

  return {
    decorator,
    getMetaData,
  };
}
