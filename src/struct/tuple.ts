import { type TypedStructure, type ValueOf } from '../types.js';
import { Struct } from './struct.js'

export function Tuple<T extends readonly TypedStructure<unknown>[]>(
    ...types: T
  ): TypedStructure<{ [K in keyof T]: ValueOf<T[K]> }> {
    const tuples = types.map((t, i) => [String(i), t])
    const scheme = Object.fromEntries(tuples)
    return new Struct(scheme);
}
