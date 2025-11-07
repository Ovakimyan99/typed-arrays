import { type TypedStructure } from '../types.js'

interface U16T extends TypedStructure<number> {
    alignment: number
}

export const U16: U16T = {
    get byteLength() {
        return 2;
    },

    get alignment() {
        return 2;
    },

    init(buffer: ArrayBufferLike, offset: number) {
        // выравниваем вниз к границе 2 байта
        const remainder = offset % U16.alignment;
        if (remainder !== 0) offset -= remainder;

        const arr = new Uint16Array(buffer, offset, 1);
        return {
            get() {
                return arr[0];
            },

            set(value: number) {
                arr[0] = value & 0xFFFF;
            },
        }
    }
};