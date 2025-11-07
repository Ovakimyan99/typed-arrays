import { performance } from 'node:perf_hooks';
import { TypedArray } from '../struct/typed-array.js';
import { Struct } from '../struct/struct.js';
import { U8 } from '../struct/u8.js';
import { U16 } from '../struct/u16.js';
import { FixedAsciiString } from '../struct/fixed-ascii-string.js';

const Color = new Struct({ r: U8, g: U8, b: U8 });
const Person = new Struct({
  age: U8,
  id: U16,
  firstName: FixedAsciiString(8),
  lastName: FixedAsciiString(8),
  color: Color,
});

const N = 100_000;
const swollenArray = Array.from({ length: N }, (_, i) => ({
  age: (i % 100),
  id: i,
  firstName: 'Bob',
  lastName: 'Elton',
  color: { r: i % 255, g: (i + 1) % 255, b: i % 255 }
}));

const persons = new TypedArray(Person, N).create(swollenArray);

// read
{
  const t0 = performance.now();
  let s = 0;
  for (let i = 0; i < N; i++) s += swollenArray[i].id;
  console.log('POJO read:', (performance.now() - t0).toFixed(1), 'ms');
}

{
  const t0 = performance.now();
  let s = 0;
  for (let i = 0; i < N; i++) s += persons.get(i).id;
  console.log('Typed read:', (performance.now() - t0).toFixed(1), 'ms');
}

// write
{
  const t0 = performance.now();
  for (let i = 0; i < N; i++) swollenArray[i].age = (swollenArray[i].age + 1) & 0xFF;
  console.log('POJO write:', (performance.now() - t0).toFixed(1), 'ms');
}

{
  const t0 = performance.now();
  for (let i = 0; i < N; i++) persons.set(i, { ...persons.get(i), age: (persons.get(i).age + 1) & 0xFF });
  console.log('Typed write:', (performance.now() - t0).toFixed(1), 'ms');
}
