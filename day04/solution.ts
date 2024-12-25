import { pipe, map, filter, split, join, reduce, sum, takeFirst, takeLast, toInt, isStringNumber, splitByLine, toSortedAsc, sort, countValues, match, mul, slice, comp, log, op, fold, trim } from '../utils/index';
/*
-1,-1   -1, 0    -1, 1
 0,-1    0, 0     0, 1
 1,-1    1, 0     1, 1
*/
export function solution1(input: string) {
    const matrix = input.split('\n').map(it => it.split(''))
    let [w, h] = [matrix.at(0).length, matrix.length]

    function check(matrix, x, y) {
        let chars = ['X', 'M', 'A', 'S']
        const directions = [
            [-1, -1], [-1, 0],  [-1, 1],
            [0, -1],            [0, 1],
            [1, -1],  [1, 0],   [1, 1]
        ];

        const dirResults = new Array(8).fill(1)

        for(let i = 1; i < 4; i++) {
            directions.forEach(([xd, yd], idx) => {
                let xn = x + xd * i
                let yn = y + yd * i

                if(matrix[yn]?.[xn] === chars[i]) {
                    dirResults[idx]++
                }
            })
        }

        return dirResults.filter(it => it === 4).length
    }

    let res = 0;

    for (let y = 0; y < h; y++) {
        for(let x = 0; x < w; x++) {
            if(matrix[y][x] === 'X') {
                res += check(matrix, x, y)
            }
        }
    }

    return res;
}

export function solution2(input: string) {
    const matrix = input.split('\n').map(it => it.split(''))
    let [w, h] = [matrix.at(0).length, matrix.length];

    function check(matrix, x, y) {
        let w1 = [matrix[y-1]?.[x-1], matrix[y]?.[x], matrix[y+1]?.[x+1]].join('')
        let w2 = [matrix[y-1]?.[x+1], matrix[y]?.[x], matrix[y+1]?.[x-1]].join('')

        if((w1 === 'MAS' || w1 === 'SAM') && (w2 === 'MAS' || w2 === 'SAM')) {
            return 1
        }

        return 0
    }

    let res = 0;

    for (let y = 0; y < h; y++) {
        for(let x = 0; x < w; x++) {
            if(matrix[y][x] === 'A') {
                res += check(matrix, x, y)
            }
        }
    }

    return res;
}