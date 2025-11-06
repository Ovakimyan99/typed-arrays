import { type TypedStructure } from '../types.ts'

interface U16 extends TypedStructure {
    alignment: 2
}

export const U16 = {
    get byteLength() {
        return 2;
    },

    get alignment() {
        return 2;
    },

    init(value, offset) {
        const remainder = offset % U16.alignment;
        offset = remainder === 0 ? offset : offset - remainder;

        const arr = new Uint16Array(value, offset, U16.byteLength);

        return {
            get() {
                return arr;
            },

            set(value: number) {
                arr[0] = value;
            },
        }
    }
} as U16