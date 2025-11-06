import { type TypedStructure } from "../types.ts";

export class TypedArray {
    byteLength: number;

    constructor(public type: TypedStructure, public length: number) {
        this.byteLength = type.byteLength * length;
        this.length = length;
        this.type = type;
    }

    create(data: ArrayLike<unknown>, buffer = new ArrayBuffer(this.byteLength), offset = 0) {
        const view = new TypedArrayView(this.type, buffer, this.byteLength, offset);

        for (let i = 0; i < this.length && i < data.length; i++) {
            view.set(i, data[i]);
        }

        return view;
    }

    from(buffer = new ArrayBuffer(this.byteLength), offset = 0) {
        return new TypedArrayView(this.type, buffer, this.byteLength, offset);
    }

    init(buffer: ArrayBuffer, offset: number) {
        let view = this.from(buffer, offset);

        return {
            get: () => view,

            set: (data: ArrayBuffer) => {
                view = this.create(data, buffer, offset);
            }
        };
    }
}

class TypedArrayView {
    constructor(
        private type: TypedStructure,
        private _buffer: ArrayBuffer,
        private _byteLength: number,
        private offset: number
    ) {}

    get buffer() {
        return this._buffer;
    }

    get byteLength() {
        return this._byteLength;
    }

    get byteOffset() {
        return this.offset;
    }

    get BYTES_PER_ELEMENT() {
        return this.type.byteLength;
    }

    get(index: number) {
        return this.#init(index).get();
    }

    set(index: number, value: unknown) {
        this.#init(index).set(value)
    }

    #init(index: number) {
        return this.type.init(
            this._buffer,
            this.byteOffset + this.type.byteLength * index,
        );
    }
}