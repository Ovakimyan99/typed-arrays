import { type TypedStructure } from '../types.ts'

export const FixedAsciiString = (maxLength: number): TypedStructure => {
    return {
        get byteLength() {
            return maxLength;
        },

        get alignment() {
            return 0;
        },

        init(buffer, offset) {
            const arr = new Uint8Array(buffer, offset);

            return {
                get() {
                    return String.fromCharCode(...arr);
                },

                set(str: string) {
                    for (let i = 0; i < maxLength; i++) {
                        arr[i] = str.codePointAt(i) ?? 0;
                    }
                },
            }
        }
    }
}