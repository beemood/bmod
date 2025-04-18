import {
  ConstrcutorDecoratorError,
  DuplicateDecoratorError,
} from '@bmod/errors';
import type { Any, ClassType } from '@bmod/types';

import 'reflect-metadata';

/**
 * Get metadata key.
 * @param decoratorName
 * @returns string
 */
export function getConstructorParameterMetadataKey(decoratorName: string) {
  return Symbol(`design:constructor-parameter:${decoratorName}`);
}

export type ConstructorParameterDecoratorMetadataParameters<
  Args extends Array<Any>
> = Record<string, Record<number, Args>>;

/**
 * Metadata type to be stored
 */
export type ConstructorParameterDecoratorMetadata<Args extends Array<Any>> = {
  /**
   * Target class type
   */
  classType: ClassType;

  methods: {
    constructor: {
      parameters: ConstructorParameterDecoratorMetadataParameters<Args>;
    };
  };
};

/**
 * {@link createConstructorParameterDecorator}'s return type
 */
export type ConstructorParameterDecoratorAndGetter<Args extends Array<Any>> = {
  /**
   * constructor-parameter decorator
   * @param args {@link Args}
   * @returns {@link ConstructorParameterDecorator}
   */
  decorator: (...args: Args) => ParameterDecorator;

  /**
   * get constructor-parameter decorator metadata
   * @param prototype
   * @returns constructor-parameter decorator metadata
   */
  getMetaData: (
    prototype: object
  ) => ConstructorParameterDecoratorMetadata<Args> | undefined;
};

/**
 * Create constructor-parameter decorator
 * @template Args destructed decorator constructor-parameters
 * @param decoratorName
 * @returns
 */
export function createConstructorParameterDecorator<Args extends Array<Any>>(
  decoratorName: string
): ConstructorParameterDecoratorAndGetter<Args> {
  const key = getConstructorParameterMetadataKey(decoratorName);

  /**
   * get decorator metadata
   * @param prototype class prototype
   * @returns the stored metadata {@link ConstructorParameterDecoratorMetadata}
   */
  function getMetaData(
    prototype: object
  ): ConstructorParameterDecoratorMetadata<Args> | undefined {
    return Reflect.getMetadata(key, prototype);
  }

  /**
   * constructor-parameter decorator
   * @param args {@link Args}
   * @returns
   */
  function decorator(...args: Args): ParameterDecorator {
    return (target, methodName, parameterIndex) => {
      const targetName = (target as any).name;
      const prototype = (target as any).prototype;
      const paramPath = `${targetName}[${parameterIndex}]`;
      const methodPath = `${targetName}${methodName?.toString()}${parameterIndex}`;

      if (methodName != undefined) {
        throw new ConstrcutorDecoratorError(decoratorName, methodPath);
      }

      const currentMetaData = getMetaData(prototype);
      const currentParameters = currentMetaData?.methods.constructor.parameters;

      if (currentParameters?.[parameterIndex] != undefined) {
        throw new DuplicateDecoratorError(decoratorName, paramPath);
      }

      Reflect.defineMetadata(
        key,
        {
          ...currentMetaData,
          classType: target as unknown as ClassType,
          methods: {
            constructor: {
              parameters: {
                ...currentParameters,
                [parameterIndex]: args,
              },
            },
          },
        } as ConstructorParameterDecoratorMetadata<Args>,
        prototype
      );
    };
  }

  return {
    decorator,
    getMetaData,
  };
}
