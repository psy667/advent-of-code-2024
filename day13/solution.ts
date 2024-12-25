import { map, pipe, split, splitByLine, at, zipApply, slice, toInt, mergeObj, isRound, isPositive } from "../utils"

type Coord = [number, number]

type Data = {
    a: Coord,
    b: Coord,
    prize: Coord,
}[]

export function parse(input: string): Data {
    return pipe(
        split('\n\n'),
        map(
            splitByLine(),
            map(pipe(
                split(': '),
                at(1),
                split(', '),
                map(
                    slice(2),
                    toInt,
                )
            )),
            zipApply(
                (a) => ({a}),
                (b) => ({b}),
                (prize) => ({prize})
            ),
            mergeObj
        )
    )(input)
}

export const f1 = (sum: Coord, a: Coord, b: Coord) => {
    const [s1, s2] = sum;
    const [a1, a2] = a;
    const [b1, b2] = b;

    for(let i = 0; i < 100; i++) {
        const t1 = (s1 - a1 * i) / b1
        const t2 = (s2 - a2 * i) / b2

        if(t1 === t2 && isRound(t1) && isPositive(t1)) {
            return [i, t1]
        }
    }

    return null
}



export const f2 = (s: Coord, a: Coord, b: Coord) => {
    const y = 
        (
            s[0] * a[1] - 
            s[1] * a[0]
        ) / 
        (
            b[0] * a[1] - 
            b[1] * a[0]
        )

    const x = 
        (
            s[0] - 
            b[0] * y
        ) / 
        a[0]

    if(!isRound(x) || !isRound(y)) {
        return null
    }

    return [x,y]
}



export function solution1(input: string) {
    return parse(input)
        .map(it => f1(it.prize, it.a, it.b))
        .filter(Boolean)
        .reduce((acc,cur) => acc + (cur[0] * 3 + cur[1]), 0)
}

export function solution2(input: string) {
    return parse(input)
        .map(it => f2(it.prize.map(it => it + 10000000000000) as Coord, it.a, it.b))
        .filter(Boolean)
        .reduce((acc,cur) => acc + (cur[0] * 3 + cur[1]), 0)
}
