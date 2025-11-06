import { Struct, FixedAsciiString, U16, U8, Tuple, TypedArray } from './struct/index.js'

/**
 * @example
 * // Структура, по которой будут закодированы объекты:
 * Person.create({
 *   age: 42,
 *   id: 531,
 *   firstName: 'bob',
 *   lastName: 'Elton',
 *   color: [0xFF, 0x00, 0x00],
 * })
 */
const Color = Tuple(U8, U8, U8);

export const Person = new Struct({
    age: U8,
    id: U16,
    firstName: FixedAsciiString(8),
    lastName: FixedAsciiString(8),
    color: Color,
});

export const PersonArray = new TypedArray(Person, 1e5);
