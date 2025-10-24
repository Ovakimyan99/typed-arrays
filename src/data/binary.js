import {PersonArray} from '../index.js';
import {personArray} from './data.js';

writeFileSync('./data.binary', Buffer.from(personArray.buffer), { encoding: 'binary' })

const buf = readFileSync('./data.binary').buffer;

console.time('parsing');

console.log(PersonArray.from(buf).get(0).id)
console.log(PersonArray.from(buf).get(1).id)

console.timeEnd('parsing');

// ls -lh ./data.binary - посмотреть размер файла
/*
    Мы обнаружим, что время парсинга порядка 3-4 мс.
    Даже если мы увеличим размер типизированного массива
    на порядок, мы получим тот же результат. Потмоу что
    описана схема, нам не надо ничего парсить. Мы забрали данные
    и все
*/