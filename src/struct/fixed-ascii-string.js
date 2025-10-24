export const FixedAsciiString = (maxLength) => {
    return {
        get byteLength() {
            return maxLength
        },

        init(buffer, offset) {
            const arr = new Uint8Array(buffer, offset);

            return {
                get() {
                    return String.fromCharCode(...arr);
                },

                set(str) {
                    for (let i = 0; i < maxLength; i++) {
                        arr[i] = i >= str.length ? 0 : String.charCodeAt(i);
                    }
                },
            }
        }
    }
}