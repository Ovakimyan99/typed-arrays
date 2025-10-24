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

        const arr = new Uint16Array(value, offset, 2);

        return {
            get() {
                return arr;
            },

            set(value) {
                arr[0] = value;
            },
        }
    }
}