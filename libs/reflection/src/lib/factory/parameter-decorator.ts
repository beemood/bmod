import {
  DuplicateDecoratorError,
  NotConstrcutorDecoratorError,
} from '@bmod/errors';
import type { Any, ClassType } from '@bmod/types';
import 'reflect-metadata';

/**
 * Get metadata key.
 * @param decoratorName
 * @returns string
 */
export function getParameterMetadataKey(decoratorName: string) {
  return Symbol(`design:parameter:${decoratorName}`);
}

export type ParameterDecoratorMetadataMethods<Args extends Array<Any>> = Record<
  string | symbol,
  {
    parameters: Record<number, Args>;
  }
>;

/**
 * Metadata type to be stored
 */
export type ParameterDecoratorMetadata<Args extends Array<Any>> = {
  /**
   * Target class type
   */
  classType: ClassType;

  /**
   * Provided metadata through the decorator
   */
  methods: ParameterDecoratorMetadataMethods<Args>;
};

/**
 * {@link createParameterDecorator}'s return type
 */
export type ParameterDecoratorAndGetter<Args extends Array<Any>> = {
  /**
   * parameter decorator
   * @param args {@link Args}
   * @returns {@link ParameterDecorator}
   */
  decorator: (...args: Args) => ParameterDecorator;

  /**
   * get parameter decorator metadata
   * @param prototype
   * @returns parameter decorator metadata
   */
  getMetaData: (
    prototype: object
  ) => ParameterDecoratorMetadata<Args> | undefined;
};

/**
 * Create parameter decorator
 * @template Args destructed decorator parameters
 * @param decoratorName
 * @returns
 */
export function createParameterDecorator<Args extends Array<Any>>(
  decoratorName: string
): ParameterDecoratorAndGetter<Args> {
  const key = getParameterMetadataKey(decoratorName);

  /**
   * get decorator metadata
   * @param prototype class prototype
   * @returns the stored metadata {@link ParameterDecoratorMetadata}
   */
  function getMetaData(
    prototype: object
  ): ParameterDecoratorMetadata<Args> | undefined {
    return Reflect.getMetadata(key, prototype);
  }

  /**
   * parameter decorator
   * @param args {@link Args}
   * @returns
   */
  function decorator(...args: Args): ParameterDecorator {
    return (target, methodName, parameterIndex) => {
      const targetName = target.constructor.name;
      const prototype = target.constructor.prototype;

      if (methodName == undefined)
        throw new NotConstrcutorDecoratorError(decoratorName, targetName);

      const paramPath = `${targetName}.${methodName.toString()}[${parameterIndex}]`;

      const currentMetaData = getMetaData(prototype);
      const currentParameters = currentMetaData?.methods[methodName].parameters;

      if (currentParameters?.[parameterIndex] != undefined) {
        throw new DuplicateDecoratorError(decoratorName, paramPath);
      }

      Reflect.defineMetadata(
        key,
        {
          ...currentMetaData,
          classType: target.constructor as unknown as ClassType,
          methods: {
            ...currentMetaData?.methods,
            [methodName]: {
              ...currentMetaData?.methods[methodName],
              parameters: {
                ...currentParameters,
                [parameterIndex]: args,
              },
            },
          },
        } as ParameterDecoratorMetadata<Args>,
        prototype
      );
    };
  }

  return {
    decorator,
    getMetaData,
  };
}
