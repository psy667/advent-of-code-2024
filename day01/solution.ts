import { pipe, map, filter, split, join, reduce, sum, takeFirst, takeLast, toInt, isStringNumber, splitByLine, toSortedAsc, sort, countValues, trim, op, fork, comp, zip, fold, getOrDefault, of } from '../utils/index';

// export function solution1(input: string) {
//     const a = input.split('\n').map(it => it.split(' ').filter(Boolean).map(toInt))
//     const arr1 = a.map(takeFirst)
//     const arr2 = a.map(takeLast)

//     const a1 = sort('asc')(arr1)
//     const a2 = sort('asc')(arr2);

//     return a1.map((it,idx) => Math.abs(it - a2[idx])).reduce(sum, 0)
// }

export function solution1(input: string) {
    return pipe(
        splitByLine(),
        map(pipe(
            split('   '),
            map(toInt)
        )),
        fork(
            map(takeFirst),
            map(takeLast)
        ),
        map(sort('asc')),
        zip((x,y) => Math.abs(x - y)),
        fold(0, sum)
    )(input)
}

// export function solution2(input: string) {
//     const a = input.split('\n').map(it => it.split(' ').filter(Boolean).map(toInt))
//     const arr1 = a.map(takeFirst)
//     const arr2 = a.map(takeLast)

//     const a1 = sort('asc')(arr1)
//     const a2 = sort('asc')(arr2);

//     const scores = {} 

//     a2.forEach(it => {
//         scores[it] = (scores[it] ?? 0) + 1 
//     });

//     return a1.map((it,idx) => it * (scores[it] ?? 0)).reduce(sum, 0)
// }


export function solution2(input: string) {
    return pipe(
        splitByLine(),
        map(pipe(
            split('   '),
            map(toInt)
        )),
        fork(
            map(takeFirst),
            pipe(map(takeLast), countValues)
        ),
        comp(
            (values) => 
                (scores) => 
                    values.map(it => it * getOrDefault(it, 0)(scores))),
        fold(0, sum)
    )(input)
}