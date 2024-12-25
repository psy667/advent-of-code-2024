import { pipe, map, filter, split, join, reduce, sum, takeFirst, takeLast, toInt, isStringNumber, splitByLine, toSortedAsc, sort, countValues, match, mul, slice, comp, log, op, fold, trim } from '../utils/index';

export function solution1(input: string) {
    const regexp = new RegExp(/mul\(\d+\,\d+\)/g)

    const matches = [...input.matchAll(regexp)]

    return pipe(
        map(pipe(
            takeFirst,
            slice(4, -1), 
            split(','),
            map(toInt),
            op(([a,b]) => a * b)
        )),
        fold(0, sum)
    )(matches)
}

export function solution2(input: string) {
    const regexp = new RegExp(/(mul\(\d+\,\d+\))|(don\'t\(\))|(do\(\))/g)
    const matches = [...input.matchAll(regexp)].map(takeFirst).map(trim)
    
    let instructions = [];
    let enabled = true;

    for(let match of matches) {
        if(match === `don't()`) {
            enabled = false
        } else if(match === 'do()') {
            enabled = true
        } else if(enabled) {
            instructions.push(match)
        }
    }

    return pipe(
        map(pipe(
            slice(4, -1), 
            split(','),
            map(toInt),
            op(([a,b]) => a * b)
        )),
        fold(0, sum)
    )(instructions) 
}