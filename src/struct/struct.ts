import { type StructureAccess, type TypedStructure, type ValueOf } from "../types.js";

export type StructValue<S extends Record<PropertyKey, TypedStructure<unknown>>> = {
    [K in keyof S]: ValueOf<S[K]>;
};

type Scheme = [string | symbol, TypedStructure];

export class Struct<
  S extends Record<PropertyKey, TypedStructure<unknown>>
> implements TypedStructure<StructValue<S>> {

    byteLength: number;
    scheme: Map<string | symbol, TypedStructure>

    constructor(scheme: S) {
        let totalLength = 0;

        this.scheme = new Map(
            Object.entries(scheme).flatMap((v): Scheme[] => {
                const [key, Type] = v;
                const size = Math.max(1, Type.alignment ?? 1);
                const alignment = this.#getAlignment(totalLength, size);

                const res: Scheme[] = [];

                if (alignment !== 0) {
                    res.push([
                        Symbol('Alignment'),

                        {
                            byteLength: alignment,
                            init() {
                                return {
                                    get: () => 0,
                                    set: (_value: unknown) => {},
                                };
                            }
                        }
                    ])

                    totalLength += alignment;
                }

                res.push([
                    key,
                    {
                        byteLength: Type.byteLength,
                        init: Type.init.bind(Type),
                    }
                ]);

                totalLength += Type.byteLength;

                return res;
            })
        )

        this.byteLength = totalLength;
    }

    create(data: StructValue<S>, buffer = new ArrayBuffer(this.byteLength), offset = 0): StructValue<S> & StructView {
        const view = new StructView(buffer, this.byteLength, offset);

        this.scheme.forEach((type, key) => {
            offset += type.byteLength;

            if (typeof key === 'symbol') return;

            const {set, get} = type.init(buffer, offset);
            set(data[key]);

            Object.defineProperty(view, key, {
                enumerable: true,
                configurable: true,
                get,
                set,
            });
        })

        return view;
    }

    from(buffer: ArrayBuffer, offset: number): StructView {
        const view = new StructView(buffer, this.byteLength, offset);

        this.scheme.forEach((Type, key) => {
            const currOffset = offset;
            offset += Type.byteLength;

            let accessors: null | ReturnType<typeof Type.init> = null;

            if (typeof key === 'symbol') {
                offset += Type.byteLength;
                return;
            }

            Object.defineProperty(view, key, {
                enumerable: true,
                configurable: true,
                get: () => init().get(),
                set: (value: ValueOf<S[typeof key]>) => {
                    init().set(value)
                },
            })

            // Это ленивая оптимизация, которая происходит
            // в момент первого касания
            function init() {
                if (accessors === null) {
                    accessors = Type.init(buffer, currOffset);
                }

                return accessors;
            }
        });

        return view;
    }

    init(buffer: ArrayBuffer, offset: number): StructureAccess<StructValue<S>> {
        let view = this.from(buffer, offset) as StructValue<S>;

        return {
            get: () => view,

            set: (data: StructValue<S>) => {
                view = this.create(data, buffer, offset);
            }
        };
    }

    #getAlignment(offset: number, size: number) {
        const remainder = offset % size;
        if (remainder === 0) return 0;
        return size - remainder;
    }
}

class StructView {
    constructor(
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
}
