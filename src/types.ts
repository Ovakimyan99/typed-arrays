interface StructureInitial {
    get(): unknown;
    set(v: unknown): void;
}

export interface TypedStructure {
    byteLength: number;
    alignment?: number;
    init(buffer: ArrayBufferLike, offset: number): StructureInitial;
}
