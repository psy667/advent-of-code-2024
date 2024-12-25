import { eq } from "../utils";

export function getAntiNods(nod1: [number, number], nod2: [number, number]): [[number,number], [number, number]] {
    const d1 = [nod1[0] - nod2[0], nod1[1] - nod2[1]]
    const d2 = [nod2[0] - nod1[0], nod2[1] - nod1[1]]

    return [
        [nod1[0] + d1[0], nod1[1] + d1[1]],
        [nod2[0] + d2[0], nod2[1] + d2[1]]
    ]
}

export function getAllAntiNods(nod1: [number, number], nod2: [number, number], frame: [number, number]): [number, number][] {
    const d1 = [nod1[0] - nod2[0], nod1[1] - nod2[1]]
    const d2 = [nod2[0] - nod1[0], nod2[1] - nod1[1]]


    let p1 = nod1
    let p2 = nod2

    let res = []


    while(checkBoundaries2(frame, p1)) {
        res.push(p1)
        p1 = [p1[0] + d1[0], p1[1] + d1[1]]

    }

    while(checkBoundaries2(frame, p2)) {
        res.push(p2)
        p2 = [p2[0] + d2[0], p2[1] + d2[1]]
    }

    return res;
}

export function getCombinations(arr) {
    const res = [];

    for(let i = 0; i < arr.length; i++) {
        for(let j = i + 1; j < arr.length; j++) {
            res.push([arr[i], arr[j]])
        }
    }

    return res
}

export function checkBoundaries1(size, val) {
    return val >= 0 && val < size
}

export function checkBoundaries2(size: [number, number], val: [number, number]) {
    return checkBoundaries1(size[0], val[0]) && checkBoundaries1(size[1], val[1]) 
}

export function solution1(input: string) {
    const matrix = input.split('\n').map(it => it.split(''));
    const frame: [number, number] = [matrix.length, matrix.at(0).length]
    const [wy, wx] = frame;

    const hm = {}

    for(let y = 0; y < wy; y++) {
        for(let x = 0; x < wx; x++) {
            const c = matrix[y][x]
            if(c === '.') continue

            hm[c] = (hm[c] ?? []).concat([[y,x]])
        }
    }

    Object.values(hm).forEach(t => {
        getCombinations(t).forEach(pair => {
            getAntiNods(pair[0], pair[1]).filter(p => checkBoundaries2(frame, p)).forEach(p => {
                matrix[p[0]][p[1]] = '#'
            })
        })
    })

    // console.log(matrix.map(it => it.join('')).join('\n'))

    return matrix.reduce((acc,row) => acc + row.filter(eq('#')).length, 0)
}

export function solution2(input: string) {
    const matrix = input.split('\n').map(it => it.split(''));
    const frame: [number, number] = [matrix.length, matrix.at(0).length]
    const [wy, wx] = frame;

    const hm = {}

    for(let y = 0; y < wy; y++) {
        for(let x = 0; x < wx; x++) {
            const c = matrix[y][x]
            if(c === '.') continue

            hm[c] = (hm[c] ?? []).concat([[y,x]])
        }
    }

    Object.values(hm).forEach(t => {
        getCombinations(t).forEach(pair => {
            getAllAntiNods(pair[0], pair[1], frame).forEach(p => {
                matrix[p[0]][p[1]] = '#'
            })
        })
    })

    // console.log(matrix.map(it => it.join('')).join('\n'))

    return matrix.reduce((acc,row) => acc + row.filter(eq('#')).length, 0)
}