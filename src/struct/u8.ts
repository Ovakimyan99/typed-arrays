import {type TypedStructure } from '../types.ts'

interface U8 extends TypedStructure {
    alignment: 2;
}

export const U8 = {
    get byteLength() {
        return 1;
    },

    get alignment() {
        return 2;
    },

    init(buffer, offset) {
        const arr = new Uint8Array(buffer, offset, U8.byteLength);

        return {
            get() {
                return arr;
            },

            set(value: number) {
                arr[0] = value;
            }
        }
    }
} as U8;