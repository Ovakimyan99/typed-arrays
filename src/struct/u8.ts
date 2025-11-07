import {type TypedStructure } from '../types.js'

interface U8T extends TypedStructure<number> {
    alignment: number;
}

export const U8: U8T = {
    get byteLength() {
        return 1;
    },

    get alignment() {
        return 1;
    },

    init(buffer, offset) {
        const arr = new Uint8Array(buffer, offset, 1);

        return {
            get() {
                return arr[0];
            },

            set(value: number) {
                arr[0] = value & 0xFF;
            }
        }
    }
};