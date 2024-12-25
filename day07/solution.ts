import { filter, fold, map, pipe, split, splitByLine, sum, toInt, trim } from "../utils";

export function solveEquation(res, operands) {
    if(res < 0) return false
    if(Math.round(res) !== res) return false

    const [rest, last] = [operands.slice(0,-1), operands.at(-1)]

    if(operands.length === 1) {
        return res === last
    }

    return solveEquation(res / last, rest) 
        || solveEquation(res - last, rest)  
}

export function solution1(input: string) {
    return pipe(
        splitByLine(),
        map(pipe(
            split(':'),
            map(pipe(
                trim,
                split(' '),
                map(toInt)
            )),
        )),
        filter(it => solveEquation(it[0][0], it[1])),
        map((it) => it[0][0]),
        fold(0, sum)
    )(input)
}

export function cut(from: string, value: string) {
    if(from.endsWith(value)) {
        const idx = from.lastIndexOf(value)
        return from.slice(0, idx)
    } else {
        return null
    }
}


export function solveEquation2(res: number, operands: number[]) {
    if(Number.isNaN(res)) return false
    if(res < 0) return false
    if(Math.round(res) !== res) return false

    const [rest, last] = [operands.slice(0,-1), operands.at(-1)]

    if(operands.length === 1) {
        return res === last
    }

    return solveEquation2(res / last, rest) 
        || solveEquation2(res - last, rest)
        || solveEquation2(parseInt(cut(res.toString(), last.toString())), rest) 
}

export function solution2(input: string) {
    return pipe(
        splitByLine(),
        map(pipe(
            split(':'),
            map(pipe(
                trim,
                split(' '),
                map(toInt)
            )),
        )),
        filter(it => solveEquation2(it[0][0], it[1])),
        map((it) => it[0][0]),
        fold(0, sum)
    )(input)
}
