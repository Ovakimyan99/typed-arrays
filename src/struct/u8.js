export const U8 = {
    get byteLength() {
        return 1;
    },

    get alignment() {
        return 2;
    },

    init(buffer, offset) {
        const arr = new Uint8Array(buffer, offset, 1);
        return {
            get() {
                return arr;
            },

            set(value) {
                arr[0] = value;
            }
        }
    }
}