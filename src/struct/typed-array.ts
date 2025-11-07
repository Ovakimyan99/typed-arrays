import { type TypedStructure } from "../types.js";

export class TypedArray<T extends TypedStructure> {
    byteLength: number;

    constructor(public type: T, public length: number) {
        this.byteLength = type.byteLength * length;
        this.length = length;
        this.type = type;
    }

    create(data: ArrayLike<T>, buffer = new ArrayBuffer(this.byteLength), offset = 0): TypedArrayView<T> {
        const view = new TypedArrayView(this.type, buffer, this.byteLength, offset);

        for (let i = 0; i < this.length && i < data.length; i++) {
            view.set(i, data[i]);
        }

        return view;
    }

    from<T>(
        type: TypedStructure<T>,
        buffer: ArrayBufferLike,
        length: number,
        offset = 0,
    ): TypedArrayView<T> {
        return new TypedArrayView(type, buffer, length, offset);            
    }

    init(buffer: ArrayBuffer, offset: number) {
        let view = this.from(this.type, buffer, this.byteLength, offset);

        return {
            get: () => view,

            set: (data: ArrayLike<T>) => {
                view = this.create(data, buffer, offset);
            }
        };
    }
}

class TypedArrayView<T> {
    constructor(
        private type: TypedStructure<T>,
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

    set(index: number, value: T) {
        this.#init(index).set(value)
    }

    #init(index: number) {
        return this.type.init(
            this._buffer,
            this.byteOffset + this.type.byteLength * index,
        );
    }
}