import { Struct, FixedAsciiString, U16, U8, Tuple, TypedArray } from '../struct/index.js'
import type { TypedStructure } from '../types.js';

const Color = Tuple(U8, U8, U8);

/**
 * @example
 * // Структура, по которой будут закодированы данные:
 * Person.create({
 *   age: 42,
 *   id: 531,
 *   firstName: 'bob',
 *   lastName: 'Elton',
 *   color: [0xFF, 0x00, 0x00],
 * })
 */
export const Person = new Struct({
    age: U8,
    id: U16,
    firstName: FixedAsciiString(8),
    lastName: FixedAsciiString(8),
    color: Color,
} as const satisfies Record<string, TypedStructure<any>>);

// Схема + размер
export const PersonArrayStructure = new TypedArray(Person, 1e5);
