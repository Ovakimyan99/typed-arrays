import { type TypedStructure } from '../types.js'

export const FixedAsciiString = (maxLength: number): TypedStructure<string> => ({
    get byteLength() {
        return maxLength;
    },

    init(buffer, offset) {
        const arr = new Uint8Array(buffer, offset, maxLength);

        return {
            get() {
                // стоп по нулю
                let end = 0;
                while (end < arr.length && arr[end] !== 0) end++;
                return String.fromCharCode(...arr.subarray(0, end));
            },

            set(str: string) {
                for (let i = 0; i < maxLength; i++) {
                    arr[i] = 0;
                }

                const n = Math.min(maxLength, str.length);

                for (let i = 0; i < n; i++) {
                    const code = str.charCodeAt(i);
                    arr[i] = code <= 0x7F ? code : 0x3F; // если не ASCII
                }
            },
        }
    }
})