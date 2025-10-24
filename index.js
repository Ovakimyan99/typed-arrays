import { Struct, FixedAsciiString, U16, U8, Tuple } from './src/struct/index.js'

const Color = Tuple(U8, U8, U8);

export const Person = new Struct({
    age: U8,
    id: U16,
    firstName: FixedAsciiString(8),
    lastName: FixedAsciiString(8),
    color: Color,
});

// const bob = Person.create({
//     age: 42,
//     id: 531,
//     firstName: 'bob',
//     lastName: 'Elton',
//     color: [0xFF, 0x00, 0x00],
// })

// console.log(bob.age, bob.color[0])
// console.log(bob.buffer);

const TestStruct = new Struct({
    a: U8,          // 1 байт, alignment 1
    b: U16,         // 2 байта, alignment 2
});

export const PersonArray = new TypedArray(Person, 1e5)
