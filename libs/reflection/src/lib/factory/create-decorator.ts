import { ClassType } from '@bmod/types';
import 'reflect-metadata';

export function classMetadataKey(decoratorName: string) {
  return `design:class:${decoratorName}`;
}

export type ClassDecoratorMetadata = {
  classType: ClassType;
};

export function createClassDecorator<O>(decoratorName: string) {
  const key = classMetadataKey(decoratorName);

  function decorator(options: O): ClassDecorator {
    return (target) => {
      Reflect.defineMetadata(key, options, target.prototype);
    };
  }

  /**
   * @param prototype class prototype
   */
  function getDecoratorMetadata(prototype: object) {
    return Reflect.getMetadata(key, prototype);
  }

  return {
    decorator,
    getDecoratorMetadata,
  };
}
