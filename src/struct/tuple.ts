import { type TypedStructure } from '../types.ts';
import { Struct } from './struct.ts'

type TupleStructure = { [k: number]: TypedStructure };

export function Tuple(...types: TypedStructure[]) {
    const scheme = types.reduce((acc, type, i) => {
        acc[i] = type;
        return acc;
    }, {} as TupleStructure);

    return new Struct(scheme)
}
