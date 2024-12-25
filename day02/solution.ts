import { pipe, map, filter, split, join, reduce, sum, takeFirst, takeLast, toInt, isStringNumber, splitByLine, toSortedAsc, sort, countValues } from '../utils/index';

export function arrayVariations(array) {
    let res = [];

    for(let i = 0; i < array.length; i++) {
        let a = array.slice(0);
        a.splice(i, 1)
        res.push(a)
    }

    return res;
}

export function checkArray(arr) {
    let order = null

    for(let i = 1; i < arr.length; i++) {
        let cur = arr[i];
        let prev = arr[i - 1];

        let [inc, delta] = [Math.sign(cur - prev), Math.abs(cur - prev)]

        if(inc === 0) {
            return false;
        }

        if(order === null) {
            order = inc;
        } else {
            if(order !== inc) {
                return false;
            }
        }

        if(delta > 3) {
            return false
        }
        
    }

    return true
}

export function solution1(input: string) {
    const result = pipe(
        splitByLine(),
        filter(it => Boolean(it.trim())),
        map(pipe(
            split(' '),
            map(toInt)
        )),
        filter(arr => {
            return checkArray(arr)
        })
    )(input)

    return result.length
}

export function solution2(input: string) {
    const result = pipe(
        splitByLine(),
        filter(it => Boolean(it.trim())),
        map(pipe(
            split(' '),
            map(toInt)
        )),
        filter(arr => {
           const a = arrayVariations(arr).filter(checkArray)
           return a.length
        })
    )(input)

    return result.length;
}