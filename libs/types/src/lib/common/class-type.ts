import type { Any } from './any.js';

export interface ClassType<T = Any> {
  new (...args: Any[]): T;
}
