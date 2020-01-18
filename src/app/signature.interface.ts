interface Matrix {
    width: number;
    height: number;
    data: Array<string>;
}

interface Signature {
    matrix: Matrix;
    code: number;
}

export { Matrix, Signature }