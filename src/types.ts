export interface StructureAccess<T> {
    get(): T;
    set(v: T): void;
}

export interface TypedStructure<T = unknown> {
    byteLength: number;
    alignment?: number;
    // привязывает тип (U8, Struct, Tuple и т.п.) к конкретному месту внутри ArrayBuffer
    init(buffer: ArrayBufferLike, offset: number): StructureAccess<T>;
}

// Хелпер для извлечения "значения" из TypedStructure
export type ValueOf<TS> = TS extends TypedStructure<infer V> ? V : never;