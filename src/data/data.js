import {PersonArray} from '../index.js'

export const personArray = PersonArray.create([
    {
        age: 42,
        id: 531,
        firstName: 'bob',
        lastName: 'Elton',
        color: [0xFF, 0x00, 0x00],
    },

    {
        age: 57,
        id: 532,
        firstName: 'Tailer',
        lastName: 'Drdn',
        color: [0xFF, 0x00, 0x00],
    },

    {
        age: 23,
        id: 312,
        firstName: 'Titi',
        lastName: 'Don',
        color: [0xFF, 0xEE, 0x00],
    },
])

console.log(personArray.get(1).firstName)