import { isRunnableFunctionWithParse } from 'openai/lib/RunnableFunction.mjs';
import { sum } from '../utils';
import { findPos, type Matrix, left } from '../utils/aoc';
import { join, reduce } from '../utils/index';

export function parse(input: string) {
    return input
        .split('\n')
        .map(it => it.split(''))
}

export enum Key {
    Up = '^',
    Down = 'v',
    Right = '>',
    Left = '<',
    Push = 'A'
}

const numpadMap: Matrix<string> = `789
456
123
_0A`.split('\n').map(it => it.split(''));


export function fromNumpadToKeyboard(a: string, b: string): string {
    const pos1 = findPos(numpadMap, a);
    const pos2 = findPos(numpadMap, b);
    const forbidden = findPos(numpadMap, '_').join(':')

    const dir = [pos2[0] - pos1[0], pos2[1] - pos1[1]];

    let res = '';
    const move1 = ([pos1[0] + dir[0], pos1[1]]).join(':');
    const move2 = ([pos1[0], pos1[1] + dir[1]]).join(':');

    if(!(move1 === forbidden || move2 === forbidden)) {
        // normal
        if(dir[0] < 0) {
            res += Key.Left.repeat(-dir[0])
        }
        if(dir[1] < 0) {
            res += Key.Up.repeat(-dir[1])
        }
        if(dir[1] > 0) {
            res += Key.Down.repeat(dir[1])
        }
        if(dir[0] > 0) {
            res += Key.Right.repeat(dir[0])
        }
    } else {
        if(dir[1] < 0) {
            res += Key.Up.repeat(-dir[1])
        }

        if(dir[0] < 0) {
            res += Key.Left.repeat(-dir[0])
        }
        
        if(dir[0] > 0) {
            res += Key.Right.repeat(dir[0])
        }
        
        if(dir[1] > 0) {
            res += Key.Down.repeat(dir[1])
        }
    }

    res += 'A'
    return res;
}

const keyboardMap: Matrix<string> = `_^A
<v>`.split('\n').map(it => it.split(''));

const cache = {};


export function fromKeyboardToKeyboard(a: string, b: string): string {
    const k = a + ':' + b;
    if(cache[k]) return cache[k];

    const pos1 = findPos(keyboardMap, a);
    const pos2 = findPos(keyboardMap, b);
    const forbidden = findPos(keyboardMap, '_').join(':')

    const dir = [pos2[0] - pos1[0], pos2[1] - pos1[1]];

    let res = '';

    const move1 = ([pos1[0] + dir[0], pos1[1]]).join(':');
    const move2 = ([pos1[0], pos1[1] + dir[1]]).join(':');

    if(!(move1 === forbidden || move2 === forbidden)) {
        if(dir[0] < 0) {
            res += Key.Left.repeat(-dir[0])
        }
        if(dir[1] < 0) {
            res += Key.Up.repeat(-dir[1])
        }
        if(dir[1] > 0) {
            res += Key.Down.repeat(dir[1])
        }
        if(dir[0] > 0) {
            res += Key.Right.repeat(dir[0])
        }
    } else {
        // console.log({move1, move2, pos1, pos2, dir, forbidden})

        if(dir[1] > 0) {
            res += Key.Down.repeat(dir[1])
        } 
        if(dir[0] < 0) {
            res += Key.Left.repeat(-dir[0])
        }
        if(dir[0] > 0) {
            res += Key.Right.repeat(dir[0])
        }
        if(dir[1] < 0) {
            res += Key.Up.repeat(-dir[1])
        }
    }

    res += 'A'
    cache[k] = res;
    return res;
}

export function solution1(input: string) {
    const nums = parse(input)

    function mapKeys(arr, mapFn) {
        const keys = arr.map((cur, idx, arr) => {
            let prev = ''

            if(idx === 0) {
                prev = Key.Push;
            } else {
                prev = arr[idx-1];
            }

            return mapFn(prev,cur)
        }).join('');

        return keys.split('');
    }

    return nums.map(num => {
        const k1 = mapKeys(num, fromNumpadToKeyboard)
        const k2 = mapKeys(k1, fromKeyboardToKeyboard)
        const k3 = mapKeys(k2, fromKeyboardToKeyboard)
        return [ k3.length, parseInt(num.join(''))]
    })
    .map(it => it[0] * it[1])
    .reduce(sum,0)

}

export function solution2(input: string) {
    const nums = parse(input)

    const cache = {};

    function precalculateCache(a,b) {
        const k = `${a}${b}`

        cache[k] = fromKeyboardToKeyboard(a,b) 
        return cache[k];
    }

    const arr = `A^>v<`.split('')

    ;arr.forEach((a) => {
        arr.forEach((b) => {
            precalculateCache(a,b)
        })
    })


    function mapKeys(arr, mapFn) {
        const keys = arr.map((cur, idx, arr) => {
            let prev = ''

            if(idx === 0) {
                prev = Key.Push;
            } else {
                prev = arr[idx-1];
            }

            return mapFn(prev,cur)
        }).join('');

        return keys
    }

    function getCostForPath(path: string, level: number): number {
        let result = 0;
        
        const key = `${path}:${level}`

        if(cache[key]) return cache[key];

        if(level === 0) {
            for(let i = 1; i < path.length; i++) {
                let prev;
                
                prev = path[i-1]
                let cur = path[i]

                const steps = cache[prev+cur]
                result += steps.length
            } 
            return result
        }

        for(let i = 1; i < path.length; i++) {
            let prev;
            
            prev = path[i-1]
            
            let cur = path[i]
            const steps = cache[prev+cur]

            const cost = getCostForPath('A' + steps, level - 1)
        
            result += cost
        }

        cache[key] = result

        return result
    }

    return nums.map(num => {
        let str = mapKeys(num, fromNumpadToKeyboard)

        const cost = getCostForPath('A' + str, 24)

        return [cost, parseInt(num.join(''))]
    })
    .map(it => it[0] * it[1])
    .reduce(sum,0)
}